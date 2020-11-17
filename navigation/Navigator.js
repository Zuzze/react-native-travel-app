import { createStackNavigator } from "@react-navigation/stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import React from "react";
import { Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants.js/Colors";
import { Ionicons } from "@expo/vector-icons";

export const Routes = {
  places: "Places",
  place: "Place",
  newPlace: "New",
  map: "Map"
};

const stackNavigatorConfig = {
  initialRouteName: Routes.places,
  navigationOptions: ({ navigate, navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text>Click</Text>
      </TouchableOpacity>
    )
  })
};

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.places}
        component={PlacesListScreen}
        options={({ navigate, navigation }) => ({
          headerTitle: props => <Text style={styles.headerText}>Hikes</Text>,
          headerStyle: {
            backgroundColor: Colors.header
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.newPlace)}
            >
              <Ionicons name="ios-add" style={styles.headerButton} size={30} />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen name={Routes.place} component={PlaceDetailsScreen} />
      <Stack.Screen
        name={Routes.newPlace}
        component={NewPlaceScreen}
        options={({ navigate, navigation }) => ({
          headerTitle: props => (
            <Text style={styles.headerText}>Add new place</Text>
          ),
          headerStyle: {
            backgroundColor: Colors.header
          },
          headerTintColor: Colors.headerText
        })}
      />
      <Stack.Screen name={Routes.map} component={MapScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: Colors.primary,
    color: Colors.light,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 2,
    borderRadius: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: Colors.headerText,
    fontSize: 20
  }
});

export default MainNavigator;
