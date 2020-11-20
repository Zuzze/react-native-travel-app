import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import BodyText from "./BodyText";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImgPicker = props => {
  // path to image
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      // Gallery
      Permissions.CAMERA_ROLL,
      // Real time camera
      Permissions.CAMERA
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage(image.uri);

    // trigger parent function
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <TouchableOpacity onPress={handleTakeImage}>
            <View style={styles.noImageContainer}>
              <Ionicons name="ios-camera" size={40} color={"gray"} />
              <BodyText style={styles.noImage}>Take image</BodyText>
            </View>
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30

    // overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30
  },
  noImageContainer: {
    alignItems: "center"
  },
  noImage: {
    color: Colors.dark,
    fontSize: 16
  }
});

export default ImgPicker;

/**
 *   <Button
        title="Take Image"
        color={Colors.primary}
        onPress={handleTakeImage}
      />
 */
