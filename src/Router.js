import React from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import { useAtom } from "jotai";

import LoginScreen from "./pages/LoginScreen";
import SeriesPage from "./pages/SeriesPage";
import SerieDetailPage from "./pages/SerieDetailPage";
import SerieFormPage from "./pages/SerieFormPage";

import { useDispatch } from "react-redux";
// import { logout } from "../src/store/actions";
import { logout } from "../src/storeJotai/userAtom";

import { setFieldAtom, isLoading } from "../src/storeJotai/serieFormAtom";

import { View, TouchableOpacity, Text, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  const [serieFormAtom, setSerieFormAtom] = useAtom(setFieldAtom);
  const [loading, setLoading] = useAtom(isLoading);

  const dispatch = useDispatch();

  function RenderLoading() {
    const navigation = useNavigation();
    return (
      <>
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => {
            setLoading(true);
            navigation.goBack();
          }}
        />
      </>
    );
  }

  function RenderResetFormButton() {
    const navigation = useNavigation();
    return (
      <>
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => {
            setLoading(true);
            setSerieFormAtom({ type: "setResetFormAtom" });
            navigation.goBack();
          }}
        />
      </>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTransparent: true,
          // title: "Series",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#6ca2f7",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
        }}
      >
        <Stack.Screen
          options={{
            headerTitleStyle: {
              color: "transparent",
              fontSize: 25,
            },
          }}
          name="Login"
          component={LoginScreen}
          // options={{ headerTitle: "Bem-vindo!", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Main"
          component={SeriesPage}
          options={({ navigation }) => ({
            headerTitle: "Series",
            headerTitleStyle: {
              color: "#d7d7de",
            },
            headerRight: () => (
              <View
                style={{
                  paddingRight: 15,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingTop: 5,
                  }}
                  onPress={() => logout(navigation)}
                >
                  <MaterialIcons name="exit-to-app" size={26} color="#d7d7de" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SerieDetail"
          component={SerieDetailPage}
          options={({ route, navigation }) => ({
            headerLeft: () => (
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    navigation.goBack();
                  }}
                >
                  <MaterialIcons name="west" size={26} color="white" />
                </TouchableOpacity>
              </View>
            ),
            title: route.params.serie.title,
            headerTitleStyle: {
              color: "transparent",
            },
          })}
        />
        <Stack.Screen
          name="SerieForm"
          component={SerieFormPage}
          options={({ route, navigation }) => ({
            // headerShown: false,
            headerLeft: () => (
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    setSerieFormAtom({ type: "setResetFormAtom" });
                    navigation.goBack();
                  }}
                >
                  <MaterialIcons name="west" size={26} color="white" />
                </TouchableOpacity>
              </View>
            ),
            title:
              route.params &&
              route.params.serieToEdit &&
              serieFormAtom.title !== ""
                ? route.params.serieToEdit.title
                : "Adicionar Série",
            headerTitleStyle: {
              color: "#d7d7de",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
