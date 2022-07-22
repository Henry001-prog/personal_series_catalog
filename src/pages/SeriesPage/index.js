import React, { useEffect } from "react";
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

const isEven = (number) => number % 2 === 0;

export default function SeriesPage({ navigation }) {
  const [series, setSeries] = useAtom(watchSeriesJotai);
  const [loading, setLoading] = useAtom(isLoading);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    async function results() {
      setLoading(true);
      const response = await watchSeriesJotaiAtom();
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
