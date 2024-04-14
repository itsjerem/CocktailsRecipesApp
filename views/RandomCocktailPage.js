import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { getRandomCocktail, getCocktailDetails } from "../api/api";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RandomCocktailPage() {
  const [cocktail, setCocktail] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getRandomCocktail().then((response) => {
      const cocktailId = response.data.drinks[0].idDrink;
      getCocktailDetails(cocktailId).then((response) => {
        setCocktail(response.data.drinks[0]);
      });
    });
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      let favorites = await AsyncStorage.getItem("favorites");
      favorites = favorites ? JSON.parse(favorites) : [];
      setFavorites(favorites);
    };

    fetchFavorites();
  }, []);

  const addToFavorites = async (cocktail) => {
    let favorites = await AsyncStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];
    favorites.push(cocktail);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };

  const removeFromFavorites = async (idDrink) => {
    let favorites = await AsyncStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];
    favorites = favorites.filter((cocktail) => cocktail.idDrink !== idDrink);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };

  const isFavorite = (idDrink) => {
    return favorites.some((cocktail) => cocktail.idDrink === idDrink);
  };

  const fetchRandomCocktail = async () => {
    const response = await getRandomCocktail();
    const cocktailId = response.data.drinks[0].idDrink;
    const details = await getCocktailDetails(cocktailId);
    setCocktail(details.data.drinks[0]);
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return cocktail ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() =>
            isFavorite(cocktail.idDrink)
              ? removeFromFavorites(cocktail.idDrink)
              : addToFavorites(cocktail)
          }
        >
          <AntDesign
            name={isFavorite(cocktail.idDrink) ? "heart" : "hearto"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      <TouchableOpacity
        style={styles.randomButton}
        onPress={fetchRandomCocktail}
      >
        <Text style={styles.randomButtonText}>🍹 Another one!</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructions: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    marginLeft: 5,
  },
  randomButton: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  randomButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

//coucou step 6
