import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

/** Adds new place to local file system */
export const addPlace = (title, image, location = { lat: 0, lng: 0 }) => {
  console.log("REDUX ACTION: adding place...");
  // operation is asynchronus so use async
  return async dispatch => {
    //Location
    /*const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }*/

    const address = "dum"; // resData.results[0].formatted_address;

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
        location.lng
      );
      console.log(dbResult);

      // trigger redux reducer to save info also in redux
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title: title,
          imageUri: newPath
          // address: address,
          /*coords: {
            lat: location.lat,
            lng: location.lng
          }*/
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
