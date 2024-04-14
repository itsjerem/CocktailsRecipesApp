import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RandomCocktailPage from "../views/RandomCocktailPage";
import CocktailDetailsPage from "../views/CocktailDetailsPage";
import HomePage from "../views/HomePage";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            title: "Drink-it",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 7,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate("RandomCocktail")}
              >
                <Text style={{ color: "#f4511e" }}>Random Cocktail</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CocktailDetails"
          component={CocktailDetailsPage}
          options={{
            title: "Cocktail Details",
            headerStyle: {
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
