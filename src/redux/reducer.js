import {
  GET_ALL_DOGS,
  GET_DOGS_DETAIL,
  GET_DOG_BY_NAME,
  FILTER_BY_TEMPEREMENTS,
  GET_DOGS_TEMPEREMENTS,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "./actionTypes";

const initialState = {
  allDogs: [],
  filteredDogs: [],
  detail: {},
  temperaments: [],
  copyDogs: [],
};

export const reducer = (state = initialState, action) => {
  const dogOrder = [
    ...(state.filteredDogs.length ? state.filteredDogs : state.allDogs),
  ];

  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        copyDogs: action.payload,
        filteredDogs: [],
      };

    case GET_DOGS_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_DOG_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };

    case FILTER_BY_TEMPEREMENTS:
      if (action.payload === "all") {
        return {
          ...state,
          filteredDogs: state.allDogs,
        };
      }

      return {
        ...state,
        filteredDogs: state.allDogs.filter((dog) =>
          dog.temperaments?.includes(action.payload)
        ),
      };
    // let filteredDogs = state.allDogs; // inicializa el filtro con todos los perros
    // if (action.payload === "all") {
    //   filteredDogs = state.allDogs.filter((dog) =>
    //     dog.temperaments?.includes(action.payload)
    //   );
    // }
    // return {
    //   ...state,
    //   copyDogs: filteredDogs,
    //   pageDogs: filteredDogs, // también actualiza la variable pageDogs
    // };

    case GET_DOGS_TEMPEREMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_CREATED:
      if (action.payload === "all") {
        return {
          ...state,
          filteredDogs: state.allDogs,
        };
      }
      return {
        ...state,
        filteredDogs: state.allDogs.filter((d) =>
          action.payload === "created" ? d.createdDb : !d.createdDb
        ),
      };

    case ORDER_BY_NAME:
      if (action.payload === "default") {
        return {
          ...state,
          filteredDogs: dogOrder.sort((a, b) => a.id - b.id),
        };
      }

      return {
        ...state,
        filteredDogs: dogOrder.sort((a, b) =>
          action.payload === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        ),
      };

    case ORDER_BY_WEIGHT:
      if (action.payload === "default") {
        return {
          ...state,
          filteredDogs: dogOrder.sort((a, b) => a.id - b.id),
        };
      }

      return {
        ...state,
        filteredDogs: dogOrder.sort((a, b) =>
          action.payload === "asc"
            ? a.weightMin - b.weightMin
            : b.weightMin - a.weightMin
        ),
      };

    // const sortedWeight = state.copyDogs.slice().sort(function (a, b) {
    //   if (parseInt(a.weightMin) < parseInt(b.weightMin)) {
    //     return action.payload === "WeightMin" ? -1 : 1;
    //   }
    //   if (parseInt(a.weightMin) > parseInt(b.weightMin)) {
    //     return action.payload === "WeightMin" ? 1 : -1;
    //   }
    //   return 0;
    // });
    // return {
    //   ...state,
    //   copyDogs: sortedWeight,
    // };

    default:
      return state;
  }
};
