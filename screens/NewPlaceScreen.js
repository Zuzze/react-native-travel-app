import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import ImagePicker from "../components/ImagePicker";

const NewPlacesScreen = props => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const handleTitleChange = value => {
    console.log(value);
    setTitle(value);
  };

  const handleImageTaken = imagePath => {
    setSelectedImage(imagePath);
  };

  const handleLocationPick = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  const handleSaveTitle = () => {
    dispatch(actions.addPlace(title));
    props.navigation.goBack();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Add New place</Text>
      <TextInput
        onChangeText={handleTitleChange}
        value={title}
        style={styles.textInput}
      />
      <ImagePicker onImageTaken={handleImageTaken} />
      <Button
        title="Save Place"
        onPress={handleSaveTitle}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});
export default NewPlacesScreen;
