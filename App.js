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
        contentContainerStyle={styles.list}
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        numColumns={3}
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
    paddingTop: 22,
    backgroundColor: "#fff",
  },
  list: {
    justifyContent: "center",
    flexDirection: "column",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
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
});
