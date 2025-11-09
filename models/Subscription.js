const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userEmail: String,
  plan: String,
  amountPaid: String,
  startDate: Date,
  endDate: Date,
  paymentId: String
});

module.exports = mongoose.model('Subscription', subscriptionSchema);