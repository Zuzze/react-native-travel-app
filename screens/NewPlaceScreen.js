import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

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
    console.log("NEW PLACE: handleLocationPick", location);
    setSelectedLocation(location);
  }, []);

  const handleSaveplace = () => {
    dispatch(actions.addPlace(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Add New place</Text>
        <TextInput
          onChangeText={handleTitleChange}
          value={title}
          style={styles.textInput}
        />
        <ImagePicker onImageTaken={handleImageTaken} />
        <LocationPicker
          route={props.route}
          navigation={props.navigation}
          onLocationPicked={handleLocationPick}
        />
        <Button
          title="Save Place"
          onPress={handleSaveplace}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
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
