import React from "react";
import { FlatList } from "react-native";
import FeaturedTile from "../components/FeaturedTile";

const HorizontalList = props => {
  return (
    <FlatList
      horizontal={true}
      data={props.data}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 10
      }}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <FeaturedTile
          onSelect={() => {
            props.navigation.navigate("Place", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
              placeImage: itemData.item.imageUri,
              featured: true
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

export default HorizontalList;
