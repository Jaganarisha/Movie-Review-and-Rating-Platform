
export const southIndianMovies = [
  {
    id: "vikram-2022",
    title: "Vikram",
    language: "Tamil",
    year: 2022,
    rating: 4.4,
    votes: 18200,
    director: "Lokesh Kanagaraj",
    genre: ["Action", "Thriller"],
    hue: 275,
    description: "A covert squad hunts a masked gang behind a string of killings, and an old agent's past resurfaces to change the whole investigation.",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil", "Suriya"],
    poster: "/images/movies/vikram.jpg",
    trailer: "",
  },
  {
    id: "rrr-2022",
    title: "RRR",
    language: "Telugu",
    year: 2022,
    rating: 4.6,
    votes: 25100,
    director: "S. S. Rajamouli",
    genre: ["Action", "Drama"],
    hue: 20,
    description: "Two legendary revolutionaries form an unlikely friendship in the 1920s, until their loyalties are put to the test against colonial rule.",
    cast: ["N. T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
    poster: "/images/movies/rrr.jpg",
    trailer: "",
  },
  {
    id: "kgf-2-2022",
    title: "KGF: Chapter 2",
    language: "Kannada",
    year: 2022,
    rating: 4.2,
    votes: 21400,
    director: "Prashanth Neel",
    genre: ["Action", "Crime"],
    hue: 45,
    description: "Rocky rules the gold fields, but a ruthless new enemy and the government close in as his empire grows ever larger.",
    cast: ["Yash", "Sanjay Dutt", "Srinidhi Shetty", "Raveena Tandon"],
    poster: "/images/movies/kgf-2.jpg",
    trailer: "",
  },
  {
    id: "manjummel-boys-2024",
    title: "Manjummel Boys",
    language: "Malayalam",
    year: 2024,
    rating: 4.5,
    votes: 9800,
    director: "Chidambaram",
    genre: ["Survival", "Drama"],
    hue: 160,
    description: "A group of friends on a trip to Kodaikanal face a terrifying rescue when one of them falls into a deep cave.",
    cast: ["Soubin Shahir", "Sreenath Bhasi", "Ganapathi", "Balu Varghese"],
    poster: "/images/movies/manjummel-boys.jpg",
    trailer: "",
  },
  {
    id: "kantara-2022",
    title: "Kantara",
    language: "Kannada",
    year: 2022,
    rating: 4.5,
    votes: 16700,
    director: "Rishab Shetty",
    genre: ["Mythology", "Thriller"],
    hue: 130,
    description: "In a coastal village, a land dispute between locals and the forest officer awakens an ancient guardian spirit tradition.",
    cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore", "Achyuth Kumar"],
    poster: "/images/movies/kantara.jpg",
    trailer: "",
  },
  {
    id: "master-2021",
    title: "Master",
    language: "Tamil",
    year: 2021,
    rating: 3.9,
    votes: 12300,
    director: "Lokesh Kanagaraj",
    genre: ["Action", "Drama"],
    hue: 330,
    description: "A hard-drinking professor is sent to a juvenile home, where he clashes with a gangster who uses the boys for his crimes.",
    cast: ["Vijay", "Vijay Sethupathi", "Malavika Mohanan", "Arjun Das"],
    poster: "/images/movies/master.jpg",
    trailer: "",
  },
];

export const moviePosters = {
  vikram: "/images/movies/vikram.jpg",
  rrr: "/images/movies/rrr.jpg",
  master: "/images/movies/master.jpg",
  "manjummel boys": "/images/movies/manjummel-boys.jpg",
  "kgf chapter 2": "/images/movies/kgf-2.jpg",
  "kgf: chapter 2": "/images/movies/kgf-2.jpg",
  kantara: "/images/movies/kantara.jpg",
};

export function getMoviePoster(movie) {
  if (!movie) return "";
  if (movie.poster && String(movie.poster).trim()) {
    return movie.poster;
  }
  const title = String(movie.title || "").trim().toLowerCase();
  const normalized = title.replace(/[:.\-]/g, " ").replace(/\s+/g, " ").trim();
  return moviePosters[title] || moviePosters[normalized] || "";
}
