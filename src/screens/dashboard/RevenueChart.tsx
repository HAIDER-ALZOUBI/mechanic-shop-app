// RevenueChart.tsx
// -----------------
// Clean grouped bar chart for Dashboard.
// - Shows Income (blue) vs Expenses (orange) per month
// - Hover-only (web): highlights the hovered month with a gray background band
// - Labels appear only on hovered bars
// - No animations, no VictoryTooltip/Skia dependencies
// - Self-contained colors, no external theme needed

import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SimpleCard } from '../../../components/ui/simple-card';

import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
} from 'lib/VictoryCompat';

// ---------------------------
// Palette (hardcoded dark mode colors)
// ---------------------------
const C = {
  surface: '#1c2533',   // card background-ish
  border: '#2b3446',    // border line
  text: '#e5eef7',      // primary text
  text2: '#95a3b8',     // secondary text
  grid: '#2a3550',      // gridlines
  income: '#1f87ff',    // blue bars
  expenses: '#ff7a12',  // orange bars
  band: '#d1d5db',      // light gray hover band
};

// ---------------------------
// Raw data (mocked for now)
// ---------------------------
const RAW = [
  { month: 'Jan', income: 8500,  expenses: 3200 },
  { month: 'Feb', income: 9200,  expenses: 3800 },
  { month: 'Mar', income: 11800, expenses: 4100 },
  { month: 'Apr', income: 10500, expenses: 3900 },
  { month: 'May', income: 12100, expenses: 4300 },
  { month: 'Jun', income: 12450, expenses: 4230 },
];

// ---------------------------
// Utility helpers
// ---------------------------
// Unique key for each bar (dataset + month)
const keyFor = (dataset: 'income' | 'expenses', x: string) => `${dataset}:${x}`;

// Round y-axis max to nearest 1000 for cleaner grid
const roundUpTo = (v: number, step = 1000) => Math.ceil(v / step) * step;

// ---------------------------
// Main component
// ---------------------------
export default function RevenueChart() {
  // Track which bar is currently hovered (web only)
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // Precompute arrays for months and yMax
  const months = RAW.map(d => d.month);
  const yMax = roundUpTo(Math.max(...RAW.map(d => Math.max(d.income, d.expenses))));

  // Income/expense datasets for Victory
  const incomeData = useMemo(() => RAW.map(d => ({ x: d.month, y: d.income })), []);
  const expenseData = useMemo(() => RAW.map(d => ({ x: d.month, y: d.expenses })), []);

  // Background gray "band" behind hovered month
  const bandData = useMemo(
    () =>
      RAW.map(d => ({
        x: d.month,
        y: hoverKey?.endsWith(`:${d.month}`) || hoverKey?.split(':')[1] === d.month ? yMax : 0,
      })),
    [hoverKey, yMax]
  );

  // ---------------------------
  // Style helpers
  // ---------------------------
  const barStyle = (dataset: 'income' | 'expenses') => ({
    data: {
      fill: dataset === 'income' ? C.income : C.expenses,
      borderRadius: 3,
      stroke: (d: any) =>
        hoverKey === keyFor(dataset, d.datum.x) ? '#ffffff' : 'transparent',
      strokeWidth: (d: any) => (hoverKey === keyFor(dataset, d.datum.x) ? 1.5 : 0),
    },
    labels: { fill: C.text, fontSize: 12, fontWeight: '700' },
  });

  // Only show label on hovered bar
  const labelsFor = (dataset: 'income' | 'expenses') => ({ datum }: any) =>
    hoverKey === keyFor(dataset, datum.x) ? `$${Number(datum.y).toLocaleString()}` : '';

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <SimpleCard
      title="Income vs Expenses"
      subtitle="Monthly revenue and parts expenses comparison"
    >
      <View style={{ height: 500 }}>
        <VictoryChart
          padding={{ top: 16, bottom: 44, left: 64, right: 18 }}
          domain={{ y: [0, yMax] }}
          domainPadding={{ x: 24 }}
        >
          {/* Legend */}
          <VictoryLegend
            x={75}
            y={-25}
            orientation="horizontal"
            gutter={18}
            data={[
              { name: 'Income', symbol: { fill: C.income } },
              { name: 'Expenses', symbol: { fill: C.expenses } },
            ]}
            style={{ labels: { fill: C.text } }}
          />

          {/* X axis (months) */}
          <VictoryAxis
            tickValues={months}
            style={{
              axis: { stroke: C.border },
              tickLabels: { fill: C.text2, fontSize: 12 },
              grid: { stroke: 'transparent' },
            }}
          />

          {/* Y axis (money scale) */}
          <VictoryAxis
            dependentAxis
            tickFormat={(v: any) => `$${v}`}
            style={{
              axis: { stroke: C.border },
              tickLabels: { fill: C.text2, fontSize: 12 },
              grid: { stroke: C.grid, strokeDasharray: '4,4' },
            }}
          />

          {/* Hover background band */}
          <VictoryGroup offset={16}>
            <VictoryBar
              data={bandData}
              barWidth={36}
              style={{ data: { fill: C.band, opacity: 0.22 } }}
            />
          </VictoryGroup>

          {/* Income + Expenses bars */}
          <VictoryGroup offset={16}>
            {/* Income bars */}
            <VictoryBar
              data={incomeData}
              style={barStyle('income')}
              labels={labelsFor('income')}
              labelComponent={
                <VictoryLabel
                  dy={-16}
                  style={{ fontWeight: '700', fontSize: 12, fill: C.text }}
                />
              }
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: (_evt: any, props: { datum: { x: string } }) => {
                      setHoverKey(keyFor('income', props.datum.x));
                      return [];
                    },
                    onMouseOut: () => {
                      setHoverKey(null);
                      return [];
                    },
                  },
                },
              ]}
            />

            {/* Expenses bars */}
            <VictoryBar
              data={expenseData}
              style={barStyle('expenses')}
              labels={labelsFor('expenses')}
              labelComponent={
                <VictoryLabel
                  dy={-16}
                  style={{ fontWeight: '700', fontSize: 12, fill: C.text }}
                />
              }
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: (_evt: any, props: { datum: { x: string } }) => {
                      setHoverKey(keyFor('expenses', props.datum.x));
                      return [];
                    },
                    onMouseOut: () => {
                      setHoverKey(null);
                      return [];
                    },
                  },
                },
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </View>
    </SimpleCard>
  );
}
