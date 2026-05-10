import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type DataColumn, type DataRow } from './DataTable';

const columns: DataColumn[] = [
  { key: 'check', label: 'Check' },
  { key: 'status', label: 'Status' },
  { key: 'duration', label: 'Duration', align: 'right' },
];

const rows: DataRow[] = [
  { id: '1', values: { check: 'Playwright smoke', status: 'Passed', duration: '45s' } },
  { id: '2', values: { check: 'A11y scan', status: 'Passed', duration: '12s' } },
  { id: '3', values: { check: 'Lighthouse CI', status: 'Passed', duration: '31s' } },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    caption: 'Latest quality run summary',
    columns,
    rows,
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    rows: [],
    emptyMessage: 'No checks recorded yet.',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Sorted: Story = {
  args: {
    sortedBy: 'duration',
    sortDirection: 'asc',
  },
};

export const Error: Story = {
  args: {
    errorMessage: 'Could not load check history.',
  },
};

export const ManyRows: Story = {
  args: {
    rows: Array.from({ length: 12 }, (_entry, index) => ({
      id: `many-${index + 1}`,
      values: { ...rows[index % rows.length]!.values },
    })),
  },
};

export const MobileStacked: Story = {
  args: {
    stackedOnMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
