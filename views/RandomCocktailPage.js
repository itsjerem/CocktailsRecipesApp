import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getRandomCocktail, getCocktailDetails } from "../api/api";

export default function RandomCocktailPage() {
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    getRandomCocktail().then((response) => {
      const cocktailId = response.data.drinks[0].idDrink;
      getCocktailDetails(cocktailId).then((response) => {
        setCocktail(response.data.drinks[0]);
      });
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
    marginTop: 50,
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
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
});
