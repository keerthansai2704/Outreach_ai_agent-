import StatCard from '../components/StatCard';
import CallForm from '../components/CallForm';
import StatusBadge from '../components/StatusBadge';

function formatTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true, day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function formatDuration(sec) {
  if (sec === null || sec === undefined) return '—';
  if (sec === 0) return '0s';
  return sec >= 60 ? `${Math.floor(sec / 60)}m ${sec % 60}s` : `${sec}s`;
}

export default function Dashboard({ calls, loading, onRefresh }) {
  const stats = {
    total:     calls.length,
    completed: calls.filter(c => c.status === 'completed').length,
    active:    calls.filter(c => ['initiated', 'ringing', 'in-progress'].includes(c.status)).length,
    failed:    calls.filter(c => ['failed', 'busy', 'no-answer'].includes(c.status)).length,
  };

  const recent = [...calls].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);

  return (
    <div style={{ padding: '32px 36px' }}>
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Calls"    value={stats.total}     color="blue"   icon="📞" loading={loading}/>
        <StatCard label="Completed"      value={stats.completed} color="green"  icon="✓"  loading={loading}/>
        <StatCard label="Active Now"     value={stats.active}    color="purple" icon="⚡" loading={loading}/>
        <StatCard label="Failed / Missed" value={stats.failed}   color="red"    icon="✕"  loading={loading}/>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20 }}>
        <CallForm onCallInitiated={onRefresh}/>

        {/* Recent Calls */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>Recent Calls</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--green)' }}>
              <span style={{ width: 7, height: 7, background: 'var(--green)', borderRadius: '50%', display: 'inline-block' }}/>
              Live
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 48 }}><span className="loader"/></div>
          ) : recent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>
              <div style={{ fontSize: 40, opacity: .4, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 13, fontFamily: 'var(--mono)' }}>No calls yet</div>
            </div>
          ) : recent.map(call => (
            <div key={call.id} style={{
              padding: '14px 22px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'background .15s', cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent2),#4c1d95)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>📞</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{call.phone_number}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{formatTime(call.created_at)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <StatusBadge status={call.status}/>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 3 }}>{formatDuration(call.duration)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}