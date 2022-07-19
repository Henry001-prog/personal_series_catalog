import React, { useEffect, useState, useRef } from "react";
import { Keyboard } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";

// import { tryLogin } from "../../store/actions";
import { tryLogin } from "../../storeJotai/userAtom";
import { useSelector, useDispatch } from "react-redux";

import {
  Div,
  Form,
  Input,
  Loading,
  Button,
  TextButton,
  ViewErrorMessage,
  ErrorMessage,
} from "./styles";

import { showMessage } from "react-native-flash-message";

export default function LoginPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  //console.log('email:', email);
  const [password, setPassword] = useState("");
  //console.log('password:', password);

  const input2Ref = useRef();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCsNst_gYIg6AUwqqx-YVRZepywsNL_xI0",
      authDomain: "series-b92be.firebaseapp.com",
      databaseURL: "https://series-b92be.firebaseio.com",
      projectId: "series-b92be",
      storageBucket: "series-b92be.appspot.com",
      messagingSenderId: "828328217426",
      appId: "1:828328217426:web:52c7133173d11a64a3888b",
      measurementId: "G-EP4S5RF9SK",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  function getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      default:
        return "Erro desconhecido";
    }
  }

  function renderButton() {
    if (isLoading) return <Loading size="large" color="light-blue" />;
    return (
      <Button
        title="Entrar"
        onPress={() => {
          tryLogin(email, password, navigation, setIsLoading);
          Keyboard.dismiss();
        }}
      >
        <TextButton>Entrar</TextButton>
      </Button>
    );
  }

  return (
    <Div>
      <Form first>
        <Input
          placeholder="user@email.com"
          placeholderTextColor="#808080"
          value={email}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(value) => setEmail(value)}
          onSubmitEditing={() => input2Ref.current.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Form>
      <Form last>
        <Input
          placeholder="******"
          placeholderTextColor="#808080"
          returnKeyType="next"
          blurOnSubmit={false}
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
          ref={input2Ref}
          onSubmitEditing={() => {
            tryLogin(email, password, navigation, setIsLoading);
            Keyboard.dismiss();
          }}
        />
      </Form>

      {renderButton()}
    </Div>
  );
}
