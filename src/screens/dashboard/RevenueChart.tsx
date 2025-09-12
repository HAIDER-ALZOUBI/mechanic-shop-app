import React from 'react';
import { View } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';
import { colors } from '../../theme';

import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme,
} from 'lib/VictoryCompat';

const data = [
  { month: 'Jan', income: 2000, expenses: 3200 },
  { month: 'Feb', income: 9200, expenses: 3800 },
  { month: 'Mar', income: 11800, expenses: 4100 },
  { month: 'Apr', income: 10500, expenses: 3900 },
  { month: 'May', income: 12100, expenses: 4300 },
  { month: 'Jun', income: 12450, expenses: 4230 },
];

export default function RevenueChart() {
  return (
    <SimpleCard title="Income vs Expenses" subtitle="Monthly revenue and parts expenses comparison">
      <View style={{ height: 300 }}>
        <VictoryChart
          theme={VictoryTheme.material}
          padding={{ top: 20, bottom: 50, left: 60, right: 20 }}
          domainPadding={{ x: 25 }}
        >
          <VictoryLegend
            x={80} y={0}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: 'Income', symbol: { fill: colors.primary } },
              { name: 'Expenses', symbol: { fill: '#8892b0' } },
            ]}
            style={{ labels: { fill: colors.textPrimary } }}
          />
          <VictoryAxis
            tickValues={data.map(d => d.month)}
            style={{
              axis: { stroke: colors.border },
              tickLabels: { fill: colors.textSecondary, fontSize: 12 },
              grid: { stroke: 'transparent' },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(v: number) => `$${v}`}            style={{
              axis: { stroke: colors.border },
              tickLabels: { fill: colors.textSecondary, fontSize: 12 },
              grid: { stroke: '#2a3550', strokeDasharray: '4,4' },
            }}
          />
          <VictoryGroup offset={14}>
            <VictoryBar
              data={data.map(d => ({ x: d.month, y: d.income }))}
              style={{ data: { fill: colors.primary, borderRadius: 4 } }}
            />
            <VictoryBar
              data={data.map(d => ({ x: d.month, y: d.expenses }))}
              style={{ data: { fill: '#8892b0', borderRadius: 4 } }}
            />
          </VictoryGroup>
        </VictoryChart>
      </View>
    </SimpleCard>
  );
}
