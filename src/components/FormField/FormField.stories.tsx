import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  args: {
    label: 'Email address',
    name: 'email',
    placeholder: 'team@company.com',
    helperText: 'Used for release notifications.',
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  args: {
    autoFocus: true,
  },
};

export const Invalid: Story = {
  args: {
    value: 'invalid-email',
    errorText: 'Enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'qa-team@company.com',
  },
};

export const Success: Story = {
  args: {
    value: 'qa-team@company.com',
    successText: 'Saved successfully.',
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Primary release owner email used for post-merge regression alerts',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
