import React from 'react';
import { ViewLoading, Loading, Container, ViewList, ViewTop, ViewBottom } from './styles';

import SerieCard from '../../components/SerieCard';

import AddSerieCard from '../../components/AddSerieCard';
import { connect } from 'react-redux';
import { watchSeries } from '../../actions';

const isEven = number => number % 2 === 0;

class SeriesPage extends React.Component {

    componentDidMount() {
        this.props.watchSeries();
    }
    
    render() {
        const { series, navigation } = this.props;
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
            </Container>
        );
    }
}

/*const styles = StyleSheet.create({
    marginTop: {
        marginTop: 5,
    },
    marginBottom: {
        marginBottom: 5,
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
    },
});*/

const mapStateToProps = state => {
    const { series } = state;
    if (series === null) {
        return { series }
    }

    const keys = Object.keys(series);
    const seriesWithKeys = keys.map(id => {
        return { ...series[id], id }
    });
    return { series: seriesWithKeys };
}

export default connect(
    mapStateToProps, 
    { watchSeries }
)(SeriesPage);