import { Link } from "react-router-dom";
import { getMoviePoster } from "../data/southIndianMovies";

export default function MovieCard({ m }) {
  if (!m) return null;

  const poster = getMoviePoster(m) || "/images/movies/vikram.jpg";

  return (
    <Link
      to={`/movie/${m._id}`}
      className="glass group block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50"
    >
      <div className="relative overflow-hidden">
        <img
          src={poster}
          alt={m.title || "Movie poster"}
          className="movie-poster"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/movies/vikram.jpg";
          }}
        />

        <span className="absolute right-2 top-2 rounded-lg bg-black/80 px-2 py-1 text-xs font-bold text-yellow-400">
          ★ {Number(m.averageRating || 0).toFixed(1)}
        </span>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-bold text-white group-hover:text-purple-400">
          {m.title}
        </h3>

        <p className="mt-1 text-xs text-white/60">
          {m.language || "Unknown"} ·{" "}
          {m.releaseDate
            ? new Date(m.releaseDate).getFullYear()
            : "N/A"}
        </p>

        <p className="mt-2 truncate text-xs text-white/50">
          {Array.isArray(m.genre)
            ? m.genre.join(", ")
            : m.genre}
        </p>

        <p className="mt-2 text-xs text-white/40">
          {m.totalRatings || 0} ratings
        </p>
      </div>
    </Link>
  );
}