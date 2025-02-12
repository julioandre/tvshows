import { defineStore } from "pinia";
import { ref } from "vue";
import type { MovieItem } from "@/types/movieItem";
import type { ShowItem } from "@/types/movieResponse";
import axios from "axios";

export const useDataStore = defineStore("shows", () => {
  const shows = ref<MovieItem[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);
  const fetchShows = async () => {
    loading.value = true;
    try {
      console.log("Fetching..");
      const response = await axios.get<ShowItem[]>("https://api.tvmaze.com/shows");
      shows.value = response.data.map((item: ShowItem) => ({
        id: item.id,
        name: item.name,
        summary: item.summary.replace(/<[^>]+>/g, ""),
        image: item.image.medium,
        status: item.status,
        premiered: item.premiered,
        genres: item.genres,
        rating: item.rating.average,
      }));
    } catch (err) {
      error.value = "Failed to fetch movies. Please try again later.";
      console.error("Error fetching movies:", err);
    } finally {
      loading.value = false; // Set loading state to false
    }
  };
  return { shows, error, loading, fetchShows };
});
