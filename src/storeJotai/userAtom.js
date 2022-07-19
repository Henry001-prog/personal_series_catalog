import firebase from "firebase";
import { Alert } from "react-native";

export const tryLogin = async (email, password, navigation, setIsLoading) => {
  setIsLoading(true);
  function getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return setIsLoading(false);
      case "auth/user-not-found":
        return "Usuário não encontrado";
      default:
        return "Erro desconhecido";
    }
  }
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setIsLoading(true);
    if (user) {
      // const action = userLoginSuccess(user);
      // dispatch(action);
      navigation.replace("Main");
    }
    setIsLoading(false);
  } catch (error) {
    getMessageByErrorCode(error.code);
    console.warn("O erro: ", error.code);
    if (error.code === "auth/user-not-found") {
      return new Promise((resolve, reject) => {
        Alert.alert(
          "Usuário não encontrado",
          "Deseja criar um cadastro com as informações inseridas?",
          [
            {
              text: "Não",
              onPress: () => {
                resolve();
                setIsLoading(false);
              },
              style: "cancel", // IOS
            },
            {
              text: "Sim",
              onPress: () => {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(resolve)
                  .catch(reject);
                navigation.replace("Main");
              },
            },
          ],
          { cancelable: false }
        );
      });
    }
    return await Promise.reject(error);
  }
};

export const logout = async (navigation) => {
  try {
    const tryLogout = firebase.auth().signOut();
    // const action = userLogout(tryLogout);
    // console.warn("Deslogou: ", tryLogout);
    // dispatch(action);
    navigation.replace("Login");
  } catch (error) {
    Alert.alert("Não foi possível carregar os dados!");
    return;
  }
};
