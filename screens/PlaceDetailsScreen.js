import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = props => {
  return (
    <View>
      <Text>Place</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOption = navData => {
  return {
    headerTitle: navData.navigationOption.getParam("placeTitle")
  };
};

export default PlaceDetailsScreen;
