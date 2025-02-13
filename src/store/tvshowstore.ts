import { defineStore } from "pinia";
import { ref } from "vue";
import type { MovieItem } from "@/types/movieItem";
import type { ShowItem } from "@/types/movieResponse";
import axios from "axios";
import type { Link } from "@/types/links";

export const useDataStore = defineStore("shows", () => {
  const shows = ref<MovieItem[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);
  const links = ref<Link[]>([
    { name: "Action", icon: "🏃‍♂️", path: "/about" },
    { name: "Thriller", icon: "😱", path: "/thriller" },
    { name: "Comedy", icon: "😂", path: "/comedy" },
    { name: "Sports", icon: "⚽", path: "/sports" },
    { name: "Science-Fiction", icon: "👽", path: "/sci-fi" },
    { name: "Drama", icon: "🎭", path: "/drama" },
    { name: "Romance", icon: "🌹", path: "/romance" },
    { name: "Horror", icon: "👻", path: "/horror" },
    { name: "War", icon: "🪖", path: "/war" },
    { name: "Adventure", icon: "🗺️", path: "/adventure" },
    { name: "Family", icon: "👨‍👩‍👧‍👦", path: "/family" },
    { name: "Fantasy", icon: "🏰", path: "/fantasy" },
  ]);
  const fetchShows = async () => {
    loading.value = true;
    try {
      const response = await axios.get<ShowItem[]>("https://api.tvmaze.com/shows");
      shows.value = response.data.map((item: ShowItem) => ({
        id: item.id,
        name: item.name,
        summary: item.summary.replace(/<[^>]+>/g, ""),
        image: item.image.original,
        status: item.status,
        premiered: item.premiered,
        genres: item.genres,
        rating: item.rating.average,
        ended: item.ended,
        network: item.network,
      }));
    } catch (err) {
      error.value = "Failed to fetch movies. Please try again later.";
      console.error("Error fetching movies:", err);
    } finally {
      loading.value = false; // Set loading state to false
    }
  };
  return { shows, error, loading, fetchShows, links };
});
