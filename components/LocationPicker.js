import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";
import TitleText from "./TitleText";

/** Component to use phone native features to get location */
const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  // old props.navigation.getParam("pickedLocation") => props.route.params.pickedLocation
  // https://reactnavigation.org/docs/upgrading-from-4.x/#no-more-getparam

  const mapPickedLocation = props.route.params?.pickedLocation ?? null;

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  // on component mount fetch current location automatically if not available
  useEffect(() => {
    if (!mapPickedLocation) {
      handleGetLocationButtonPress();
    }
  }, []);

  // check permissions
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const handleGetLocationButtonPress = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });

      const locationCoordinates = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };

      // save location to component state hooks
      setPickedLocation(locationCoordinates);
      // trigger location to parent
      props.onLocationPicked(locationCoordinates);
    } catch (err) {
      Alert.alert(
        "Could not fetch location",
        "Please try again later or pick a location on the map.",
        [{ text: "OK" }]
      );
    }
    setIsFetching(false);
  };

  const handleMapPress = () => {
    // navigate to map page to show full page map
    props.navigation.navigate("Map", {
      initialLocation: pickedLocation
    });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={handleMapPress}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <TitleText>No location chosen yet!</TitleText>
        )}
      </MapPreview>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    borderRadius: 30,
    overflow: "hidden",
    height: 149
    /*elevation: 5,
    shadowColor: "gray",
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }*/
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default LocationPicker;

/**
 *     <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={handleGetLocationButtonPress}
        />
           <View style={styles.actions}>
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={handleMapPress}
        />
      </View>
 */
