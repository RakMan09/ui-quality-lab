import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type TabItem } from './Tabs';

const baseTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'Build, visual, accessibility, and performance checks are green.',
  },
  {
    id: 'regressions',
    label: 'Regressions',
    content: 'No open regression incidents in the last 7 days.',
  },
  {
    id: 'history',
    label: 'History',
    content: '26 historical runs stored with screenshot artifacts.',
  },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    tabs: baseTabs,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectedTab: Story = {
  args: {
    activeTabId: 'regressions',
  },
};

export const KeyboardNavigable: Story = {
  args: {
    tabs: baseTabs,
  },
};

export const OverflowLabels: Story = {
  args: {
    tabs: [
      ...baseTabs,
      {
        id: 'extended-report',
        label: 'Long-running visual regression comparison summary',
        content: 'Large label test to verify overflow resilience.',
      },
    ],
  },
};

export const DisabledTab: Story = {
  args: {
    tabs: [
      ...baseTabs,
      {
        id: 'secure',
        label: 'Restricted',
        content: 'Restricted content',
        disabled: true,
      },
    ],
  },
};
