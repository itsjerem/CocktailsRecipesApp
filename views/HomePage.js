import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getCocktails } from "../api/api";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [cocktails, setCocktails] = useState([]);
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      let favorites = await AsyncStorage.getItem("favorites");
      favorites = favorites ? JSON.parse(favorites) : [];
      setFavorites(favorites);
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    getCocktails().then((response) => {
      setCocktails(response.data.drinks);
    });
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

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CocktailDetails", {
                  cocktailId: item.idDrink,
                })
              }
            >
              <Image
                style={styles.image}
                source={{ uri: item.strDrinkThumb }}
              />
              <View style={styles.cocktail}>
                <Text style={styles.text}>{item.strDrink}</Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() =>
                    isFavorite(item.idDrink)
                      ? removeFromFavorites(item.idDrink)
                      : addToFavorites(item)
                  }
                >
                  <AntDesign
                    name={isFavorite(item.idDrink) ? "heart" : "hearto"}
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  cocktail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    marginLeft: 5,
  },
});
