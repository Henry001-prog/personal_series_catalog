import React, { useEffect, useMemo, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ViewLoading,
  Loading,
  Container,
  ViewList,
  ViewTop,
  ViewBottom,
  ViewButton,
  Button,
  ViewButtonNew,
  Text,
} from "./styles";

import { Svg, Path } from "react-native-svg";
import { line, curveBasis } from "d3-shape";
import { FontAwesome5 } from "@expo/vector-icons";

import { Dimensions, FlatList, ListRenderItemInfo } from "react-native";

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
import {
  SerieFormScreenNavigationProp,
  SerieDetailScreenNavigationProp,
} from "../../types/navigation";

const { width, height } = Dimensions.get('window');

const isEven = (number: number) => number % 2 === 0;

export default function SeriesPage(
  navigation: SerieFormScreenNavigationProp | SerieDetailScreenNavigationProp
) {
  const [series, setSeries] = useAtom(watchSeriesJotai);
  const [loading, setLoading] = useAtom(isLoading);
  const isFocused = useIsFocused();
  const { navigate } = useNavigation<SerieFormScreenNavigationProp>();

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

  const TAB_HEIGHT = 60;

  const { width } = Dimensions.get("window");

  const lineGenerator = line();

  const rect = lineGenerator([
    [0, 0],
    [width / 2, 0],
    [width, 0],
    [width, TAB_HEIGHT],
    [0, TAB_HEIGHT],
    [0, 0],
  ]);

  const center = lineGenerator.curve(curveBasis)([
    [(width / 5.8) * 2.3, 0],
    [(width / 5.3) * 2 + 20, TAB_HEIGHT * 0.6],
    [(width / 4.8) * 3 - 20, TAB_HEIGHT * 0.6],
    [(width / 4.9) * 3, 0],
  ]);

  const d = `${center} ${rect}`;

  const state = {
    pathX: "357",
    pathY: "675",
    pathA: "689",
    pathB: "706",
  };

  return (
    <Container>
      {(!series && series === {}) || loading ? (
        <ViewLoading>
          <Loading size="large" color="light-blue" />
        </ViewLoading>
      ) : (
        <ViewList
          data={series}
          renderItem={({ item, index }: Item) => (
            <SerieCard serie={item} isFirstColumn={isEven(index)} />
          )}
          keyExtractor={(item, index: number) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <ViewTop />}
          ListFooterComponent={() => <ViewBottom />}
        />
      )}
        <Svg
          style={{ top: width > 400 ? 84 : 86 }}
          x="0px"
          y="0px"
          width="100%"
          height="14.6%"
          viewBox="0 0 1092 260"
        >
          <Path
            fill="#3c3951"
            d={`M30,60h${state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${state.pathY}.7,74.5,${state.pathA}.5,60,${state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
          />
        </Svg>
        <Button onPress={() => navigate("SerieForm")}>
          <FontAwesome5 name="plus" size={45} color="white" />
        </Button>
    </Container>
  );
}
