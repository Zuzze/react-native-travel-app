import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Place from "../components/Place";

const PlaceListScreen = props => {
  const places = useSelector(state => state.places.places);
  console.log(places);

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
              placeId: itemData.item.id
            });
          }}
          image={null}
          title={itemData.item.title}
          address={null}
        />
      )}
    />
  );
};

export default PlaceListScreen;
