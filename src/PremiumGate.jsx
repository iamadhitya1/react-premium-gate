import React from 'react'

const styles = {
  wrapper: (accent) => ({
    background: `linear-gradient(135deg, ${hex(accent, 0.06)} 0%, rgba(0,0,0,0) 100%)`,
    border: `1px solid ${hex(accent, 0.25)}`,
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'inherit',
  }),
  icon: (accent) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: hex(accent, 0.15),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    fontSize: '20px',
  }),
  title: {
    margin: '0 0 6px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#ffffff',
  },
  description: {
    margin: '0 0 16px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.5,
  },
  button: (accent) => ({
    width: '100%',
    background: accent,
    color: '#000000',
    fontWeight: 600,
    fontSize: '14px',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  }),
}

function hex(color, alpha) {
  return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
}

/**
 * PremiumGate — blocks UI behind a Pro paywall.
 *
 * @param {object}   props
 * @param {function} props.onUpgrade    - called when user clicks upgrade
 * @param {string}   props.title        - gate title
 * @param {string}   props.description  - gate description
 * @param {string}   props.buttonText   - CTA button text
 * @param {string}   props.icon         - emoji or string icon
 * @param {string}   props.accentColor  - hex color (default: #F0B429)
 * @param {object}   props.style        - override wrapper style
 */
export function PremiumGate({
  onUpgrade,
  title = 'Pro Feature',
  description = 'Upgrade to Pro to unlock this feature.',
  buttonText = 'Upgrade to Pro',
  icon = '👑',
  accentColor = '#F0B429',
  style = {},
}) {
  return (
    <div style={{ ...styles.wrapper(accentColor), ...style }}>
      <div style={styles.icon(accentColor)}>
        <span>{icon}</span>
      </div>
      <p style={styles.title}>{title}</p>
      <p style={styles.description}>{description}</p>
      <button
        style={styles.button(accentColor)}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
        onClick={onUpgrade}
      >
        {buttonText}
      </button>
    </div>
  )
}
