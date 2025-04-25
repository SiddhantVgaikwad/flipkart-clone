const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51OzFyBSCtqy8JeCv4gZJV57JmNM4twvaVRvf3jEVCQjIhEACci6ewrVwSu03p3AKEY4KJv0KHkoicOJO2oKIudtq00iUmfZRMJ'); // your secret key

router.post('/stripe-checkout', async (req, res) => {
  const { items, user, amount, shippingInfo } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      customer_email: user.email,

      // ✅ Required for export transactions

      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
    
      // ✅ Optionally pre-fill shipping name/address manually
      
      

      success_url: `${process.env.FRONTEND_URL}/order/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment`,
    });

    res.json({ sessionId: session.id });

  } catch (error) {
    console.error('Stripe session creation error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
