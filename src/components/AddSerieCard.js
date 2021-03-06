import React from 'react';
import add from '../resources/imgs/add.png';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

// import { Container } from './styles';

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={[
            styles.container,
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
        <View style={styles.card}>
            <Image 
                source={add}
                style={styles.image}
            />
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
        //borderWidth: 1,
        height: '97%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
        // paddingBottom: 10
        // Solução 2
        // margin: 10,
    },
    image: {
        width: '50%',
        height: '50%',
        
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    },
});

export default AddSerieCard;