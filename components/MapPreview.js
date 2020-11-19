import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import ENV from "../env";

/* Component that uses Google Maps Static API*/
const MapPreview = props => {
  let imagePreviewUrl;

  const mapType = "hybrid"; // hybrid, satellite, roadmap, terrain
  const zoom = 13;
  const markerColor = "blue"; // any web color
  const markerSize = "small"; // tiny, mid, small, normal (default)
  const markerLabel = "A"; // only visible on mid and default size
  const centerCoords = `${props.location?.lat ?? 0},${props.location?.lng ??
    0}`;
  const coords = centerCoords;

  // API uses | character as separator that must be encoded before sensing the request
  // encoded value of | is %7C
  // total marker format is markers=markerStyles|markerLocation1| markerLocation2|
  // total url example
  // https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=YOUR_API_KEY
  const pipe = "%7C";

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerCoords}&zoom=${zoom}&size=400x200&maptype=${mapType}&markers=color:${markerColor}${pipe}size:${markerSize}${pipe}label:${markerLabel}${pipe}${coords}&key=${
      ENV().googleApiKey
    }`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});

export default MapPreview;
