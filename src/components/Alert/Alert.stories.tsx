import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    title: 'Release note',
    message: 'Snapshot baseline updated for ProductTile and DataTable components.',
    tone: 'info',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'All checks passed',
    message: 'The release branch is ready for production promotion.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Intermittent flake detected',
    message: 'Firefox smoke tests retried once before passing.',
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Accessibility issue found',
    message: 'Low contrast detected in one alert variation.',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'The weekly quality baseline detected a 3% shift in screenshot diff for tablet view due to spacing updates in the new navigation card. Review before promoting.',
  },
};
