import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Picker,
    Slider,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator, 
    Alert,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';
import { 
    setField, 
    saveSerie, 
    setWholeSerie, 
    resetForm 
} from '../actions';


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

    render() {
        const {
            serieForm, 
            setField, 
            saveSerie, 
            navigation,
            resetForm, 
        } = this.props;

        return (
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}} enabled>
                <ScrollView>
                    <FormRow first>
                        <TextInput
                            style={styles.input} 
                            placeholder="Título"
                            value={serieForm.title}
                            onChangeText={value => setField('title', value)}
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style={styles.input} 
                            placeholder="URL da imagem"
                            value={serieForm.img}
                            onChangeText={value => setField('img', value)}
                        />
                    </FormRow>
        
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={itemValue => setField('gender', itemValue)}>
                            
                            <Picker.Item label="Policial" value="Policial" />
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Terror" value="Terror" />
                            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                            <Picker.Item label="Ação" value="Ação" />
                            <Picker.Item label="Drama" value="Drama" />
                    </Picker>
                </FormRow>
        
                <FormRow>
                    <View style={styles.sameRow}>
                        <Text>Nota:</Text>
                        <Text>{serieForm.rate}</Text>
                    </View>
                    <Slider 
                        onValueChange={value => setField('rate', value)}
                        value={serieForm.rate}
                        minimumValue={0}
                        maximumValue={100}
                        step={5} />
                </FormRow>
        
                <FormRow>
                        <TextInput
                            style={styles.input} 
                            placeholder="Descrição"
                            value={serieForm.description}
                            onChangeText={value => setField('description', value)}
                            numberOfLines={4}
                            multiline={true}
                        />
                    </FormRow>
                    {
                        this.state.isLoading
                            ? <ActivityIndicator />
                            : <View style={styles.viewButton}>
                                    <Button
                                        style={styles.button}
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
                             </View>
                    }

                    { 
                        serieForm.id
                             ? null
                             : <View style={styles.viewButton}>
                                    <Button
                                        style={styles.buttonClean}
                                        title="Limpar Formulário"
                                        color='#8B0000' 
                                        onPress={() => {resetForm(serieForm)}} 
                                    />  
                               </View>
                    }    
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    
}


const styles = StyleSheet.create({
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
});

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