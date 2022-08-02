export interface SeriesType {
  id: string | null;
  title: string;
  gender: string;
  rate: number;
  img64: string;
  description: string;
  isLast: boolean
}

export interface Item {
  item: SeriesType
  index: number
}

export interface IAction {
  type?: string;
  serieToEdit?: string;
  field?: string;
  value?: string | number | number[];
}
