import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  Button,
  ImageBackground,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Place from "../components/Place";
import * as actions from "../store/actions";
import HorizontalList from "../components/HorizontalList";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/Colors";

const PlaceListScreen = props => {
  // note that name of the file in store is the first key, second one is inside places state
  const places = useSelector(state => state.places.places);
  const featuredPlaces = useSelector(state => state.places.featured);

  // console.log("PLACES LIST", places);
  // console.log("FEATURED LIST", featuredPlaces);

  const dispatch = useDispatch();

  const Featured = () => {
    return (
      <View>
        <TitleText style={styles.slogan}>Let the adventure begin</TitleText>
        <TitleText style={styles.subtitle}>Featured</TitleText>
        <HorizontalList data={featuredPlaces} navigation={props.navigation} />
      </View>
    );
  };

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
              "https://cdn.pixabay.com/photo/2019/11/15/15/48/mountain-4628685_1280.jpg"
          }}
          style={styles.image}
        >
          <Featured />
          <View styles={styles.card}>
            <ImageBackground
              source={require("../assets/blur.png")}
              style={styles.cardBackground}
            >
              <BodyText style={styles.emptyText}>No own places yet</BodyText>
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
            "https://cdn.pixabay.com/photo/2019/11/15/15/48/mountain-4628685_1280.jpg"
        }}
        blurRadius={1}
        style={styles.image}
      >
        <FlatList
          ListHeaderComponent={() => <Featured />}
          data={places}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 90 }}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <Place
              onSelect={() => {
                props.navigation.navigate("Place", {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                  placeImage: itemData.item.imageUri,
                  featured: false
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
    fontSize: 18,
    color: Colors.dark,
    fontFamily: "montserrat",
    textAlign: "center"
  },
  emptyImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  slogan: {
    textAlign: "center",
    backgroundColor: "rgba(56,88,175,0.2)",
    paddingVertical: 20,
    marginTop: -90,
    fontSize: 16,
    color: "white"
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
    alignItems: "center",
    elevation: 5,
    // overflow: "hidden",
    shadowColor: "gray",
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }
  },
  subtitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 40,
    paddingTop: 20
  },
  cardBackground: {
    textAlign: "center",
    justifyContent: "center",
    padding: 50,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
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
