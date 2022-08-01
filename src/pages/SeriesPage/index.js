import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

import { useSelector, useDispatch } from "react-redux";
import { watchSeries } from "../../store/actions";
import { logout } from "../../store/actions";

const isEven = (number) => number % 2 === 0;

export default function SeriesPage({ navigation }) {
  const series = useSelector((state) => state.series);
  const dispatch = useDispatch();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      dispatch(watchSeries());
    }
    if (series === null) {
      series;
    }
    return () => {
      unmounted = true;
    };
  }, [dispatch]);

  //const { series, navigation } = this.props;
  //console.log(series);

  if (series === null) {
    return (
      <ViewLoading>
        <Loading size="large" color="light-blue" />
      </ViewLoading>
    );
  }

  return (
    <Container>
      <ViewList
        data={[...series, { isLast: true }]}
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
    </Container>
  );
}
