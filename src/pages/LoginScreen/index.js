import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { tryLogin } from '../../actions';

import { Div, Form, Input, Loading, Button, ViewErrorMessage, ErrorMessage } from './styles';

import {showMessage} from "react-native-flash-message";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount() {
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
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin() {
        this.setState({isLoading: true, message: ''});
        const {email, password} = this.state;

        this.props.tryLogin({ email, password })
            .then(user => {
                if (user) {
                    return this.props.navigation.replace('Main');
                }
                this.setState({
                    isLoading: false,
                    message: ''
                });
            })
            .catch(error => {
                showMessage({
                    message: this.getMessageByErrorCode(error.code),
                    type: 'danger',
                    autoHide: true,
                    duration: 5000,
                    description: 'Tente novamente',
                    icon: "danger",
                    style: {justifyContent: 'center'},
                  });     
            }).finally(() => {
                this.setState({
                    isLoading: false,
                    message: '',
                });
            });
    }

    getMessageByErrorCode(errorCode) {
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
        const {message} = this.state;
        if (!message)
            return null;

        return (
            <ViewErrorMessage>
                <ErrorMessage>{message}</ErrorMessage>
            </ViewErrorMessage>
        );
    }*/

    renderButton() {
        if (this.state.isLoading)
            return <Loading size='large' color='light-blue'/>;
        return (
            <Button 
                title='Entrar' 
                onPress={() => {this.tryLogin(); Keyboard.dismiss();}}/>
        );
    }

    render() {
        return (
            <Div>
                <Form first>
                    <Input 
                        placeholder="user@email.com"
                        placeholderTextColor= '#808080' 
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandler('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </Form>
                <Form last>
                    <Input
                        placeholder="******"
                        placeholderTextColor= '#808080' 
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </Form>

                {this.renderButton()}
            </Div>
        )
    }
}

/*const styles = StyleSheet.create({
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

export default connect(null, { tryLogin })(LoginPage);