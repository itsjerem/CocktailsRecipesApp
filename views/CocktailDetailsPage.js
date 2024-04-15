// CocktailDetailsPage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getCocktailDetails } from "../api/api";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CocktailDetailsPage() {
  const [cocktail, setCocktail] = useState(null);
  const route = useRoute();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getCocktailDetails(route.params.cocktailId).then((response) => {
      setCocktail(response.data.drinks[0]);
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

  return cocktail ? (
    <ScrollView>
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

        <View>
          <Text style={styles.title}>Ingredients</Text>
          {[...Array(15)].map((_, i) => {
            const ingredient = cocktail[`strIngredient${i + 1}`];
            const measure = cocktail[`strMeasure${i + 1}`];
            if (ingredient && measure) {
              return (
                <Text key={i}>
                  {ingredient} - {measure}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </View>
    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  instructions: {
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    marginLeft: 5,
  },
});
