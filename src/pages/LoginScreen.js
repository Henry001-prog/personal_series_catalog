import React from 'react';
import { 
    View, 
    TextInput,
    Text,
    StyleSheet, 
    Button, 
    ActivityIndicator,
    Alert
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { tryLogin } from '../actions';

import FormRow from '../components/FormRow';

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
            .catch(error =>{
                this.setState({
                    isLoading: false, 
                    message: this.getMessageByErrorCode(error.code)
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

    renderMesssage() {
        const {message} = this.state;
        if (!message)
            return null;

        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <Button 
                title='Entrar' 
                onPress={() => this.tryLogin()}/>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput
                        style={styles.input} 
                        placeholder="user@email.com"
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandler('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style={styles.input} 
                        placeholder="******" 
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                {this.renderButton()}
                {this.renderMesssage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // vertical
        justifyContent: 'center', // horizontal
        flexDirection: 'column', // vai alinhar verticalmente
        paddingHorizontal: 20,
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: '#2c2c40' // antes não tinha cor de fundo
        //backgroundColor: '#202036'
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        width: 300,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: 'gray',
    },
    button: {
        marginTop: 5,
    },
});

export default connect(null, { tryLogin })(LoginPage);