import React, { useEffect } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailsScreen = props => {
  const { placeTitle, placeId } = props.route.params;

  const selectedPlace = useSelector(state => {
    return state.places.places.find(place => place.id === placeId);
  });
  console.log("SELECTE PLACE", selectedPlace);

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  useEffect(() => {
    // dynamic title (place name) in react navigation 5.x is defined like this
    // must be wrapped inside useEffect/use layout effect
    props.navigation.setOptions({ title: placeTitle });
  }, [placeTitle]);

  const handleShowMap = () => {
    console.log("handle", selectedLocation);
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.title}>{placeTitle}</Text>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={handleShowMap}
        />
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
    width: "95%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  address: {
    color: "gray",
    textAlign: "center"
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailsScreen;
