import { ADD_PLACE, SET_PLACES, DELETE_PLACE } from "./actions";
import Place from "../models/place";
import { featuredPlaces } from "../data/featuredPlaces";

const initialState = {
  places: [],
  featured: featuredPlaces // Connect this with dynamic API data if wanted
};

export default placesReducer = (state = initialState, action) => {
  console.log("REDUX REDUCER: SET_PLACES.", action.payload);

  switch (action.type) {
    case SET_PLACES:
      // format SQLite data to match our Place() model
      return {
        ...state,
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
        ...state,
        places: state.places.concat(newPlace)
      };
    case DELETE_PLACE:
      const updatedPlaces = state.places.filter(
        place => place.id !== action.id
      );
      console.log("REDUX  REDUCER: DELETE_PLACE", updatedPlaces);
      return {
        ...state,
        places: updatedPlaces
      };
    default:
      return state;
  }
};
