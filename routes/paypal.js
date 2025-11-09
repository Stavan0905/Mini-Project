const express = require('express');
const axios = require('axios');
const router = express.Router();

const plans = {
  mobile: { amount: '149.00', days: 30 },
  basic: { amount: '199.00', days: 30 },
  standard: { amount: '499.00', days: 90 },
  premium: { amount: '649.00', days: 180 }
};

router.post('/create-payment', async (req, res) => {
  const { plan, email } = req.body;
  const selected = plans[plan];

  if (!selected || !email || !email.includes('@')) {
    console.error('❌ Invalid input:', { plan, email });
    return res.status(400).json({ error: 'Invalid plan or email' });
  }

  const auth = Buffer.from(
    'AeAHSCQdTVws-qAPP50b6EXmwUqKUIYr8VKuSKSUUNeYq4tLIZxOWH2QnLDXjgaULSD2bUGBhU9mEqvO:EIMKQCUwC1_IXGEaDWbJjm7I9LUuAzKARymPUPrw4a0YAMazL8YEABXg0ouaqS_z-NS1mCHawHcYKv2t'
  ).toString('base64');

  try {
    // 🔐 Get access token
    const tokenRes = await axios.post(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) throw new Error('Failed to retrieve PayPal access token');

    //  Create PayPal order
    const orderRes = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: selected.amount
            },
            description: `${plan} Subscription`
          }
        ],
        application_context: {
          brand_name: 'Drip Stream',
          landing_page: 'LOGIN',
          user_action: 'PAY_NOW',
          return_url: `http://localhost:3000/api/payment-success?plan=${plan}&email=${email}`,
          cancel_url: `http://localhost:3000/subscription.html`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const approvalUrl = orderRes.data.links?.find(link => link.rel === 'approve')?.href;
    if (!approvalUrl) throw new Error('Approval URL not found in PayPal response');

    console.log('✅ PayPal approval URL:', approvalUrl);
    res.json({ approvalUrl });
  } catch (err) {
    console.error('❌ PayPal error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

module.exports = router;