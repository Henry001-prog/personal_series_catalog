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

import { ListSeries } from "../../components/ListSeries";
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

export default function SeriesPage({ navigation }) {
  return (
    <Container>
      <Suspense
        fallback={
          <ViewLoading>
            <Loading size="large" color="light-blue" />
          </ViewLoading>
        }
      >
        <ListSeries />
      </Suspense>
    </Container>
  );
}
