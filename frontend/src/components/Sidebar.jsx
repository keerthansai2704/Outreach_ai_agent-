const nav = [
  { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { id: 'history',   icon: '◈', label: 'Call History' },
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside style={{
      width: 240, minHeight: '100vh',
      background: 'var(--surface)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', padding: '28px 0',
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>📡</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '.04em', lineHeight: 1.2 }}>OUTREACH</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>AI Agent v1.0</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
            fontSize: 13, fontWeight: 600, letterSpacing: '.02em',
            border: page === n.id ? '1px solid #00e5ff22' : '1px solid transparent',
            background: page === n.id ? '#00e5ff12' : 'transparent',
            color: page === n.id ? 'var(--accent)' : 'var(--muted)',
            width: '100%', textAlign: 'left', fontFamily: 'var(--font)',
            transition: 'all .18s ease',
          }}>
            <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 24px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}/>
          System Online
        </div>
      </div>
    </aside>
  );
}