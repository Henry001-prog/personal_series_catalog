import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { tryLogin } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

import { Div, Form, Input, Loading, Button, ViewErrorMessage, ErrorMessage } from './styles';

import {showMessage} from "react-native-flash-message";

export default function LoginPage({ navigation} ) {
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    console.log('email:', email);

    const [password, setPassword] = useState('');
    console.log('password:', password);
    
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyCsNst_gYIg6AUwqqx-YVRZepywsNL_xI0",
            authDomain: "series-b92be.firebaseapp.com",
            databaseURL: "https://series-b92be.firebaseio.com",
            projectId: "series-b92be",
            storageBucket: "series-b92be.appspot.com",
            messagingSenderId: "828328217426",
            appId: "1:828328217426:web:52c7133173d11a64a3888b",
            measurementId: "G-EP4S5RF9SK"
        };
          // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }, []);

    function inputEmail(value) {
        //const fields = {...email.field};
        email = value;
        setEmail(email);
        console.log('email:', email)
    }

    function inputPassword(value) {
        //const fields = {...stateData2.field};
        password = value;
        setPassword(password);
        console.log('password:', password)
    }
    

    function getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    /*renderMesssage() {
        const {message} = .state;
        if (!message)
            return null;

        return (
            <ViewErrorMessage>
                <ErrorMessage>{message}</ErrorMessage>
            </ViewErrorMessage>
        );
    }*/

    function renderButton() {
        if (isLoading)
            return <Loading size='large' color='light-blue'/>;
        return (
            <Button 
                title='Entrar' 
                onPress={() => {dispatch(tryLogin(email, password, navigation, setIsLoading)); Keyboard.dismiss();}}/>
        );
    }

    return (
        <Div>
            <Form first>
                <Input 
                    placeholder="user@email.com"
                    placeholderTextColor= '#808080' 
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </Form>
            <Form last>
                <Input
                    placeholder="******"
                    placeholderTextColor= '#808080' 
                    secureTextEntry
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </Form>

            {renderButton()}
        </Div>
    );
}

/*const styles = StyleSheetcreate({
    container: {
        flex: 1,
        alignItems: 'center', // vertical
        justifyContent: 'center', // horizontal
        flexDirection: 'column', // vai alinhar verticalmente
        paddingHorizontal: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'grey',
        //backgroundColor: '#2c2c40' // antes não tinha cor de fundo
        //backgroundColor: '#202036'
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        width: 300,
        borderWidth: 2,
        fontSize: 17,
        borderRadius: 3,
        borderColor: 'transparent',
        borderBottomColor: 'gray',
    },
    button: {
        marginTop: 5,
    },
});*/

//export default connect(null, { tryLogin })(LoginPage);