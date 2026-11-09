import mongoose from "mongoose"; import bcrypt from "bcryptjs";
const s = new mongoose.Schema({ name: { type: String, required: true, trim: true, maxlength: 60 }, email: { type: String, required: true, unique: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, minlength: 6, select: false }, role: { type: String, enum: ["user", "admin"], default: "user" }, profileImage: { type: String, default: "" },
  resetToken: { type: String, select: false }, resetExpires: { type: Date, select: false } }, { timestamps: { createdAt: true, updatedAt: false } });
s.pre("save", async function (n) { if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12); n(); });
s.methods.matches = function (p) { return bcrypt.compare(p, this.password); };
export default mongoose.model("User", s);
