import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Save changes',
    variant: 'primary',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary action',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete release',
  },
};

export const FullWidthMobile: Story = {
  args: {
    children: 'Continue',
    fullWidth: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const IconOnly: Story = {
  args: {
    children: 'Favorite item',
    iconOnly: true,
    'aria-label': 'Favorite item',
    icon: '☆',
  },
};
