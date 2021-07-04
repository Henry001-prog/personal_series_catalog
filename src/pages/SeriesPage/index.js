import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ViewLoading, Loading, Container, ViewList, ViewTop, ViewBottom } from './styles';

import SerieCard from '../../components/SerieCard';

import AddSerieCard from '../../components/AddSerieCard';

import { useSelector, useDispatch } from 'react-redux';
import { watchSeries } from '../../actions';
import { logout } from '../../actions';


const isEven = number => number % 2 === 0;


export default function SeriesPage({ navigation }) {

    const series = useSelector((state) => state.series);
    const dispatch = useDispatch();

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            dispatch(watchSeries());
        }
        if (series === null) {
            return { series }
        }
        return () => { unmounted = true };
    }, [dispatch]);

    //const { series, navigation } = this.props;
    console.log(series);

    if (series === null) {
        return (
            <ViewLoading>
                <Loading size="large" color='light-blue'/>
            </ViewLoading>
        );
    }

    return (
        <Container>
            <ViewList
                data={[...series, { isLast: true }]}
                renderItem={({ item, index }) => (
                    item.isLast
                        ? <AddSerieCard
                            isFirstColumn={isEven(index)}
                            onNavigate={() => navigation.navigate('SerieForm')} />
                        : <SerieCard 
                            serie={item}
                            isFirstColumn={isEven(index)}
                            onNavigate={() => navigation.navigate('SerieDetail', { serie: item })}
                            />
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={props => (<ViewTop/>)}
                ListFooterComponent={props => (<ViewBottom/>)}
            />
            <View style={{paddingRight: 10, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 }}>
                <TouchableOpacity
                    style={{ 
                        backgroundColor: '#87CEFA',
                        borderRadius: 25,
                        paddingTop: 5,
                        height: 40, 
                        width: 85,
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
        </Container>
    );
}