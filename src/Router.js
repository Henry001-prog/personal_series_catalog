import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/LoginScreen';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../src/store/actions';

import { View, TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={
                    { 
                        title: 'Series',
                        headerTitleAlign: 'center',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: '#6ca2f7',
                        },
                        headerTitleStyle: {
                            color: 'white',
                            fontSize: 25,
                        } 
                    }
                }
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Bem-vindo!', headerTitleAlign: 'center' }} />
                <Stack.Screen name="Main" component={SeriesPage} options={({navigation}) => ({
                    headerTitle: 'Bem-vindo!',
                    headerRight: () => (
                        <View style={{paddingRight: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={{ 
                                    backgroundColor: '#87CEFA',
                                    borderRadius: 25,
                                    paddingTop: 5,
                                    height: 40, 
                                    width: 85,
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                }}
                                onPress={() => dispatch(logout(navigation))}>
                                <Text
                                    style={{
                                    fontSize: 18,
                                    color: 'white',
                                    flexDirection: 'row',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                    }}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }) } />
                <Stack.Screen name="SerieDetail" component={SerieDetailPage} options={({ navigation, route }) => ({
                    //const { serie } = navigation.state.params;
                    title: route.params.serie.title,
                }) } />
                <Stack.Screen name="SerieForm" component={SerieFormPage} options={({ navigation, route }) => {
                    if (route.params && route.params.serieToEdit) {
                        return {
                            title: route.params.serieToEdit.title,
                        }
                    }
                    return {
                        title: 'Adicionar Série',
                    };

                } } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}