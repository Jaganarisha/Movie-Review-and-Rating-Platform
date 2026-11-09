import mongoose from "mongoose";
const s = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  rating: { type: Number, min: 1, max: 5, required: true }, reviewText: { type: String, maxlength: 2000, default: "" }, likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] }, { timestamps: true });
s.index({ userId: 1, movieId: 1 }, { unique: true });
export default mongoose.model("Review", s);
