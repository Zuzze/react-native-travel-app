import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ImageBackground,
  ScrollView
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import BodyText from "../components/BodyText";
import Fonts from "../constants/Fonts";

const NewPlacesScreen = props => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const handleTitleChange = value => {
    setTitle(value);
  };

  const handleImageTaken = imagePath => {
    setSelectedImage(imagePath);
  };

  // wrap to useCallback so that functiion is not created again on every location pick
  const handleLocationPick = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  const handleSaveplace = () => {
    dispatch(actions.addPlace(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <ImageBackground
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2019/11/15/15/48/mountain-4628685_1280.jpg"
        }}
        blurRadius={1}
        style={styles.form}
      >
        <View style={styles.overlay}>
          <BodyText style={styles.label}>Place title</BodyText>
          <TextInput
            onChangeText={handleTitleChange}
            value={title}
            style={styles.textInput}
          />
          <BodyText style={styles.label}>Select image</BodyText>
          <ImagePicker onImageTaken={handleImageTaken} />
          <BodyText style={styles.label}>Select location</BodyText>
          <LocationPicker
            route={props.route}
            navigation={props.navigation}
            onLocationPicked={handleLocationPick}
          />
          <View style={styles.button}>
            <Button
              title="Save Place"
              onPress={handleSaveplace}
              color={Colors.primary}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 0,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  label: {
    fontSize: 16,
    color: "#444444",
    fontFamily: Fonts.title,
    paddingVertical: 20
  },
  textInput: {
    borderBottomColor: "#222",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,

    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 20
  },
  button: {
    borderRadius: 30,
    backgroundColor: Colors.primary,
    overflow: "hidden",
    marginVertical: 10
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 30
  }
});
export default NewPlacesScreen;
