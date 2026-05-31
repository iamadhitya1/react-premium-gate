import React, { useState } from 'react'

const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    padding: '16px',
  },
  modal: {
    width: '100%', maxWidth: '400px',
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '28px 24px',
    fontFamily: 'inherit',
  },
  header: {
    textAlign: 'center', marginBottom: '24px',
  },
  iconWrap: (accent) => ({
    width: '48px', height: '48px', borderRadius: '50%',
    background: `${accent}22`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 12px', fontSize: '24px',
  }),
  heading: {
    margin: '0 0 6px', fontSize: '20px', fontWeight: 700, color: '#ffffff',
  },
  subheading: {
    margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.4)',
  },
  plansGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px',
  },
  planCard: (selected, accent) => ({
    position: 'relative',
    padding: '14px',
    borderRadius: '14px',
    border: selected ? `1.5px solid ${accent}` : '1.5px solid rgba(255,255,255,0.08)',
    background: selected ? `${accent}12` : 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s',
  }),
  badge: (accent) => ({
    position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
    background: accent, color: '#000',
    fontSize: '9px', fontWeight: 700,
    padding: '2px 8px', borderRadius: '99px', whiteSpace: 'nowrap',
  }),
  planPrice: (selected, accent) => ({
    fontSize: '20px', fontWeight: 700,
    color: selected ? accent : '#ffffff',
    margin: '0 0 2px',
  }),
  planPeriod: {
    fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '0 0 2px',
  },
  planDesc: {
    fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0,
  },
  ctaButton: (accent, loading) => ({
    width: '100%',
    background: loading ? 'rgba(255,255,255,0.1)' : accent,
    color: loading ? 'rgba(255,255,255,0.4)' : '#000000',
    fontWeight: 700, fontSize: '15px',
    padding: '16px', borderRadius: '14px',
    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.15s', marginBottom: '10px',
  }),
  fine: {
    textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0,
  },
}

/**
 * PricingModal — bottom-sheet pricing modal with plan toggle.
 *
 * @param {object}    props
 * @param {boolean}   props.isOpen
 * @param {function}  props.onClose
 * @param {array}     props.plans          - [{ id, label, price, period, description, badge }]
 * @param {function}  props.onSelectPlan   - called with planId when CTA clicked
 * @param {string}    props.title
 * @param {string}    props.subtitle
 * @param {string}    props.icon
 * @param {string}    props.accentColor
 * @param {string}    props.fineText
 * @param {boolean}   props.loading
 */
export function PricingModal({
  isOpen,
  onClose,
  plans = [],
  onSelectPlan,
  title = 'Upgrade to Pro',
  subtitle = 'Less than a coffee. Way more value.',
  icon = '👑',
  accentColor = '#F0B429',
  fineText = 'Secure payment · Cancel anytime',
  loading = false,
}) {
  const [selected, setSelected] = useState(plans[0]?.id || '')

  if (!isOpen) return null

  const selectedPlan = plans.find(p => p.id === selected) || plans[0]

  return (
    <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <div style={s.header}>
          <div style={s.iconWrap(accentColor)}>{icon}</div>
          <h2 style={s.heading}>{title}</h2>
          <p style={s.subheading}>{subtitle}</p>
        </div>

        <div style={s.plansGrid}>
          {plans.map(plan => (
            <button key={plan.id} style={s.planCard(selected === plan.id, accentColor)}
              onClick={() => setSelected(plan.id)}>
              {plan.badge && <span style={s.badge(accentColor)}>{plan.badge}</span>}
              <p style={s.planPrice(selected === plan.id, accentColor)}>{plan.price}</p>
              <p style={s.planPeriod}>{plan.period}</p>
              {plan.description && <p style={s.planDesc}>{plan.description}</p>}
            </button>
          ))}
        </div>

        <button
          style={s.ctaButton(accentColor, loading)}
          disabled={loading}
          onClick={() => onSelectPlan?.(selected)}
        >
          {loading ? 'Opening payment…' : `Pay ${selectedPlan?.price} ${selectedPlan?.period}`}
        </button>
        <p style={s.fine}>{fineText}</p>
      </div>
    </div>
  )
}
