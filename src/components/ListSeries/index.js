import React, { useEffect, useState, Suspense } from "react";
import { Text } from "react-native";
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

import {
  seriesListAtom,
  watchSeriesJotaiAtom,
  loadableAtom,
  testAtom,
  intervalList,
  watchSeriesJotai,
  listFunc,
  result,
} from "../../storeJotai/event";
import { logout } from "../../store/actions";
import { useAtom, atom, Provider } from "jotai";
import { loadable, waitForAll } from "jotai/utils";

const isEven = (number) => number % 2 === 0;

export const ListSeries = ({ navigation }) => {
  const [test, setTest] = useAtom(watchSeriesJotaiAtom);
  return (
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
  );
};
