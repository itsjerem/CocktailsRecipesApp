import axios from "axios";

const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export const getCocktails = () => api.get("search.php?s=");

export const getRandomCocktail = () => api.get("random.php");

export const getCocktailDetails = (id) => api.get(`lookup.php?i=${id}`);
