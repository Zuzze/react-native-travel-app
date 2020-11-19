import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Place from "../components/Place";
import * as actions from "../store/actions";

const PlaceListScreen = props => {
  // note that name of the file in store is the first key, second one is inside places state
  const places = useSelector(state => state.places.places);
  console.log(
    "PLACES LIST",
    places.map(place => place.title)
  );
  const dispatch = useDispatch();

  // load places from local SQLite db
  useEffect(() => {
    dispatch(actions.loadPlaces());
  }, [dispatch]);

  if (!places || places.length < 1) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2020/11/16/22/58/mountains-5750804_1280.jpg"
          }}
          style={styles.image}
        >
          <View styles={styles.card}>
            <ImageBackground
              source={require("../assets/blur.png")}
              style={styles.cardBackground}
            >
              <Text style={styles.emptyText}>No places yet</Text>
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2019/10/08/18/13/matterhorn-4535693_1280.jpg"
        }}
        style={styles.image}
      >
        <FlatList
          ListHeaderComponent={() => (
            <Text style={styles.slogan}>Let the adventure begin</Text>
          )}
          data={places}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 90 }}
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  emptyText: {
    fontSize: 20,
    textAlign: "center"
  },
  emptyImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  slogan: {
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 20,
    marginTop: -90,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center"
  },
  cardBackground: {
    textAlign: "center",
    justifyContent: "center",
    padding: 50,
    margin: 20
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});
export default PlaceListScreen;
