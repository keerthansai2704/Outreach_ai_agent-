import { signInWithGoogle } from '../firebase';

export default function Login() {
  console.log('API KEY:', import.meta.env.VITE_FIREBASE_API_KEY) 

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '48px 40px', textAlign: 'center',
        maxWidth: 400, width: '100%',
      }}>
        {/* Logo */}
        <div style={{
          width: 56, height: 56,
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 24, margin: '0 auto 24px',
        }}>📡</div>

        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>OUTREACH AI</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 36 }}>
          AI-Powered Calling Agent
        </div>

        <button onClick={handleLogin} style={{
          width: '100%', padding: '13px 20px',
          background: '#fff', border: 'none', borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          cursor: 'pointer', fontSize: 14, fontWeight: 700,
          color: '#000', fontFamily: 'var(--font)',
          transition: 'all .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <img src="https://www.google.com/favicon.ico" width={18} height={18}/>
          Continue with Google
        </button>

        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 24 }}>
          Secure login powered by Firebase
        </div>
      </div>
    </div>
  );
}