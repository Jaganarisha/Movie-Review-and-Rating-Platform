import { createContext, useContext, useEffect, useState } from "react"; import api from "../services/api";
const Ctx = createContext(); export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem("token")) return setLoading(false); api.get("/auth/me").then((r) => setUser(r.data)).catch(() => localStorage.removeItem("token")).finally(() => setLoading(false)); }, []);
  const auth = async (path, body) => { const { data } = await api.post(path, body); localStorage.setItem("token", data.token); setUser(data.user); };
  const logout = () => { localStorage.removeItem("token"); setUser(null); };
  return <Ctx.Provider value={{ user, loading, setUser, logout, login: (b) => auth("/auth/login", b), register: (b) => auth("/auth/register", b) }}>{children}</Ctx.Provider>;
}
