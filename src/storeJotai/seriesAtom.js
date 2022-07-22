import firebase from "@firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";

export const watchSeriesJotaiAtom = async () => {
  try {
    const { currentUser } = await firebase.auth();

    const base = firebase.database().ref(`/users/${currentUser.uid}/series`);
    const snapshot = await base.once("value");
    const series = snapshot.val();

    const keys = Object.keys(series);
    const seriesWithKeys = keys.map((id) => {
      return { ...series[id], id };
    });

    return seriesWithKeys;
  } catch (error) {
    if (!error.message.includes("null is not an object")) {
      Alert.alert("Error: could not login!");
    }
  }
};

export const watchSeriesJotai = atom();
export const isLoading = atom(false);

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
