import { useEffect, useState } from "react";
import { Star, Play, Ticket, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { southIndianMovies, getMoviePoster } from "../data/southIndianMovies";

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

function Poster({ movie, className = "" }) {
  const poster = getMoviePoster(movie);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [poster]);

  const showImage = Boolean(poster) && !failed;
  const fallback = {
    background: `linear-gradient(160deg, hsl(${movie.hue} 70% 35%), hsl(${movie.hue + 40} 60% 10%))`,
  };
  return (
    <div className={`relative overflow-hidden ${className}`} style={showImage ? undefined : fallback}>
      {showImage ? (
        <img
          src={poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-white/90">
          <Film className="h-8 w-8 opacity-70" />
          <span className="text-lg font-bold leading-tight">{movie.title}</span>
        </div>
      )}
    </div>
  );
}

export default function HeroCarousel({ movies = southIndianMovies }) {
  const [i, setI] = useState(0);
  const n = movies.length;
  const at = (k) => movies[(i + k + n) % n];
  const go = (d) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [i]);

  const m = at(0);

  return (
    <section className="relative overflow-hidden bg-black px-4 py-12 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-all duration-700"
        style={{ background: `radial-gradient(60% 60% at 70% 30%, hsl(${m.hue} 80% 30% / .55), transparent), radial-gradient(40% 50% at 10% 90%, #7c3aed55, transparent)` }}
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-6">
        <button onClick={() => go(-1)} aria-label="Previous movie" className="z-10 rounded-full bg-white/10 p-2 backdrop-blur hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
          <ChevronLeft />
        </button>

        {/* Previous poster (dimmed, tilted) */}
        <button onClick={() => go(-1)} aria-label={`Show ${at(-1).title}`} className="hidden w-44 shrink-0 opacity-50 transition hover:opacity-80 lg:block" style={{ transform: "perspective(900px) rotateY(18deg)" }}>
          <Poster movie={at(-1)} className="aspect-[2/3] rounded-2xl" />
        </button>

        {/* Active card: poster + glass details panel */}
        <div key={m.id} className="flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-900/40 backdrop-blur-xl md:min-h-[420px] md:flex-row">
          <div className="relative md:w-1/2">
            <Poster movie={m} className="aspect-[2/3] md:absolute md:inset-0 md:aspect-auto" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            <button className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-5 py-2 text-sm font-semibold shadow-lg hover:brightness-110">
              <Ticket className="h-4 w-4" /> Book now
            </button>
          </div>

          <div className="flex flex-col gap-3 p-6 md:w-1/2">
            <span className="w-fit rounded-full bg-amber-400/15 px-3 py-0.5 text-xs font-medium text-amber-300">
              {m.language} · {m.year}
            </span>
            <h2 className="text-2xl font-bold">{m.title}</h2>

            <div className="flex items-center gap-1 text-sm text-white/70">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-4 w-4 ${s <= Math.round(m.rating) ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
              ))}
              <span className="ml-2">{(m.votes / 1000).toFixed(1)}K voters</span>
            </div>

            <p className="text-sm leading-relaxed text-white/70">{m.description}</p>
            <p className="text-xs text-white/50">Directed by {m.director} · {m.genre.join(", ")}</p>

            <div>
              <p className="mb-2 text-sm font-semibold">Cast</p>
              <div className="flex flex-wrap gap-2">
                {m.cast.map((c) => (
                  <span key={c} title={c} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-purple-600/40 text-xs font-semibold">
                    {initials(c)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-3">
              <a href={m.trailer || "#"} className="text-sm font-semibold text-white/90 hover:text-amber-300">Watch trailer</a>
              <a href={`/movie/${m.id}`} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold hover:brightness-110">
                <Play className="h-4 w-4 fill-white" /> Play now
              </a>
            </div>
          </div>
        </div>

        {/* Next poster */}
        <button onClick={() => go(1)} aria-label={`Show ${at(1).title}`} className="hidden w-44 shrink-0 opacity-50 transition hover:opacity-80 lg:block" style={{ transform: "perspective(900px) rotateY(-18deg)" }}>
          <Poster movie={at(1)} className="aspect-[2/3] rounded-2xl" />
        </button>

        <button onClick={() => go(1)} aria-label="Next movie" className="z-10 rounded-full bg-white/10 p-2 backdrop-blur hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
