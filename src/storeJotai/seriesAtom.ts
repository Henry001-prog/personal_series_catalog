import firebase from "firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";

import { SeriesType } from "../interfaces/seriesType";
import { MainScreenNavigationProp } from "../types/navigation";

export const watchSeriesJotaiAtom = async (): Promise<SeriesType[] | undefined> => {
  try {
    const { currentUser } = await firebase.auth();

    const base = firebase.database().ref(`/users/${currentUser!.uid}/series`);
    const snapshot = await base.once("value");
    const series = snapshot.val();

    const keys = Object.keys(series);
    const seriesWithKeys: SeriesType[] = keys.map((id) => {
      return { ...series[id], id };
    });

    const isLast = { isLast: true } as SeriesType;
    return [...seriesWithKeys, isLast];
  } catch (error: any) {
    if (!error.message.includes("null is not an object")) {
      Alert.alert("Error: could not login!");
    }
  }
};

export const watchSeriesJotai = atom<SeriesType[] | undefined>([]);
export const isLoading = atom<boolean>(false);

// const navigation = useNavigation<MainScreenNavigationProp>();

export const deleteSerie = (serie: SeriesType, navigation: MainScreenNavigationProp) => {
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
                .ref(`/users/${currentUser!.uid}/series/${serie.id}`)
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
