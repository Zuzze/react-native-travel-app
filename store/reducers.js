import { ADD_PLACE } from "./actions";
import Place from "../models/place";

const initialState = {
  places: []
};

export default placesReducer = (state = initialState, action) => {
  console.log("REDDUCER", action.payload);
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.payload.title,
        action.payload.imageUri
      );
      console.log("new", newPlace);
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};
