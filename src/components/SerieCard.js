import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

// import { Container } from './styles';

const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
        <View style={styles.card}>
            <Image 
                source={{
                    uri: `data:image/jpeg;base64,${serie.img64}`
                }}
                aspectRatio={1}
                resizeMode="stretch"
            />
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{serie.title}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        // Solução 2
        // flex: .5,

        // Solução 1
        width: '50%',
        padding: 5,
        height: Dimensions.get('window').width / 2,

        //borderWidth: 1,
        //borderColor: 'red',
    },
    card: {
        //flex: 1,
        borderWidth: 1,

        // Solução 2
        // margin: 10,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,

        position: 'absolute',
        bottom: 0,
        opacity: .8,

        width: '100%',

        paddingTop: 10,
        paddingBottom: 10,

        paddingLeft: 3,
        paddingRight: 3,

        alignItems: 'center',
    },
    cardTitle:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    },
});

export default SerieCard;