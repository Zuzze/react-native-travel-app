import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import StarRating from "./StarRating";
import BodyText from "./BodyText";

const FeaturedTile = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: props.imageUri }} />
        <View style={styles.infoContainer}>
          <StarRating
            count={Math.floor(Math.random() * 40) + 1}
            rating={Math.floor(Math.random() * 6) + 4}
          />
          <BodyText style={styles.title}>{props.title}</BodyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    //borderBottomColor: "#ccc",
    //borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 25,
    width: 120,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },

  card: {
    borderRadius: 25,
    paddingVertical: 20,
    overflow: "hidden",
    flex: 1,
    height: 170,
    marginTop: -40,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: 115,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    marginBottom: 10,
    backgroundColor: "#ccc"
    // borderColor: Colors.primary,
    // borderWidth: 1
  },
  infoContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    color: "black",
    fontSize: 12,
    marginBottom: -7
  },
  address: {
    color: "#666",
    fontSize: 10
  }
});

export default FeaturedTile;
