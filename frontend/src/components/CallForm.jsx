import { useState } from 'react';
import { initiateCall } from '../api';

export default function CallForm({ onCallInitiated }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');  // ← ADD
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleCall = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setToast(null);
    try {
      await initiateCall(phone, name);  // ← ADD name
      setToast({ type: 'success', msg: `✓ Call initiated to ${phone}` });
      setPhone('');
      setName('');  // ← ADD
      setTimeout(onCallInitiated, 1500);
    } catch (e) {
      setToast({ type: 'error', msg: e?.response?.data?.error || 'Failed to initiate call' });
    }
    setLoading(false);
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>Initiate Call</span>
        <span style={{ fontSize: 10, fontFamily: 'var(--mono)', padding: '3px 8px', borderRadius: 4, background: '#00e5ff14', color: 'var(--accent)', border: '1px solid #00e5ff30' }}>POST /calls</span>
      </div>
      <div style={{ padding: 22 }}>

        {/* Name field ← ADD */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--mono)' }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%', background: 'var(--surface2)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '11px 14px', color: 'var(--text)',
              fontFamily: 'var(--mono)', fontSize: 14, outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Phone field */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--mono)' }}>
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCall()}
            style={{
              width: '100%', background: 'var(--surface2)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '11px 14px', color: 'var(--text)',
              fontFamily: 'var(--mono)', fontSize: 14, outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <button
          onClick={handleCall}
          disabled={loading || !phone.trim()}
          style={{
            width: '100%', padding: 13,
            background: loading || !phone.trim() ? '#1e2a35' : 'linear-gradient(135deg, var(--accent), #0095a8)',
            border: 'none', borderRadius: 10,
            color: loading || !phone.trim() ? 'var(--muted)' : '#000',
            fontFamily: 'var(--font)', fontSize: 14, fontWeight: 800,
            letterSpacing: '.04em', textTransform: 'uppercase',
            cursor: loading || !phone.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all .2s',
          }}
        >
          {loading ? <><span className="loader"/> Connecting...</> : <>📞 Initiate Call</>}
        </button>

        {toast && (
          <div style={{
            marginTop: 14, padding: '12px 14px', borderRadius: 8,
            fontSize: 12, fontFamily: 'var(--mono)',
            background: toast.type === 'success' ? '#00e67614' : '#ff174414',
            border: `1px solid ${toast.type === 'success' ? '#00e67640' : '#ff174440'}`,
            color: toast.type === 'success' ? 'var(--green)' : 'var(--red)',
          }}>
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}