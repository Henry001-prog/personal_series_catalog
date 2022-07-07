import React, { useEffect, useState, Suspense } from "react";
import {
  ViewLoading,
  Loading,
  Container,
  ViewList,
  ViewTop,
  ViewBottom,
} from "./styles";

import SerieCard from "../../components/SerieCard";

import AddSerieCard from "../../components/AddSerieCard";

import { seriesListAtom, watchSeriesJotaiAtom, testAtom } from "../../storeJotai/event";
import { logout } from "../../store/actions";
import { useAtom } from "jotai";

const isEven = (number) => number % 2 === 0;

export default function SeriesPage({ navigation }) {
    const [seriesList, setSeriesList] = useAtom(seriesListAtom);
    const [test, setTest] = useAtom(seriesListAtom);
    console.warn('Minhas séries: ', seriesList)


  useEffect(() => {
    // setWatchSeriesJotai(watchSeriesJotai)
    // console.warn('seriesPage: ', watchSeriesJotai)
    let unmounted = false;
    
        setTest(seriesList);
        console.warn('Minhas séries2: ', test)
    
    if (test === undefined || null) {
        test
    }
    
  }, [test, setTest, watchSeriesJotaiAtom]);

//   const { series, navigation } = this.props;
//   console.log(series);

  // if (watchSeriesJotai === null) {
  //     return (
  //         <ViewLoading>
  //             <Loading size="large" color='light-blue'/>
  //         </ViewLoading>
  //     );
  // }

  return (
    
      <Container>
        {test === undefined ? (
            <ViewLoading>
              <Loading size="large" color="light-blue" />
            </ViewLoading>
        ) : (
            <ViewList
              data={[...test, { isLast: true }]}
              renderItem={({ item, index }) =>
                item.isLast ? (
                  <AddSerieCard
                    isFirstColumn={isEven(index)}
                    onNavigate={() => navigation.navigate("SerieForm")}
                  />
                ) : (
                    <SerieCard
                      serie={item}
                      isFirstColumn={isEven(index)}
                      onNavigate={() =>
                        navigation.navigate("SerieDetail", { serie: item })
                      }
                    />
                )
              }
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={(props) => <ViewTop />}
              ListFooterComponent={(props) => <ViewBottom />}
            />
        )}
      </Container>
  );
}
