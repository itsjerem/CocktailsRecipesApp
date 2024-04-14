// CocktailDetailsPage.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getCocktailDetails } from "../api/api";

export default function CocktailDetailsPage() {
  const [cocktail, setCocktail] = useState(null);
  const route = useRoute();

  useEffect(() => {
    getCocktailDetails(route.params.cocktailId).then((response) => {
      setCocktail(response.data.drinks[0]);
    });
  }, []);

  return cocktail ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
    </View>
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
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  instructions: {
    marginTop: 10,
    textAlign: "center",
  },
});
