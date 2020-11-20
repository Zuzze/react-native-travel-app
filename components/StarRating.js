import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = props => {
  return (
    <View style={styles.stars}>
      <Ionicons
        color="#555555"
        name="ios-star"
        size={props.size ? props.size : 16}
      ></Ionicons>
      <Ionicons
        color="#555555"
        name={props.rating >= 2 ? "ios-star" : "ios-star-outline"}
        size={props.size ? props.size : 16}
      ></Ionicons>
      <Ionicons
        color="#555555"
        name={props.rating >= 3 ? "ios-star" : "ios-star-outline"}
        size={props.size ? props.size : 16}
      ></Ionicons>
      <Ionicons
        color="#555555"
        name={props.rating >= 4 ? "ios-star" : "ios-star-outline"}
        size={props.size ? props.size : 16}
      ></Ionicons>
      <Ionicons
        color="#555555"
        name={props.rating === 5 ? "ios-star" : "ios-star-outline"}
        size={props.size ? props.size : 16}
      ></Ionicons>
      <Text style={styles.count}>({props.count ? props.count : 2})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stars: {
    flexDirection: "row"
  },
  count: {
    fontSize: 14,
    marginLeft: 5,
    alignItems: "center",
    color: "#555555"
  }
});

export default StarRating;
