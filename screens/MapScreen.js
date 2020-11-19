import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

/** Interactive Map Screen */

const MapScreen = props => {
  const initialLocation = props.route.params.initialLocation;
  const readonly = props.route.params.readonly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // react-native-maps format
  // latitude and longitude define the center focus point of the map
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    // surface region
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const handleSelectLocation = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocation = useCallback(() => {
    console.log("MAP SCREEN: selected location", selectedLocation);
    if (!selectedLocation) {
      // could show an alert!
      console.error("MAP SCREEN: Location not valid");
      return;
    }
    props.navigation.navigate("New", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    if (!readonly) {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocation}
          >
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        )
      });
    }
    // props.navigation.setParams({ saveLocation: savePickedLocation });
  }, [savePickedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={handleSelectLocation}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default MapScreen;
