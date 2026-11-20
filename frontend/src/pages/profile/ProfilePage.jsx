import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', profileImage: user?.profileImage || '' });
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (event) => { event.preventDefault(); setBusy(true); setMessage(''); setError(''); try { await updateProfile(form); setMessage('Profile updated successfully.'); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to update profile'); } finally { setBusy(false); } };
  return <main className="min-h-screen bg-slate-50 p-6"><section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"><h1 className="text-3xl font-bold text-slate-900">Your profile</h1><p className="mt-2 text-slate-600">Manage your contact details and account information.</p><div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">Role: <strong>{user?.role}</strong> · Status: <strong>{user?.isActive ? 'Active' : 'Inactive'}</strong></div><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium text-slate-700">Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3" /></label><label className="block text-sm font-medium text-slate-700">Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3" /></label><label className="block text-sm font-medium text-slate-700">Email<input disabled value={user?.email || ''} className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-3" /></label>{error && <p className="text-sm text-red-700">{error}</p>}{message && <p className="text-sm text-emerald-700">{message}</p>}<button disabled={busy} className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Saving…' : 'Save changes'}</button></form></section></main>;
};

export default ProfilePage;
