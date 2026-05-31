// Template: Vercel serverless function — checks if a Razorpay subscription is still active
// Env vars required: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

export default async function handler(req, res) {
  const { subscriptionId } = req.query
  if (!subscriptionId) return res.status(400).json({ error: 'Missing subscriptionId' })

  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')

  const response = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
    headers: { Authorization: `Basic ${auth}` },
  })

  const data = await response.json()
  const active = ['active', 'authenticated'].includes(data.status)

  res.json({ active, status: data.status })
}
