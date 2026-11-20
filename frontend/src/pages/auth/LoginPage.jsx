import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const LoginPage = ({ expectedRole = 'USER' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
      try { const user = await login({ ...form, accountType: expectedRole }); navigate(location.state?.from || `/${user.role.toLowerCase()}`, { replace: true }); }
    catch (requestError) { setError(requestError.response?.data?.message || 'Unable to sign in'); }
    finally { setBusy(false); }
  };
  const isDriver = expectedRole === 'DRIVER';
  return <AuthShell title={isDriver ? 'Driver sign in' : 'User sign in'} subtitle={isDriver ? 'Access your ambulance driver workspace.' : 'Sign in to continue with MyAmbulance.'}>
    <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Login type"><NavLink to="/login/user" className={({ isActive }) => `rounded-lg px-3 py-2 text-center text-sm font-semibold transition ${isActive ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>User</NavLink><NavLink to="/login/driver" className={({ isActive }) => `rounded-lg px-3 py-2 text-center text-sm font-semibold transition ${isActive ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Ambulance driver</NavLink></div>
    <form onSubmit={submit} className="space-y-4">
      <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
      <label className="block text-sm font-medium text-slate-700">Password<div className="relative mt-1"><input required type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-3 pr-11 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
      <div className="flex justify-between text-sm"><Link className="text-teal-700 hover:underline" to="/forgot-password">Forgot password?</Link><Link className="text-teal-700 hover:underline" to={isDriver ? '/register?role=DRIVER' : '/register'}>Create an account</Link></div>
    </form>
  </AuthShell>;
};

const AuthShell = ({ title, subtitle, children }) => <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><section className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 md:grid-cols-2"><div className="hidden bg-gradient-to-br from-blue-800 to-teal-700 p-10 text-white md:block"><HeartPulse size={34} /><p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-100">MyAmbulance</p><h2 className="mt-4 text-4xl font-bold leading-tight">Care coordination when every minute matters.</h2><p className="mt-5 leading-7 text-blue-50">A secure healthcare platform connecting patients, ambulance teams, hospitals, and administrators.</p></div><div className="p-8 sm:p-10"><div className="mb-8"><p className="font-semibold text-teal-700 md:hidden">MyAmbulance</p><h1 className="mt-4 text-3xl font-bold text-slate-900">{title}</h1><p className="mt-2 text-slate-600">{subtitle}</p></div>{children}</div></section></main>;
const Field = ({ label, type, value, onChange }) => <label className="block text-sm font-medium text-slate-700">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" /></label>;

export default LoginPage;
