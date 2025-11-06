import React, { lazy } from 'react';

// Create lazy-wrapped Recharts components. Each export is a lazy React component
// that renders the corresponding recharts named export. This reduces initial bundle size
// because `recharts` is only loaded when these components mount.

export const ResponsiveContainer = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.ResponsiveContainer as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const LineChart = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.LineChart as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const Line = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.Line as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const CartesianGrid = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.CartesianGrid as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const XAxis = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.XAxis as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const YAxis = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.YAxis as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const Tooltip = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.Tooltip as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const BarChart = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.BarChart as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const Bar = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.Bar as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const AreaChart = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.AreaChart as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const Area = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.Area as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);

export const Cell = lazy(() =>
  import('recharts').then((m) => ({
    default: (props: Record<string, unknown>) =>
      React.createElement(m.Cell as unknown as React.ComponentType<Record<string, unknown>>, props),
  }))
);
