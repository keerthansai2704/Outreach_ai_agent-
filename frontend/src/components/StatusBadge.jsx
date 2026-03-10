export default function StatusBadge({ status }) {
  const s = (status || 'unknown').toLowerCase().replace(/ /g, '-');

  const styles = {
    completed:    { bg: '#00e67614', color: '#00e676', border: '#00e67630' },
    initiated:    { bg: '#00e5ff14', color: '#00e5ff', border: '#00e5ff30' },
    ringing:      { bg: '#ffd60014', color: '#ffd600', border: '#ffd60030' },
    'in-progress':{ bg: '#a78bfa14', color: '#a78bfa', border: '#a78bfa30' },
    failed:       { bg: '#ff174414', color: '#ff1744', border: '#ff174430' },
    busy:         { bg: '#ff174414', color: '#ff1744', border: '#ff174430' },
    'no-answer':  { bg: '#ff980014', color: '#ff9800', border: '#ff980030' },
  };

  const st = styles[s] || { bg: '#ffffff10', color: '#aaa', border: '#ffffff20' };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontFamily: 'var(--mono)', fontWeight: 500,
      padding: '3px 8px', borderRadius: 20,
      textTransform: 'uppercase', letterSpacing: '.04em',
      background: st.bg, color: st.color,
      border: `1px solid ${st.border}`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: st.color, display: 'inline-block',
      }}/>
      {status || 'unknown'}
    </span>
  );
}