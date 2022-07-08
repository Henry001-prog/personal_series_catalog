import firebase from "@firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";

export const watchSeriesJotaiAtom = atom(async () => {
  const { currentUser } = firebase.auth();

  const base = firebase.database().ref(`/users/${currentUser.uid}/series`);
  const snapshot = await base.once("value");
  const series = snapshot.val();

  const keys = Object.keys(series);
  const seriesWithKeys = keys.map((id) => {
    return { ...series[id], id };
  });
  //return { series: seriesWithKeys };

  console.warn("Dados: ", seriesWithKeys);

  return seriesWithKeys;

  // const action = setSeries(seriesWithKeys);
  // dispatch(action);
});
