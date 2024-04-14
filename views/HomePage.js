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
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [cocktails, setCocktails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCocktails().then((response) => {
      setCocktails(response.data.drinks);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("CocktailDetails", {
                cocktailId: item.idDrink,
              })
            }
          >
            <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
            <Text style={styles.text}>{item.strDrink}</Text>
          </TouchableOpacity>
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
});
