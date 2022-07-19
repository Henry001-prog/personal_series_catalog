import firebase from "@firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

const INITIAL_STATE = {
  id: null,
  title: "",
  gender: "Policial",
  rate: 0,
  img64: "",
  description: "",
};

const formReducer = (state = INITIAL_STATE, action) => {
  if (action.type === "setWholeSerieJotai") {
    return action.serieToEdit;
  } else if (action.type === "setResetFormAtom") {
    return INITIAL_STATE;
  } else {
    const newState = { ...state };
    newState[action.field] = action.value;
    // console.warn("Form: ", newState);
    return newState;
  }
};

export const isLoading = atom(false);
export const setFieldAtom = atomWithReducer([], formReducer);

export const saveSerie = async (serie) => {
  const { currentUser } = firebase.auth();
  const db = firebase.database();
  try {
    if (serie.id) {
      await db.ref(`/users/${currentUser.uid}/series/${serie.id}`).set(serie);
    } else {
      await db.ref(`/users/${currentUser.uid}/series`).push(serie);
    }
    // dispatch(serieSavedSuccess());
  } catch (e) {
    console.log("deu algum erro aqui no firebase");
  }
};

// const formReducer = (prev, action) => {
//   if (action.type === "SET_FIELD") {
//     console.warn("Load1: ", action.series);
//     return action.series;
//   } else {
//     throw new Error("unknown action type");
//   }
// };

// const wholeSerie = (action) => {
//   return action.serie;
// };

// const resetForm = (serieFormJotai) => {
//   return INITIAL_STATE;
// };

// export const setWholeSerieAtom = atomWithReducer({}, wholeSerie);
// export const resetFormAtom = atomWithReducer(INITIAL_STATE, resetForm);
