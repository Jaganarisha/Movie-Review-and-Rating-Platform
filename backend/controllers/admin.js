import User from "../models/User.js"; import Movie from "../models/Movie.js"; import Review from "../models/Review.js"; import { h, fail } from "../utils/h.js";
export const stats = h(async (req, res) => { const [users, movies, reviews, avg, dist] = await Promise.all([User.countDocuments(), Movie.countDocuments(), Review.countDocuments(), Review.aggregate([{ $group: { _id: null, a: { $avg: "$rating" } } }]), Review.aggregate([{ $group: { _id: "$rating", n: { $sum: 1 } } }, { $sort: { _id: 1 } }])]);
  res.json({ users, movies, reviews, avgRating: avg[0] ? +avg[0].a.toFixed(2) : 0, distribution: dist }); });
export const users = h(async (req, res) => res.json(await User.find().sort({ createdAt: -1 })));
export const setRole = h(async (req, res) => { if (!["user", "admin"].includes(req.body.role)) throw fail(400, "Bad role"); res.json(await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true })); });
export const delUser = h(async (req, res) => { if (String(req.params.id) === String(req.user._id)) throw fail(400, "You cannot delete yourself"); await User.findByIdAndDelete(req.params.id); await Review.deleteMany({ userId: req.params.id }); res.json({ message: "Deleted" }); });
export const allReviews = h(async (req, res) => res.json(await Review.find().populate("userId", "name").populate("movieId", "title").sort({ createdAt: -1 }).limit(100)));
