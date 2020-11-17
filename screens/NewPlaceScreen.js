import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Colors from "../constants.js/Colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const NewPlacesScreen = props => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleTitleChange = value => {
    console.log(value);
    setTitle(value);
  };

  const handleSaveTitle = () => {
    dispatch(actions.addPlace({ title: title }));
    props.navigation.goBack();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Add New place</Text>
      <TextInput onChange={handleTitleChange} style={styles.textInput} />
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
