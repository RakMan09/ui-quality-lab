import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Deployment Health',
    subtitle: 'Nightly release branch',
    children: 'All required checks completed in under 5 minutes.',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
    children: undefined,
  },
};

export const Dense: Story = {
  args: {
    dense: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    subtitle: 'Webhook sync failed',
    children: 'Re-run integration checks to regenerate release metadata.',
  },
};

export const LongContent: Story = {
  args: {
    children:
      'A compact rollout summary is generated every 15 minutes and includes visual diff trends, flaky retries, and performance regressions by route and browser.',
  },
};
