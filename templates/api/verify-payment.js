// Template: Vercel serverless function — verifies Razorpay payment signature (HMAC-SHA256)
// Env vars required: RAZORPAY_KEY_SECRET

import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest('hex')

  if (expected !== razorpay_signature) return res.status(400).json({ error: 'Invalid signature' })

  res.json({ valid: true, subscriptionId: razorpay_subscription_id })
}
