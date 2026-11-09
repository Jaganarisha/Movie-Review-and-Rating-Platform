import jwt from "jsonwebtoken"; import User from "../models/User.js"; import { fail } from "../utils/h.js";
export const protect = async (req, res, next) => { try { const t = (req.headers.authorization || "").replace("Bearer ", ""); if (!t) throw fail(401, "Please log in");
  const u = await User.findById(jwt.verify(t, process.env.JWT_SECRET).id); if (!u) throw fail(401, "User not found"); req.user = u; next(); } catch (e) { next(e.status ? e : fail(401, "Session expired, log in again")); } };
export const admin = (req, res, next) => (req.user.role === "admin" ? next() : next(fail(403, "Admins only")));
