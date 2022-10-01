export interface BarChartOptionsData {
    series: Array<Series> | Array<number>;
    xaxis?: Xaxis;
}

export interface Series {
    name: string;
    data: Array<number>;
}

export interface Xaxis {
    categories: Array<string> | undefined;
}
