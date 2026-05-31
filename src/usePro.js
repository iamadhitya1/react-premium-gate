import { useState, useEffect } from 'react'

/**
 * usePro — manages subscription/pro status with localStorage persistence
 * and optional server-side verification.
 *
 * @param {object} options
 * @param {string} options.storageKey      - localStorage key (default: 'rp_subscription_id')
 * @param {string} options.verifyEndpoint  - URL to verify subscription (optional)
 */
export function usePro({
  storageKey = 'rp_subscription_id',
  verifyEndpoint = null,
} = {}) {
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscriptionId = localStorage.getItem(storageKey)
    if (!subscriptionId) { setLoading(false); return }

    if (!verifyEndpoint) {
      setIsPro(true)
      setLoading(false)
      return
    }

    fetch(`${verifyEndpoint}?subscriptionId=${subscriptionId}`)
      .then(r => r.json())
      .then(data => setIsPro(!!data.active))
      .catch(() => setIsPro(true)) // fallback to optimistic if endpoint fails
      .finally(() => setLoading(false))
  }, [storageKey, verifyEndpoint])

  const activatePro = (subscriptionId) => {
    localStorage.setItem(storageKey, subscriptionId)
    setIsPro(true)
  }

  const deactivatePro = () => {
    localStorage.removeItem(storageKey)
    setIsPro(false)
  }

  return { isPro, loading, activatePro, deactivatePro }
}
