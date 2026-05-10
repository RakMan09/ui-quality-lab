import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/styles/reset.css';
import '../src/styles/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    viewport: { value: 'desktop', isRotated: false },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', context.globals.theme ?? 'light');
      }
      return Story();
    },
  ],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      test: 'todo',
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '900px',
          },
          type: 'desktop',
        },
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Light Canvas', value: '#f5f7fb' },
        dark: { name: 'Dark Canvas', value: '#121a2b' },
      },
    },
  },
};

export default preview;
