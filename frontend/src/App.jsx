import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { getCalls } from './api';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());

  const fetchCalls = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await getCalls();
      if (Array.isArray(res.data)) setCalls(res.data);
    } catch (e) {}
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { fetchCalls(); }, []);
  useEffect(() => { const t = setInterval(() => fetchCalls(), 10000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const pages = { dashboard: 'Dashboard', history: 'Call History' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage}/>

      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{
          padding: '20px 36px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 5,
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.01em' }}>{pages[page]}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              padding: '6px 12px', borderRadius: 6,
            }}>
              {time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })} IST
            </div>
            <button
              onClick={() => fetchCalls(true)}
              style={{
                width: 36, height: 36, borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--surface2)',
                color: 'var(--muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, transition: 'all .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              title="Refresh"
            >
              <span style={{ display: 'inline-block', animation: refreshing ? 'spin .7s linear infinite' : 'none' }}>↻</span>
            </button>
          </div>
        </div>

        {page === 'dashboard' && <Dashboard calls={calls} loading={loading} onRefresh={() => fetchCalls(true)}/>}
        {page === 'history'   && <History   calls={calls} loading={loading}/>}
      </div>
    </div>
  );
}