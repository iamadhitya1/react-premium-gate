// Template: Vercel serverless function — creates a Razorpay subscription
// Env vars required: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_PLAN_MONTHLY, RAZORPAY_PLAN_YEARLY

export default async function handler(req, res) {
  const { plan } = req.query

  const PLAN_IDS = {
    monthly: process.env.RAZORPAY_PLAN_MONTHLY,
    yearly: process.env.RAZORPAY_PLAN_YEARLY,
  }

  const planId = PLAN_IDS[plan]
  if (!planId) return res.status(400).json({ error: 'Invalid plan' })

  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')

  const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan_id: planId, quantity: 1, total_count: 12 }),
  })

  const data = await response.json()
  if (!response.ok) return res.status(500).json({ error: data.error?.description || 'Failed to create subscription' })

  res.json({ subscriptionId: data.id })
}
