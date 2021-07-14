/// <reference types="svelte" />
/// <reference types="vite/client" />

type FirebaseTime = {
  seconds: number;
  nanoseconds: number;
};

interface Progress {
  title: string;
  percentage: number;
}

interface ProgressData {
  checkedOn: FirebaseTime;
  updatedOn: FirebaseTime;
  data: Progress[];
}

interface ChartData {
  label: string;
  data: {
    x: Date;
    y: number;
  }[];
  borderColor: string;
  lineTension: number;
}
