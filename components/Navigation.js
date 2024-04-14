import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import RandomCocktailPage from "../views/RandomCocktailPage";
import CocktailDetailsPage from "../views/CocktailDetailsPage";
import SearchResultsPage from "../views/SearchResultsPage";
import FavoriteCocktails from "../views/FavoriteCocktails";
import HomePage from "../views/HomePage";
import { AntDesign, Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigation();
  const searchInputRef = useRef(null);

  return (
    <TextInput
      ref={searchInputRef}
      style={{
        height: 35,
        borderColor: "lightgray",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        width: 170,
      }}
      onChangeText={(text) => setSearchValue(text)}
      value={searchValue}
      placeholder="Search for a cocktail"
      onSubmitEditing={() =>
        navigation.navigate("SearchResults", { query: searchValue })
      }
    />
  );
}
function Navigation() {
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Retour"
          component={HomePage}
          options={({ navigation }) => ({
            // title: "Drink-it",
            headerTitle: () => (
              <Image
                source={require("../assets/logo.png")}
                style={{ width: 100, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: "tomato",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {searchVisible && <SearchBar />}
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    padding: 7,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setSearchVisible(!searchVisible);
                    if (!searchVisible) {
                      setTimeout(() => {
                        if (searchInputRef.current) {
                          searchInputRef.current.focus();
                        }
                      }, 100);
                    }
                  }}
                >
                  <Feather name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    padding: 7,
                    marginRight: 10,
                  }}
                  onPress={() => navigation.navigate("FavoriteCocktails")}
                >
                  <AntDesign name="hearto" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    padding: 7,
                    marginRight: 10,
                  }}
                  onPress={() => navigation.navigate("RandomCocktail")}
                >
                  <Text style={{ color: "tomato" }}>Random Cocktail</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteCocktails"
          component={FavoriteCocktails}
          options={{
            title: "Favorite Cocktails",
            headerStyle: {
              backgroundColor: "tomato",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "left",
          }}
        />
        <Stack.Screen name="SearchResults" component={SearchResultsPage} />
        <Stack.Screen
          name="CocktailDetails"
          component={CocktailDetailsPage}
          options={{
            title: "Cocktail Details",
            headerStyle: {
              backgroundColor: "tomato",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "left",
          }}
        />
        <Stack.Screen
          name="RandomCocktail"
          component={RandomCocktailPage}
          options={{
            title: "Random Cocktail",
            headerStyle: {
              backgroundColor: "tomato",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "left",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
