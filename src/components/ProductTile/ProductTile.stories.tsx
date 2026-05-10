import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductTile } from './ProductTile';

const meta = {
  title: 'Components/ProductTile',
  component: ProductTile,
  args: {
    name: 'Quality Snapshot Dashboard Kit',
    description: 'Prebuilt dashboard cards and charts for UI quality reporting.',
    price: 49,
  },
} satisfies Meta<typeof ProductTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Discounted: Story = {
  args: {
    price: 39,
    originalPrice: 49,
  },
};

export const OutOfStock: Story = {
  args: {
    outOfStock: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LongProductName: Story = {
  args: {
    name: 'Advanced Cross-Browser Visual Regression Quality Automation Toolkit for Teams',
  },
};

export const CompactMobile: Story = {
  args: {
    compact: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
