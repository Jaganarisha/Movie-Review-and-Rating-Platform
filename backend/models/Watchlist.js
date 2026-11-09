import mongoose from "mongoose";
const s = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true } }, { timestamps: { createdAt: true, updatedAt: false } });
s.index({ userId: 1, movieId: 1 }, { unique: true });
export default mongoose.model("Watchlist", s);
