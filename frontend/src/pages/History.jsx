import { useState } from 'react';
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

const FILTERS = ['all', 'completed', 'initiated', 'ringing', 'in-progress', 'failed', 'no-answer', 'busy'];

export default function History({ calls, loading }) {
  const [filter, setFilter] = useState('all');

  const sorted = [...(filter === 'all' ? calls : calls.filter(c => c.status === filter))]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div style={{ padding: '32px 36px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em' }}>Call History</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>{sorted.length} records found</div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 6,
            border: filter === f ? '1px solid var(--accent)' : '1px solid var(--border)',
            background: filter === f ? '#00e5ff0a' : 'var(--surface2)',
            color: filter === f ? 'var(--accent)' : 'var(--muted)',
            fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer',
            transition: 'all .15s',
          }}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 48 }}><span className="loader"/></div>
        ) : sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>
            <div style={{ fontSize: 40, opacity: .4, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 13, fontFamily: 'var(--mono)' }}>No calls match this filter</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['#', 'Phone Number', 'Status', 'Duration', 'Twilio SID', 'Created At (IST)'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--mono)', padding: '12px 20px', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map(call => (
                  <tr key={call.id}
                    onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--surface2)')}
                    onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 20px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{call.id}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', fontWeight: 500 }}>{call.phone_number}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, borderBottom: '1px solid var(--border)' }}><StatusBadge status={call.status}/></td>
                    <td style={{ padding: '14px 20px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)' }}>{formatDuration(call.duration)}</td>
                    <td style={{ padding: '14px 20px', fontSize: 11, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{call.twilio_sid ? call.twilio_sid.slice(0, 20) + '…' : '—'}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{formatTime(call.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}