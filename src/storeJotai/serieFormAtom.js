import firebase from "@firebase/app";
import "@firebase/database";
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
  } catch (e) {
    console.log("deu algum erro aqui no firebase");
  }
};
