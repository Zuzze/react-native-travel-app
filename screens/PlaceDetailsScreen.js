import React, { useEffect } from "react";
import {
  ScrollView,
  Image,
  Button,
  View,
  Alert,
  Text,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";
import { deletePlaceFromDatabase } from "../helpers/db";
import * as actions from "../store/actions";
import StarRating from "../components/StarRating";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PlaceDetailsScreen = props => {
  const { placeTitle, placeId, featured } = props.route.params;

  let selectedPlace;

  if (featured) {
    selectedPlace = useSelector(state => {
      return state.places.featured.find(place => place.id === placeId);
    });
  } else {
    selectedPlace = useSelector(state => {
      return state.places.places.find(place => place.id === placeId);
    });
  }

  const dispatch = useDispatch();

  const selectedLocation = {
    lat: selectedPlace?.lat ?? 0,
    lng: selectedPlace?.lng ?? 0
  };

  useEffect(() => {
    // dynamic title (place name) in react navigation 5.x is defined like this
    // must be wrapped inside useEffect/use layout effect
    props.navigation.setOptions({
      headerTitle: props => (
        <TitleText style={{ color: Colors.dark, fontSize: 16 }}>
          {placeTitle}
        </TitleText>
      )
    });
  }, [placeTitle]);

  const handleShowMap = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation
    });
  };

  const deletePlace = async () => {
    try {
      const placeDeleted = await deletePlaceFromDatabase(placeId);
      if (placeDeleted) {
        console.log("place deletion succesfully finished");
        dispatch(actions.deletePlace(placeId));
        props.navigation.navigate("Places");
      }
    } catch (err) {
      console.log("place deletion failed", err);
      Alert.alert(
        "Deletion failed",
        "System could not delete the place",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const handleDeletePlace = () => {
    Alert.alert(
      "Are you sure?",
      "All information of this place will be lost.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deletePlace() }
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image
        source={{ uri: selectedPlace?.imageUri ?? null }}
        style={styles.image}
      />
      <View style={styles.locationContainer}>
        <View style={styles.titleContainer}>
          <TitleText style={styles.title}>{placeTitle}</TitleText>
          {featured && (
            <StarRating style={styles.rating} count={34} rating={4} size={20} />
          )}
        </View>
        <View style={styles.addressContainer}>
          <BodyText style={styles.address}>
            {selectedPlace?.address ?? "Not available"}
          </BodyText>
        </View>
        <View style={styles.mapContainer}>
          <MapPreview
            style={styles.mapPreview}
            location={selectedLocation}
            onPress={handleShowMap}
          />
          {!featured && (
            <TouchableOpacity style={styles.button} onPress={handleDeletePlace}>
              <BodyText>
                Delete <Ionicons name="ios-trash" size={20} />
              </BodyText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc"
  },
  locationContainer: {
    marginTop: -50,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "black",
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  titleContainer: {
    padding: 10,
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  addressContainer: {
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "left",
    color: "#333333"
  },
  address: {
    fontSize: 18,
    color: "gray",
    textAlign: "left"
  },
  mapContainer: {
    alignItems: "center",
    width: "100%"
  },
  mapPreview: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  button: {
    width: "100%",
    margin: 20,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.primary,
    overflow: "hidden",
    minWidth: 200,
    padding: 10
  }
});

export default PlaceDetailsScreen;
