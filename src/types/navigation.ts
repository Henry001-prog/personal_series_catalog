import { SeriesType } from "../interfaces/seriesType";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  SerieDetail?: { serie: SeriesType };
  SerieForm?: { serieToEdit: SeriesType };
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;

export type SerieFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SerieForm"
>;

export type SerieDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SerieDetail"
>;
