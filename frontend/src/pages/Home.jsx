import { useEffect, useState } from "react"; import api from "../services/api"; import HeroCarousel from "../components/HeroCarousel"; import MovieCard from "../components/MovieCard"; import { getMoviePoster } from "../data/southIndianMovies";
const toHero = (m) => ({ id: m._id, title: m.title, language: m.language, year: new Date(m.releaseDate).getFullYear(), rating: m.averageRating, votes: m.totalRatings, director: m.director, genre: m.genre, description: m.description, cast: m.cast, poster: getMoviePoster(m), trailer: m.trailer, hue: (m.title.charCodeAt(0) * 7) % 360 });
export default function Home() {
  const [f, setF] = useState({ q: "", genre: "", year: "", language: "", sort: "newest", page: 1 }); const [d, setD] = useState({ movies: [], pages: 1 }); const [hero, setHero] = useState([]); const [busy, setBusy] = useState(true);
  useEffect(() => { api.get("/movies", { params: { sort: "rating", limit: 6 } }).then((r) => setHero(r.data.movies.map(toHero))).catch(() => {}); }, []);
  useEffect(() => { setBusy(true); const t = setTimeout(() => api.get("/movies", { params: { ...f, limit: 12 } }).then((r) => setD(r.data)).finally(() => setBusy(false)), 300); return () => clearTimeout(t); }, [f]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value, page: 1 });
  return (<><HeroCarousel {...(hero.length ? { movies: hero } : {})} />
    <section className="mx-auto max-w-6xl px-4 py-8"><div className="mb-6 grid gap-3 md:grid-cols-5">
      <input className="input md:col-span-2" placeholder="Search title, actor or director" value={f.q} onChange={set("q")} />
      <select className="input" value={f.language} onChange={set("language")}><option value="">All languages</option>{["Tamil", "Telugu", "Malayalam", "Kannada"].map((l) => <option key={l}>{l}</option>)}</select>
      <input className="input" placeholder="Year" type="number" value={f.year} onChange={set("year")} />
      <select className="input" value={f.sort} onChange={set("sort")}><option value="newest">Newest</option><option value="rating">Top rated</option><option value="popular">Popular</option></select>
      <select className="input" value={f.genre} onChange={set("genre")}><option value="">All genres</option>{["Action", "Drama", "Thriller", "Crime", "Mythology", "Survival", "Romance", "Comedy"].map((g) => <option key={g}>{g}</option>)}</select></div>
      {busy ? <p className="py-20 text-center text-white/50">Loading movies…</p> : d.movies.length === 0 ? <p className="py-20 text-center text-white/50">No movies match your filters.</p> :
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">{d.movies.map((m) => <MovieCard key={m._id} m={m} />)}</div>}
      <div className="mt-8 flex justify-center gap-3"><button className="btn" disabled={f.page <= 1} onClick={() => setF({ ...f, page: f.page - 1 })}>Prev</button><span className="py-2 text-sm">{f.page} / {d.pages || 1}</span><button className="btn" disabled={f.page >= d.pages} onClick={() => setF({ ...f, page: f.page + 1 })}>Next</button></div></section></>); }
