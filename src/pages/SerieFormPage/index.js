import React from 'react';
import {
    Picker,
    Slider,
    Alert
} from 'react-native';

import { KeyboardAvoidingView, ScrollView, TextInput, Image, ViewRate, TextRate, ViewButton, Button, ButtonClean, Loading, Text } from './styles';

import { connect } from 'react-redux';

import FormRow from '../../components/FormRow';
import { 
    setField, 
    saveSerie, 
    setWholeSerie, 
    resetForm 
} from '../../actions';

import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';

class SerieFormPage extends React.Component { 

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        const { navigation, setWholeSerie, resetForm } = this.props;
        const { params } = navigation.state;
        if (params && params.serieToEdit) {
            return setWholeSerie(params.serieToEdit);
        }
        return resetForm();
    }

    async pickImage() {

        
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
            this.props.setField('img64', result.base64);
            console.log('Aqui temos uma imagem!', result.base64);
        }
    }

    render() {
        const {
            serieForm, 
            setField, 
            saveSerie, 
            navigation,
            resetForm, 
        } = this.props;

        return (
            <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1}} enabled>
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                    <FormRow first>
                        <TextInput 
                            placeholder="Título"
                            placeholderTextColor= '#808080'
                            value={serieForm.title}
                            onChangeText={value => setField('title', value)}
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
                            onPress={() => this.pickImage()} 
                        />
                    </FormRow>
        
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={itemValue => setField('gender', itemValue)}>
                            
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
                        onValueChange={value => setField('rate', value)}
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
                            onChangeText={value => setField('description', value)}
                            numberOfLines={4}
                            multiline={true}
                        />
                </FormRow>
                    {
                        this.state.isLoading
                            ? <Loading color='light-blue' size='large'/>
                            : <ViewButton>
                                    <Button
                                        title="Salvar" 
                                        onPress={async () => {
                                            this.setState({ isLoading: true });
                                            try {
                                                await saveSerie(serieForm);
                                                navigation.goBack();
                                            } catch (error) {
                                                Alert.alert('Erro!', error.message);
                                            } finally{
                                                this.setState({ isLoading: false });
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
                                        onPress={() => {resetForm(serieForm)}} 
                                    />  
                               </ViewButton>
                    }    
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    
}


/*const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        width: 340,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: 'gray',
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    button: {
        //marginTop: 10,
        //backgroundColor: '#1E90FF',
        alignSelf: 'stretch',
        //marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        //height: 50,
    },
    viewButton: {
        padding: 15,
        //height: 150
    },
    buttonClean: {
        //marginTop: 10,
        //backgroundColor: '#1E90FF',
        alignSelf: 'stretch',
        //marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        //color: '#FF0000',
        //height: 50,
    },
    img: {
        aspectRatio: 1,
        width: '100%',
    },
});*/

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie,
    setWholeSerie,
    resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);