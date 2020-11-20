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

const Place = props => {
  // console.log("PLACE", props);
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      style={props.small ? styles.smallPlaceItem : styles.placeItem}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2020/11/01/11/19/mountains-5703439_1280.jpg"
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Alpstein</Text>
          <StarRating rating={4} count={21} />
        </View>
        <Text style={styles.address}>Appenzell District</Text>
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
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
  smallPlaceItem: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginTop: 30,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
  card: {
    borderRadius: 25,
    paddingVertical: 20,
    overflow: "hidden",
    flex: 1,
    marginTop: -40
  },
  image: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    marginBottom: 20,
    backgroundColor: "#ccc"
    // borderColor: Colors.primary,
    // borderWidth: 1
  },
  infoContainer: {
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: "#666",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 20
  }
});

export default Place;

/*
 <Image
          style={styles.image}
          source={{
            uri: props.imageUri
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.address}>{props.address}</Text>
        </View>
*/
