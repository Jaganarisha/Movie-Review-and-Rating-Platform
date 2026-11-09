import dotenv from "dotenv"; import mongoose from "mongoose"; import User from "../models/User.js"; import Movie from "../models/Movie.js"; import { southIndianMovies as S } from "../../frontend/src/data/southIndianMovies.js";
dotenv.config(); await mongoose.connect(process.env.MONGO_URI); await Movie.deleteMany();
await Movie.insertMany(S.map((m) => ({ title: m.title, description: m.description, poster: m.poster, trailer: m.trailer, releaseDate: new Date(m.year, 5, 1), genre: m.genre, director: m.director, cast: m.cast, language: m.language, duration: 160, averageRating: m.rating, totalRatings: m.votes })));
if (!(await User.findOne({ email: "admin@example.com" }))) await User.create({ name: "Admin", email: "admin@example.com", password: "Admin@123", role: "admin" });
console.log("Seeded movies + admin (admin@example.com / Admin@123)"); process.exit();
