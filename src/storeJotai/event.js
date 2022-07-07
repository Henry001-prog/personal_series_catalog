import firebase from "@firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";
import { loadable } from "jotai/utils"

let seriesWithKeys
export const watchSeriesJotaiAtom = async() => {
    const { currentUser } = firebase.auth();
  
    
        firebase
       .database()
       .ref(`/users/${currentUser.uid}/series`)
       .on("value", async(snapshot) => {
         const series = snapshot.val();
 
         const keys = Object.keys(series);
         seriesWithKeys = keys.map((id) => {
           return { ...series[id], id };
         });
         //return { series: seriesWithKeys };
 
         console.warn('Dados: ', seriesWithKeys)
     
         return seriesWithKeys
 
         // const action = setSeries(seriesWithKeys);
         // dispatch(action);
       })
  
  
};

export const loadableAtom = loadable(watchSeriesJotaiAtom)

watchSeriesJotaiAtom()
console.warn('event: ', seriesWithKeys)

export const seriesListAtom = atom(seriesWithKeys)


// import firebase from "@firebase/app";
// import "@firebase/database";
// import { Alert } from "react-native";
// import { atom } from "jotai";
// import { loadable } from "jotai/utils";

// const watchSeriesJotaiAtom =  () => {

//   const teste = {
//         teste: "Olá",
//       };
//       return teste

//       // const action = setSeries(seriesWithKeys);
//       // dispatch(action);
    
// };

// const { teste } = watchSeriesJotaiAtom()

// console.warn('event: ', teste)

// // export const seriesList = atom(watchSeriesJotaiAtom)

// export const loadableAtom = loadable(watchSeriesJotaiAtom);

// export const test = atom((get) => {
//   return get(watchSeriesJotaiAtom);
// });

