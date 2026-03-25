import { useState } from 'react';
import { signInWithGoogle, signIn, signUp, resetPassword } from '../firebase';

export default function Login() {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = async () => {
    setError(''); setSuccess('');
    if (!email.trim() || (!password.trim() && mode !== 'reset')) return;
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else if (mode === 'signup') {
        await signUp(email, password);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccess('Password reset email sent! Check your inbox.');
      }
    } catch (e) {
      setError(e.message.replace('Firebase: ', '').replace(/\(.*\)/, '').trim());
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', background: 'var(--surface2)',
    border: '1px solid var(--border)', borderRadius: 8,
    padding: '11px 14px', color: 'var(--text)',
    fontFamily: 'var(--mono)', fontSize: 14, outline: 'none',
    marginBottom: 12,
  };

  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 600,
    letterSpacing: '.08em', textTransform: 'uppercase',
    color: 'var(--muted)', marginBottom: 6, fontFamily: 'var(--mono)',
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '48px 40px', textAlign: 'center',
        maxWidth: 420, width: '100%',
      }}>
        {/* Logo */}
        <div style={{
          width: 56, height: 56,
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 24, margin: '0 auto 24px',
        }}>📡</div>

        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>OUTREACH AI</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 32 }}>
          {mode === 'signin' ? 'Sign in to your account' : 
           mode === 'signup' ? 'Create a new account' : 
           'Reset your password'}
        </div>

        {/* Google Button */}
        {mode !== 'reset' && (
          <>
            <button onClick={handleGoogle} style={{
              width: '100%', padding: '12px 20px',
              background: '#fff', border: 'none', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#000',
              fontFamily: 'var(--font)', marginBottom: 20, transition: 'all .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src="https://www.google.com/favicon.ico" width={18} height={18}/>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
            </div>
          </>
        )}

        {/* Email */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Password */}
        {mode !== 'reset' && (
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        )}

        {/* Forgot password link */}
        {mode === 'signin' && (
          <div style={{ textAlign: 'right', marginBottom: 16, marginTop: