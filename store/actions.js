import * as FileSystem from "expo-file-system";
import {
  insertPlace,
  fetchPlaces,
  deletePlaceFromDatabase
} from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_PLACE = "DELETE_PLACE";

/** Adds new place to local file system */
export const addPlace = (title, image, location) => {
  console.log("REDUX ACTION: adding place...", title, image, location);
  // operation is asynchronus so use async
  return async dispatch => {
    //Location
    const addressResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        location.lat
      },${location.lng}&key=${ENV().googleApiKey}`
    );

    const elevationResponse = await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${
        location.lat
      },${location.lng}&key=${ENV().googleApiKey}`
    );

    if (!addressResponse.ok || !elevationResponse.ok) {
      throw new Error("Request failed!");
    }

    const addressResData = await addressResponse.json();

    if (!addressResData.results) {
      throw new Error("Address geocoding could not be handled!");
    }

    const elevationResData = await elevationResponse.json();
    if (!elevationResData.results) {
      throw new Error("Elevation data could not be handled!");
    }

    const address = addressResData.results[0].formatted_address;
    const elevation = elevationResData.results[0].elevation
      ? elevationResData.results[0].elevation.toFixed()
      : "Not available";
    console.log("ELEVATION", elevation);

    // image, move async moves image from place A to B
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    // operations in file system can always fail, wrap to try-catch
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });

      // connecct to db
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng,
        elevation
      );
      console.log(dbResult);

      // trigger redux reducer to save info also in redux
      // use ID from db result in redux too
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title: title,
          imageUri: newPath,
          address: address,
          lat: location.lat,
          lng: location.lng,
          elevation
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

/** Adds new place to local file system */
export const deletePlace = id => {
  console.log("REDUX ACTION: deleting place...", id);
  /*const dbResult = await deletePlaceFromDatabase(id);
    console.log(dbResult);
    if (dbResult) {
        return true
    }*/
  return async dispatch => {
    dispatch({ type: DELETE_PLACE, id: id });
  };
  // operation is asynchronus so use async
  /*return async dispatch => {
    console.log("started dispatch");
    try {
      console.log("REDUX ACTION: deleting place...");
      const dbResult = await deletePlaceFromDatabase(id);
      console.log(dbResult);
      dispatch({ type: DELETE_PLACE, id: id });
    } catch (err) {
      throw err;
    }
  };*/
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      console.log("REDUX ACTION: loading places...");
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
