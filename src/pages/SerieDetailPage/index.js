import React from 'react';

import { ScrollView, Image, ViewButton, Button } from './styles';

import { useDispatch } from 'react-redux';
import { deleteSerie } from '../../actions';

import Line from '../../components/Line';
import LongText from '../../components/LongText';

export default function SerieDetailPage({ navigation }) {

    const dispatch = useDispatch();
    
    const { serie } = navigation.state.params;
    return(
        <ScrollView contentContainerStyle={{ backgroundColor: '#595959' }}>
            {   
                serie.img64 
                    ? <Image
                        source={{
                        uri: `data:image/jpeg;base64,${serie.img64}`
                        }} 
                      />
                    : null
            }
            <Line label="Título" content={serie.title} />
            <Line label="Gênero" content={serie.gender} />
            <Line label="Nota" content={serie.rate} />
            <LongText label="Descrição" content={serie.description} />
            <ViewButton>
                <Button 
                    title="Editar" 
                    onPress={() => {
                        navigation.replace('SerieForm', { serieToEdit: serie })
                    }} 
                />
            </ViewButton>
            <ViewButton>
                <Button 
                    title="Deletar" 
                    color="#FF0004"
                    onPress={async () => {
                        dispatch(deleteSerie(serie, navigation));
                    }} 
                />
            </ViewButton>
        </ScrollView>
    )  
};