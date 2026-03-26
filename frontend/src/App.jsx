import { useState, useEffect, useCallback } from 'react';
import { auth, logOut, onAuthStateChanged } from './firebase';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import { getCalls } from './api';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ← ADD: Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const fetchCalls = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await getCalls();
      if (Array.isArray(res.data)) setCalls(res.data);
    } catch (e) {}
    setLoading(false);
    setRefreshing(false);
  }, []);

  // ← CHANGE: only fetch when user is logged in
  useEffect(() => { if (user) fetchCalls(); }, [user]);
  useEffect(() => { const t = setInterval(() => { if (user) fetchCalls(); }, 10000); return () => clearInterval(t); }, [user]);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // ← ADD: Show spinner while checking auth
  if (authLoading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="loader"/>
    </div>
  );

  // ← ADD: Show login page if not logged in
  if (!user) return <Login/>;

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

            {/* ← ADD: User info
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={user.photoURL} width={28} height={28} style={{ borderRadius: '50%' }}/>
              <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                {user.displayName}
              </span>
            </div> */}
            {/* User info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {user.photoURL && (
                  <img src={user.photoURL} width={28} height={28} style={{ borderRadius: '50%' }}/>
                )}
                <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {user.displayName || user.email.split('@')[0]}  {/* ← ADD THIS */}
                </span>
              </div>

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

            {/* ← ADD: Logout button */}
            <button onClick={logOut} style={{
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--surface2)',
              color: 'var(--red)', cursor: 'pointer',
              fontSize: 12, fontFamily: 'var(--mono)',
            }}>
              Logout
            </button>

          </div>
        </div>

        {page === 'dashboard' && <Dashboard calls={calls} loading={loading} onRefresh={() => fetchCalls(true)} user={user}/>}
        {page === 'history'   && <History   calls={calls} loading={loading}/>}
      </div>
    </div>
  );
}