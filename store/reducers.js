import { ADD_PLACE, SET_PLACES, DELETE_PLACE } from "./actions";
import Place from "../models/place";

const initialState = {
  places: []
};

export default placesReducer = (state = initialState, action) => {
  console.log("REDUX REDUCER: adding place...", action.payload);
  switch (action.type) {
    case SET_PLACES:
      // format SQLite data to match our Place() model
      return {
        places: action.places.map(
          pl =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        )
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.imageUri,
        action.payload.address,
        action.payload.lat,
        action.payload.lng
      );
      console.log("REDUX  REDUCER: ADD_PLACE", newPlace);
      return {
        places: state.places.concat(newPlace)
      };
    case DELETE_PLACE:
      const updatedPlaces = state.places.filter(
        place => place.id !== action.id
      );
      console.log("REDUX  REDUCER: DELETE_PLACE", updatedPlaces);
      return {
        places: updatedPlaces
      };
    default:
      return state;
  }
};
