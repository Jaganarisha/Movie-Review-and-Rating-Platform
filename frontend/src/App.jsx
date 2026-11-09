import { Routes, Route, Navigate, Link } from "react-router-dom"; import { Toaster } from "react-hot-toast"; import { useAuth } from "./context/AuthContext"; import Navbar from "./components/Navbar";
import Home from "./pages/Home"; import Movie from "./pages/Movie"; import Auth from "./pages/Auth"; import Dashboard from "./pages/Dashboard"; import Admin from "./pages/Admin";
const Guard = ({ children, adminOnly }) => { const { user, loading } = useAuth(); if (loading) return <p className="p-10 text-center">Loading…</p>; if (!user || (adminOnly && user.role !== "admin")) return <Navigate to="/login" />; return children; };
const NotFound = () => <div className="py-32 text-center"><h1 className="text-6xl font-bold text-purple-500">404</h1><p className="mt-2 text-white/60">This page doesn't exist.</p><Link to="/" className="btn mt-6 inline-block">Back to home</Link></div>;
export default function App() { return (<><Toaster toastOptions={{ style: { background: "#18181b", color: "#fff" } }} /><Navbar /><Routes>
  <Route path="/" element={<Home />} /><Route path="/movie/:id" element={<Movie />} /><Route path="/login" element={<Auth mode="login" />} /><Route path="/register" element={<Auth mode="register" />} />
  <Route path="/forgot" element={<Auth mode="forgot" />} /><Route path="/reset/:token" element={<Auth mode="reset" />} />
  <Route path="/dashboard" element={<Guard><Dashboard /></Guard>} /><Route path="/admin" element={<Guard adminOnly><Admin /></Guard>} /><Route path="*" element={<NotFound />} /></Routes></>); }
