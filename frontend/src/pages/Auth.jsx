import { useState } from "react"; import { useNavigate, Link, useParams } from "react-router-dom"; import toast from "react-hot-toast"; import api, { errMsg } from "../services/api"; import { useAuth } from "../context/AuthContext";
export default function Auth({ mode }) { const { login, register } = useAuth(); const nav = useNavigate(); const { token } = useParams(); const [v, setV] = useState({ name: "", email: "", password: "" }); const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const submit = async (e) => { e.preventDefault(); setBusy(true); try {
    if (mode === "login") { await login(v); nav("/"); } else if (mode === "register") { await register(v); nav("/"); }
    else if (mode === "forgot") { const r = await api.post("/auth/forgot", { email: v.email }); toast.success(r.data.message); if (r.data.devResetLink) toast(r.data.devResetLink.replace(location.origin, ""), { duration: 12000 }); }
    else { await api.post(`/auth/reset/${token}`, { password: v.password }); toast.success("Password updated"); nav("/login"); } } catch (er) { toast.error(errMsg(er)); } setBusy(false); };
  return (<form onSubmit={submit} className="glass mx-auto my-16 max-w-sm space-y-3 p-6"><h1 className="text-xl font-bold capitalize">{mode === "forgot" ? "Forgot password" : mode === "reset" ? "Reset password" : mode}</h1>
    {mode === "register" && <input className="input" placeholder="Name" value={v.name} onChange={set("name")} required />}{mode !== "reset" && <input className="input" type="email" placeholder="Email" value={v.email} onChange={set("email")} required />}
    {mode !== "forgot" && <input className="input" type="password" minLength={6} placeholder="Password (6+ chars)" value={v.password} onChange={set("password")} required />}
    <button className="btn w-full" disabled={busy}>{busy ? "Please wait…" : "Continue"}</button>
    <p className="text-center text-sm text-white/60">{mode === "login" ? <><Link to="/register">Create account</Link> · <Link to="/forgot">Forgot password?</Link></> : <Link to="/login">Back to login</Link>}</p></form>); }
