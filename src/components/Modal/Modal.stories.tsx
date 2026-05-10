import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    isOpen: true,
    title: 'Confirm release',
    description: 'This action will trigger build, test, and deploy pipelines.',
    children: 'Review release notes and rollback plan before confirmation.',
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OpenDefault: Story = {};

export const OpenWithLongContent: Story = {
  args: {
    children:
      'A long-form release plan may include dependency upgrades, schema migration safeguards, phased traffic shifts, and verification checkpoints for post-deploy monitoring alerts.',
  },
};

export const Confirmation: Story = {
  args: {
    tone: 'confirmation',
    title: 'Publish component baseline?',
    confirmLabel: 'Publish baseline',
  },
};

export const DestructiveConfirmation: Story = {
  args: {
    tone: 'destructive',
    title: 'Delete approved snapshot set?',
    confirmLabel: 'Delete snapshots',
  },
};

export const MobileLayout: Story = {
  args: {
    mobileLayout: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
