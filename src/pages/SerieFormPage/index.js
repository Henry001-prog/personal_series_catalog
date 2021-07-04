import React, { useEffect, useState } from 'react';
import {
    Picker,
    Slider,
    Alert
} from 'react-native';

import { KeyboardAvoidingView, ScrollView, TextInput, Image, ViewRate, TextRate, ViewButton, Button, ButtonClean, Loading, Text } from './styles';

import { useSelector, useDispatch } from 'react-redux';

import FormRow from '../../components/FormRow';
import { 
    setField, 
    saveSerie, 
    setWholeSerie, 
    resetForm 
} from '../../actions';

import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';

export default function SerieFormPage({ navigation }) { 

    const [isLoading, setIsLoading] = useState(false);

    const serieForm = useSelector((state) => state.serieForm);
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(setWholeSerie());
        //dispatch(resetForm());
        const { params } = navigation.state;
        if (params && params.serieToEdit) {
            dispatch(setWholeSerie(params.serieToEdit));
        } else {
            dispatch(resetForm());
        }
    }, [dispatch]);

    async function pickImage() {

        
		/* Para câmera:
		const { status } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL,
			Permissions.CAMERA
		); */

        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert('Você precisa permitir o acesso!');
            return;
        }

        
		/*const result = await ImagePicker.launchCameraAsync({
			quality: 0.2,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1], // Android only
		});*/

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.3,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1], // Android only
        });

        if(!result.cancelled) {
            dispatch(setField('img64', result.base64));
            console.log('Aqui temos uma imagem!', result.base64);
        }
    }

    return (
        <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1}} enabled>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <FormRow first>
                    <TextInput 
                        placeholder="Título"
                        placeholderTextColor= '#808080'
                        value={serieForm.title}
                        onChangeText={value => dispatch(setField('title', value))}
                    />
                </FormRow>

                <FormRow>
                    { 
                        serieForm.img64
                            ? <Image 
                                source={{
                                    uri: `data:image/jpeg;base64,${serieForm.img64}`
                                }}/> 
                            : null 
                    }

                    <Button 
                        title="Selecione uma imagem" 
                        onPress={() => pickImage()} 
                    />
                </FormRow>
    
                <FormRow>
                    <Picker
                        selectedValue={serieForm.gender}
                        onValueChange={itemValue => dispatch(setField('gender', itemValue))}>
                        
                        <Picker.Item label="Policial" value="Policial" color='#808080' />
                        <Picker.Item label="Comédia" value="Comédia" color='#808080' />
                        <Picker.Item label="Terror" value="Terror" color='#808080' />
                        <Picker.Item label="Ficção Científica" value="Ficção Científica" color='#808080' />
                        <Picker.Item label="Ação" value="Ação" color='#808080' />
                        <Picker.Item label="Drama" value="Drama" color='#808080' />
                </Picker>
            </FormRow>
    
            <FormRow>
                <ViewRate>
                    <Text>Nota:</Text>
                    <Text>{serieForm.rate}</Text>
                </ViewRate>
                <Slider 
                    onValueChange={value => dispatch(setField('rate', value))}
                    value={serieForm.rate}
                    minimumValue={0}
                    maximumValue={100}
                    step={5} />
            </FormRow>
    
            <FormRow>
                    <TextInput
                        placeholder="Descrição"
                        placeholderTextColor= '#808080'
                        value={serieForm.description}
                        onChangeText={value => dispatch(setField('description', value))}
                        numberOfLines={4}
                        multiline={true}
                    />
            </FormRow>
                {
                    isLoading
                        ? <Loading color='light-blue' size='large'/>
                        : <ViewButton>
                                <Button
                                    title="Salvar" 
                                    onPress={async () => {
                                        setIsLoading(true);
                                        try {
                                            await dispatch(saveSerie(serieForm));
                                            navigation.goBack();
                                        } catch (error) {
                                            Alert.alert('Erro!', error.message);
                                        } finally{
                                            setIsLoading(false);
                                        }
                                    }} />  
                            </ViewButton>
                }

                { 
                    serieForm.id
                            ? null
                            : <ViewButton>
                                <ButtonClean
                                    title="Limpar Formulário"
                                    color='#8B0000' 
                                    onPress={() => {dispatch(resetForm(serieForm))}} 
                                />  
                            </ViewButton>
                }    
            </ScrollView>
        </KeyboardAvoidingView>
    );
    
    
}