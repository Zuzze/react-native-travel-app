import { createStackNavigator } from "@react-navigation/stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TitleText from "../components/TitleText";

export const Routes = {
  places: "Places",
  place: "Place",
  newPlace: "New",
  map: "Map"
};

const stackNavigatorConfig = {
  headerStyle: {
    backgroundColor: Colors.header
  },
  headerTintColor: Colors.headerText
};

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.places}
        component={PlacesListScreen}
        options={({ navigate, navigation }) => ({
          headerTitle: props => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Ionicons name="ios-pin" size={20} />
              <TitleText style={styles.headerHomeText}>SwissHikes</TitleText>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.newPlace)}
            >
              <Ionicons name="ios-add" style={styles.headerButton} size={30} />
            </TouchableOpacity>
          ),
          ...stackNavigatorConfig
        })}
      />
      <Stack.Screen
        name={Routes.place}
        component={PlaceDetailsScreen}
        options={({ navigate, navigation }) => ({
          ...stackNavigatorConfig
        })}
      />
      <Stack.Screen
        name={Routes.newPlace}
        component={NewPlaceScreen}
        options={({ navigate, navigation }) => ({
          headerTitle: props => (
            <Text style={styles.headerText}>Add new place</Text>
          ),
          ...stackNavigatorConfig
        })}
      />
      <Stack.Screen
        name={Routes.map}
        component={MapScreen}
        options={({ navigate, navigation }) => ({
          headerTitle: props => <Text style={styles.headerText}>Map</Text>,
          ...stackNavigatorConfig
        })}
      />
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
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "montserrat-bold"
  },
  headerHomeText: {
    color: Colors.headerText,

    marginLeft: 10,
    fontSize: 20,
    fontFamily: "sofia"
  }
});

export default MainNavigator;
