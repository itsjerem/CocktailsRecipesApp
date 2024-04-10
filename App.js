import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getCocktails } from "./api/api";

export default function App() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    getCocktails().then((response) => {
      setCocktails(response.data.drinks);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
            <Text style={styles.text}>{item.strDrink}</Text>
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
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});
