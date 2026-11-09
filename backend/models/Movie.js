import mongoose from "mongoose";
const s = new mongoose.Schema({ title: { type: String, required: true, trim: true }, description: { type: String, required: true }, poster: { type: String, default: "" }, backdrop: { type: String, default: "" }, trailer: { type: String, default: "" },
  releaseDate: { type: Date, required: true }, genre: [String], director: { type: String, required: true }, cast: [String], duration: Number,
  language: { type: String, required: true, enum: ["Tamil", "Telugu", "Malayalam", "Kannada"] }, averageRating: { type: Number, default: 0 }, totalRatings: { type: Number, default: 0 } }, { timestamps: { createdAt: true, updatedAt: false } });
export default mongoose.model("Movie", s);
