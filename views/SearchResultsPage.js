import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchResultsPage = ({ route }) => {
  const { query } = route.params;
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => setResults(data.drinks))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats de recherche pour : {query}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CocktailDetails", {
                cocktailId: item.idDrink,
              })
            }
          >
            <View style={styles.item}>
              <View style={styles.cocktail}>
                <Image
                  style={styles.image}
                  source={{ uri: item.strDrinkThumb }}
                />
                <Text style={styles.text}>{item.strDrink}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    alignItems: "left",
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
    marginLeft: 10,
  },
  cocktail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    marginLeft: 5,
  },
  query: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default SearchResultsPage;
