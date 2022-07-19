import firebase from "@firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

export const watchSeriesJotaiAtom = async () => {
  try {
    const { currentUser } = await firebase.auth();
    console.warn("Login: ", currentUser);

    const base = firebase.database().ref(`/users/${currentUser.uid}/series`);
    const snapshot = await base.once("value");
    const series = snapshot.val();

    // const { currentUser } = firebase.auth();

    const keys = Object.keys(series);
    const seriesWithKeys = keys.map((id) => {
      return { ...series[id], id };
    });
    //return { series: seriesWithKeys };

    // if (!series) {
    //   return {};
    // }

    console.warn("Dados: ", seriesWithKeys);

    return seriesWithKeys;
  } catch (error) {
    if (!error.message.includes("null is not an object")) {
      Alert.alert("Error: could not login!");
    }
    // Alert.alert(JSON.stringify(responseJson))
  }

  // const action = setSeries(seriesWithKeys);
  // dispatch(action);
};

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
    console.warn("Form: ", newState);
    return newState;
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

const wholeSerie = (action) => {
  return action.serie;
};

const resetForm = (serieFormJotai) => {
  return INITIAL_STATE;
};

export const setFieldAtom = atomWithReducer([], formReducer);
export const setWholeSerieAtom = atomWithReducer({}, wholeSerie);
export const resetFormAtom = atomWithReducer(INITIAL_STATE, resetForm);

export const watchSeriesJotai = atom();
export const isLoading = atom(false);
console.warn("Load: ", watchSeriesJotai);

export const deleteSerie = (serie, navigation) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Deletar",
      `Deseja deletar série ${serie.title}?`,
      [
        {
          text: "Não",
          onPress: () => {
            resolve(false);
          },
          style: "cancel", // IOS
        },
        {
          text: "Sim",
          onPress: async () => {
            const { currentUser } = firebase.auth();
            try {
              await firebase
                .database()
                .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                .remove();
              resolve(true);
              navigation.goBack();
            } catch (e) {
              reject(e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  });
};
