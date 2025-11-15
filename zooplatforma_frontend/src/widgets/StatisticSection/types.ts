export type Statistic = {
  count: string;
  text: string;
};

export interface StatisticSectionProps {
  statistics: Statistic[];
}
