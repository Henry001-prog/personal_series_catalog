import firebase from 'firebase';
import { Alert } from 'react-native';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});

export const tryLogin = (email, password, navigation, setIsLoading) => async dispatch => {
    setIsLoading(true);
    try {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
            setIsLoading(true);
            if(user) {
                const action = userLoginSuccess(user);
                dispatch(action);
                navigation.replace('Main');
            }
            setIsLoading(false);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return new Promise((resolve, reject) => {
                Alert.alert(
                    'Usuário não encontrado',
                    'Deseja criar um cadastro com as informações inseridas?',
                    [{
                        text: 'Não',
                        onPress: () => {resolve(); setIsLoading(false);},
                        style: 'cancel' // IOS
                    }, {
                        text: 'Sim',
                        onPress: () => {
                            firebase
                                .auth()
                                .createUserWithEmailAndPassword(email, password)
                                .then(resolve)
                                .catch(reject);
                                navigation.replace('Main');
                        }
                    }],
                    { cancelable: false }
                );
            });

        }
        return await Promise.reject(error);
    }
}


export const logout = (navigation) => async dispatch => {
    try {
        const tryLogout = firebase.auth().signOut();
        const action = userLogout(tryLogout);
        dispatch(action);
        navigation.replace('Login');
    } catch (error) {
        Alert.alert("Não foi possível carregar os dados!");
        return;
    }
}