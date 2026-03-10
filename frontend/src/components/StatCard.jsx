const colors = {
  blue:   { accent: 'var(--accent)',  value: 'var(--accent)' },
  green:  { accent: 'var(--green)',   value: 'var(--green)' },
  purple: { accent: 'var(--accent2)', value: '#a78bfa' },
  red:    { accent: 'var(--red)',     value: 'var(--red)' },
};

export default function StatCard({ label, value, color, icon, loading }) {
  const c = colors[color] || colors.blue;
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden',
      transition: 'border-color .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${c.accent}, transparent)`,
      }}/>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
        textTransform: 'uppercase', color: 'var(--muted)',
        marginBottom: 12, fontFamily: 'var(--mono)',
      }}>{label}</div>
      <div style={{
        fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', color: c.value,
      }}>
        {loading ? <span className="loader"/> : value}
      </div>
      <div style={{
        position: 'absolute', right: 16, bottom: 16,
        fontSize: 28, opacity: .12,
      }}>{icon}</div>
    </div>
  );
}