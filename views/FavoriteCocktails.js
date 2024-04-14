// FavoriteCocktails.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCocktails() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const removeFromFavorites = async (idDrink) => {
    let favorites = await AsyncStorage.getItem("favorites");
    favorites = favorites ? JSON.parse(favorites) : [];
    favorites = favorites.filter((cocktail) => cocktail.idDrink !== idDrink);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      let favorites = await AsyncStorage.getItem("favorites");
      favorites = favorites ? JSON.parse(favorites) : [];
      setFavorites(favorites);
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cocktails</Text>
      <FlatList
        data={favorites}
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
                  onPress={() => removeFromFavorites(item.idDrink)}
                >
                  <AntDesign name="heart" size={24} color="red" />
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
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
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
