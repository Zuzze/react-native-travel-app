import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = props => {
  const { placeTitle, placeId } = props.route.params;

  useEffect(() => {
    // dynamic title (place name) in react navigation 5.x is defined like this
    // must be wrapped inside useEffect/use layout effect
    props.navigation.setOptions({ title: placeTitle });
  }, [placeTitle]);

  return (
    <View>
      <Text>{placeTitle}</Text>
    </View>
  );
};

export default PlaceDetailsScreen;
