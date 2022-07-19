import React, { useEffect, useState } from "react";
import { ViewLoading, Loading, ViewList, ViewTop, ViewBottom } from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { Text } from "react-native";

import SerieCard from "../../components/SerieCard";

import AddSerieCard from "../../components/AddSerieCard";

import Header from "../../components/Header";

import {
  watchSeriesJotaiAtom,
  watchSeriesJotai,
  seriesReducerAtom,
  isLoading,
} from "../../storeJotai/event";
import { logout } from "../../store/actions";
import { useAtom, atom } from "jotai";

const isEven = (number) => number % 2 === 0;

export const ListSeries = ({ navigation }) => {
  const [series, setSeries] = useAtom(watchSeriesJotai);
  const [loading, setLoading] = useAtom(isLoading);
  // const [listSeries, dispatch] = useAtom(seriesReducerAtom);
  // const [series, setSeries] = useState([]);
  console.warn("Listsa: ", series);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function results() {
      setLoading(true);
      const response = await watchSeriesJotaiAtom();
      setSeries(response);
      setLoading(false);
      // dispatch({ type: "Set_Series", series: response });
    }
    results();
    if (isFocused) results();

    // if (isFocused) results();
  }, [isFocused, setLoading, setSeries]);

  return (
    <>
      {!series || loading ? (
        <ViewLoading>
          <Loading size="large" color="light-blue" />
        </ViewLoading>
      ) : (
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
      )}
    </>
  );
};
