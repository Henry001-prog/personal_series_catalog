import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
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
  watchSeriesJotaiAtom,
  watchSeriesJotai,
} from "../../storeJotai/seriesAtom";
import { isLoading } from "../../storeJotai/serieFormAtom";
import { useAtom } from "jotai";

import { StackNavigationProp } from "@react-navigation/stack";
import { SeriesType, IAction, Item } from "../../interfaces/seriesType";
import { SerieFormScreenNavigationProp, SerieDetailScreenNavigationProp } from "../../types/navigation";

const isEven = (number: number) => number % 2 === 0;

export default function SeriesPage(navigation: SerieFormScreenNavigationProp | SerieDetailScreenNavigationProp) {
  const [series, setSeries] = useAtom(watchSeriesJotai);
  const [loading, setLoading] = useAtom(isLoading);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    async function results() {
      setLoading(true);
      const response: SeriesType[] | undefined = await watchSeriesJotaiAtom();
      setSeries(response);
      setLoading(false);
    }
    results();
    if (isFocused) results();
  }, [isFocused, setLoading, setSeries]);

  return (
    <Container>
      {!series || loading ? (
        <ViewLoading>
          <Loading size="large" color="light-blue" />
        </ViewLoading>
      ) : (
        <ViewList
          data={[...series, { isLast: true }]}
          renderItem={({ item, index }: Item) =>
            item.isLast ? (
              <AddSerieCard
                isFirstColumn={isEven(index)}
              />
            ) : (
              <SerieCard
                serie={item}
                isFirstColumn={isEven(index)}
              />
            )
          }
          keyExtractor={(item, index: number) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={(props) => <ViewTop />}
          ListFooterComponent={(props) => <ViewBottom />}
        />
      )}
    </Container>
  );
}
