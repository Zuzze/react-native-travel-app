import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Place from "../components/Place";
import * as actions from "../store/actions";

const PlaceListScreen = props => {
  // note that name of the file in store is the first key, second one is inside places state
  const places = useSelector(state => state.places.places);
  console.log("PLACES LIST", places);
  const dispatch = useDispatch();

  // load places from local SQLite db
  useEffect(() => {
    dispatch(actions.loadPlaces());
  }, [dispatch]);

  if (!places || places.length < 1) {
    return (
      <View>
        <Text>No places yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Place
          onSelect={() => {
            props.navigation.navigate("Place", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
              placeImage: itemData.item.imageUri
            });
          }}
          imageUri={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
        />
      )}
    />
  );
};

export default PlaceListScreen;
