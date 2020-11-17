import { ADD_PLACE } from "./actions";
import Place from "../models/place";

const initialState = {
  places: []
};

export default placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.payload.title);
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};
