const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const nodemailer = require('nodemailer');

const User = require('./models/User');
const Subscription = require('./models/Subscription');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const paypalRoutes = require('./routes/paypal');
const isAdmin = require('./middleware/isAdmin');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dripstream', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', authRoutes);
app.use(movieRoutes);
app.use('/api', paypalRoutes);

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Serve admin panel (protected)
app.get('/admin', isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Serve customer dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/DripStream_OTT.html'));
});

// View all users (optional)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Handle PayPal payment success
app.get('/api/payment-success', async (req, res) => {
  const { plan, email } = req.query;
  console.log('🔍 Incoming payment success request:', req.query);

  const plans = {
    mobile: { amount: '149.00', days: 30 },
    basic: { amount: '199.00', days: 30 },
    standard: { amount: '499.00', days: 90 },
    premium: { amount: '649.00', days: 180 }
  };

  if (!plan || !email || !plans[plan]) {
    console.warn('⚠️ Invalid subscription details:', { plan, email });
    return res.status(400).send('Invalid subscription details');
  }

  const selected = plans[plan];
  console.log('📦 Logging subscription for:', email, plan);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stavan5281@gmail.com',
      pass: 'urxiahmjxcnfuwvm'
    }
  });

  try {
    await transporter.sendMail({
      to: email,
      subject: 'Drip Stream Subscription Confirmed',
      html: `<p>You subscribed to <strong>${plan}</strong> plan.</p>
             <p>Amount Paid: ₹${selected.amount}</p>
             <p>Validity: ${selected.days} days</p>`
    });

    await transporter.sendMail({
      to: 'admin@dripstream.com',
      subject: 'New Subscription Alert',
      html: `<p>User <strong>${email}</strong> subscribed to <strong>${plan}</strong> plan.</p>`
    });

    const newSub = await Subscription.create({
      userEmail: email,
      plan,
      amountPaid: selected.amount,
      startDate: new Date(),
      endDate: new Date(Date.now() + selected.days * 86400000),
      paymentId: 'sandbox'
    });

    console.log('✅ Subscription saved:', newSub);
    res.redirect('/thankyou.html');
  } catch (err) {
    console.error('❌ Email or DB error:', err.message);
    res.status(500).send('Failed to process subscription');
  }
});

// Admin route to view all subscriptions
app.get('/api/subscriptions', isAdmin, async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ startDate: -1 });
    res.json(subs);
  } catch (err) {
    console.error('❌ Failed to fetch subscriptions:', err.message);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));