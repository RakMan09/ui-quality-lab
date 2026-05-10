import type { AlertProps } from '../components/Alert';
import type { ButtonProps } from '../components/Button';
import type { CardProps } from '../components/Card';
import type { DataTableProps } from '../components/DataTable';
import type { FormFieldProps } from '../components/FormField';
import type { ModalProps } from '../components/Modal';
import type { ProductTileProps } from '../components/ProductTile';
import type { TabsProps } from '../components/Tabs';
import type { ThemeName } from './themes';
import type { ViewportName } from './viewports';

export type CoverageTag = 'visual' | 'a11y' | 'smoke' | 'e2e' | 'form' | 'async';

export interface UiStateSpec<TArgs> {
  id: string;
  component: UiComponentName;
  title: string;
  name: string;
  args: TArgs;
  theme: ThemeName;
  viewport: ViewportName;
  tags: CoverageTag[];
  description: string;
  waitFor?: 'stable' | 'loaded' | 'animation-end';
}

export type UiComponentName =
  | 'Button'
  | 'Card'
  | 'Modal'
  | 'FormField'
  | 'Alert'
  | 'Tabs'
  | 'DataTable'
  | 'ProductTile';

export interface UiStateArgMap {
  Button: ButtonProps;
  Card: CardProps;
  Modal: ModalProps;
  FormField: FormFieldProps;
  Alert: AlertProps;
  Tabs: TabsProps;
  DataTable: DataTableProps;
  ProductTile: ProductTileProps;
}

export type AnyUiState = {
  [K in UiComponentName]: UiStateSpec<UiStateArgMap[K]> & { component: K };
}[UiComponentName];

const tableColumns: DataTableProps['columns'] = [
  { key: 'check', label: 'Check' },
  { key: 'status', label: 'Status' },
  { key: 'duration', label: 'Duration', align: 'right' },
];

const tableRows: DataTableProps['rows'] = [
  { id: 'r1', values: { check: 'Playwright smoke', status: 'Passed', duration: '47s' } },
  { id: 'r2', values: { check: 'A11y scan', status: 'Passed', duration: '18s' } },
  { id: 'r3', values: { check: 'Visual regression', status: 'Passed', duration: '55s' } },
];

const tabsBase: TabsProps['tabs'] = [
  {
    id: 'summary',
    label: 'Summary',
    content: 'Quality checks are stable across desktop and mobile baselines.',
  },
  {
    id: 'history',
    label: 'History',
    content: 'Seven-day trend reports are available for regression investigation.',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    content: 'No unresolved defects are blocking release.',
  },
];

export const allUiStates: AnyUiState[] = [
  {
    id: 'button-primary-default',
    component: 'Button',
    title: 'Button / Primary default',
    name: 'Primary default',
    args: { children: 'Ship release' },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke', 'a11y'],
    description: 'Primary action used in release controls.',
  },
  {
    id: 'button-secondary-default',
    component: 'Button',
    title: 'Button / Secondary default',
    name: 'Secondary default',
    args: { children: 'View details', variant: 'secondary' },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'Secondary action for non-destructive paths.',
  },
  {
    id: 'button-loading',
    component: 'Button',
    title: 'Button / Loading',
    name: 'Loading',
    args: { children: 'Publishing', loading: true },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'async'],
    description: 'Spinner and disabled behavior during asynchronous operations.',
    waitFor: 'stable',
  },
  {
    id: 'button-disabled',
    component: 'Button',
    title: 'Button / Disabled',
    name: 'Disabled',
    args: { children: 'Cannot proceed', disabled: true },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Disabled state when prerequisites are missing.',
  },
  {
    id: 'button-danger',
    component: 'Button',
    title: 'Button / Danger',
    name: 'Danger',
    args: { children: 'Delete baseline', variant: 'danger' },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke'],
    description: 'Destructive action style for irreversible changes.',
  },
  {
    id: 'button-full-width-mobile',
    component: 'Button',
    title: 'Button / Full-width mobile',
    name: 'Full-width mobile',
    args: { children: 'Continue', fullWidth: true },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual', 'a11y', 'e2e'],
    description: 'Primary CTA that spans available mobile width.',
  },
  {
    id: 'button-icon-only',
    component: 'Button',
    title: 'Button / Icon only',
    name: 'Icon only',
    args: { children: 'Favorite baseline', iconOnly: true, icon: '☆', 'aria-label': 'Favorite baseline' },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Icon-only action with explicit accessible name.',
  },
  {
    id: 'card-default',
    component: 'Card',
    title: 'Card / Default',
    name: 'Default',
    args: {
      title: 'Release health',
      subtitle: 'Main branch',
      children: 'All checks completed in under 5 minutes.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke', 'a11y'],
    description: 'Baseline card for summary content.',
  },
  {
    id: 'card-hoverable',
    component: 'Card',
    title: 'Card / Hoverable',
    name: 'Hoverable',
    args: {
      title: 'Regression triage',
      subtitle: 'Interactive panel',
      children: 'Hover reveals elevated affordance for drill-in actions.',
      hoverable: true,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'Hover elevation and transition behavior.',
  },
  {
    id: 'card-loading-skeleton',
    component: 'Card',
    title: 'Card / Loading skeleton',
    name: 'Loading skeleton',
    args: {
      title: 'Snapshot history',
      loading: true,
      subtitle: 'Awaiting API',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'async'],
    description: 'Skeleton placeholder while card payload loads.',
    waitFor: 'stable',
  },
  {
    id: 'card-empty',
    component: 'Card',
    title: 'Card / Empty',
    name: 'Empty',
    args: {
      title: 'Pending incidents',
      empty: true,
      subtitle: 'No unresolved incidents',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'Neutral empty state messaging pattern.',
  },
  {
    id: 'card-dense',
    component: 'Card',
    title: 'Card / Dense',
    name: 'Dense',
    args: {
      title: 'Compact summary',
      dense: true,
      children: 'Condensed spacing for data-dense surfaces.',
    },
    theme: 'dark',
    viewport: 'tablet',
    tags: ['visual'],
    description: 'Compressed spacing for compact grids.',
  },
  {
    id: 'card-error',
    component: 'Card',
    title: 'Card / Error',
    name: 'Error',
    args: {
      title: 'Artifact retrieval failed',
      error: true,
      subtitle: 'Retry required',
      children: 'The previous run artifacts could not be indexed.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Error framing for failed integrations.',
  },
  {
    id: 'card-long-content',
    component: 'Card',
    title: 'Card / Long content',
    name: 'Long content',
    args: {
      title: 'Post-deploy summary',
      subtitle: 'Verbose status',
      children:
        'The lab tracks recurring regressions, aggregate failure rates, and mean triage time to expose UI quality risk trends before release cutoffs.',
      footer: 'Generated 2 minutes ago',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'e2e'],
    description: 'Long body content and footer layout consistency.',
  },
  {
    id: 'modal-closed',
    component: 'Modal',
    title: 'Modal / Closed',
    name: 'Closed',
    args: {
      isOpen: false,
      title: 'Closed state',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['smoke', 'e2e'],
    description: 'No modal should render when closed.',
  },
  {
    id: 'modal-open-default',
    component: 'Modal',
    title: 'Modal / Open default',
    name: 'Open default',
    args: {
      isOpen: true,
      title: 'Confirm publish',
      description: 'Publish this release candidate and freeze snapshots.',
      children: 'This action triggers release automation and quality gate validation.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y', 'e2e', 'smoke'],
    description: 'Base dialog treatment and action layout.',
  },
  {
    id: 'modal-long-content',
    component: 'Modal',
    title: 'Modal / Open with long content',
    name: 'Open with long content',
    args: {
      isOpen: true,
      title: 'Release checklist',
      description: 'Confirm all prerequisite tasks.',
      children:
        'Long content covers rollback strategy, owner approvals, incident contacts, monitoring dashboards, and production validation steps.',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Long-form text wrapping and scroll behavior.',
  },
  {
    id: 'modal-confirmation',
    component: 'Modal',
    title: 'Modal / Confirmation',
    name: 'Confirmation',
    args: {
      isOpen: true,
      tone: 'confirmation',
      title: 'Publish baseline?',
      description: 'This will lock new screenshot baselines.',
      confirmLabel: 'Publish baseline',
      children: 'Only release managers can reverse this action.',
    },
    theme: 'light',
    viewport: 'tablet',
    tags: ['visual'],
    description: 'Positive confirmation tone and action labelling.',
  },
  {
    id: 'modal-destructive-confirmation',
    component: 'Modal',
    title: 'Modal / Destructive confirmation',
    name: 'Destructive confirmation',
    args: {
      isOpen: true,
      tone: 'destructive',
      title: 'Delete baseline set?',
      description: 'This will remove all stored snapshots for the selected run.',
      confirmLabel: 'Delete',
      children: 'Deleting snapshots requires manual regeneration in CI.',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Destructive affordance and tone change.',
  },
  {
    id: 'modal-mobile-layout',
    component: 'Modal',
    title: 'Modal / Mobile layout',
    name: 'Mobile layout',
    args: {
      isOpen: true,
      mobileLayout: true,
      title: 'Quick confirm',
      description: 'Mobile drawer-like layout.',
      children: 'Primary and secondary actions stack vertically.',
    },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual', 'a11y', 'e2e'],
    description: 'Bottom-aligned mobile dialog with stacked actions.',
  },
  {
    id: 'form-default',
    component: 'FormField',
    title: 'FormField / Default',
    name: 'Default',
    args: {
      label: 'Email address',
      name: 'releaseEmail',
      placeholder: 'qa-team@company.com',
      helperText: 'Used for build notifications.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'form', 'a11y', 'smoke'],
    description: 'Default input with helper text.',
  },
  {
    id: 'form-focused',
    component: 'FormField',
    title: 'FormField / Focused',
    name: 'Focused',
    args: {
      label: 'Email address',
      name: 'focusEmail',
      placeholder: 'qa-team@company.com',
      autoFocus: true,
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Keyboard focus styling and ring clarity.',
  },
  {
    id: 'form-invalid',
    component: 'FormField',
    title: 'FormField / Invalid',
    name: 'Invalid',
    args: {
      label: 'Email address',
      name: 'invalidEmail',
      value: 'qa@',
      errorText: 'Enter a valid email address.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y', 'form', 'e2e', 'smoke'],
    description: 'Inline error text and aria-invalid behavior.',
  },
  {
    id: 'form-disabled',
    component: 'FormField',
    title: 'FormField / Disabled',
    name: 'Disabled',
    args: {
      label: 'Read-only token',
      name: 'token',
      value: 'release-9f13',
      disabled: true,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Disabled form control semantics and appearance.',
  },
  {
    id: 'form-helper',
    component: 'FormField',
    title: 'FormField / Helper text',
    name: 'Helper text',
    args: {
      label: 'Branch name',
      name: 'branch',
      placeholder: 'main',
      helperText: 'Only protected branches are eligible.',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'form'],
    description: 'Context hint under text input.',
  },
  {
    id: 'form-success',
    component: 'FormField',
    title: 'FormField / Success',
    name: 'Success',
    args: {
      label: 'Email address',
      name: 'successEmail',
      value: 'qa-team@company.com',
      successText: 'Looks good.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'form'],
    description: 'Success confirmation state after validation.',
  },
  {
    id: 'form-long-label',
    component: 'FormField',
    title: 'FormField / Long label',
    name: 'Long label',
    args: {
      label: 'Primary release owner email used for post-merge quality alerts',
      name: 'ownerEmail',
      placeholder: 'owner@company.com',
    },
    theme: 'dark',
    viewport: 'mobile',
    tags: ['visual', 'a11y'],
    description: 'Long label wrapping behavior on narrow viewports.',
  },
  {
    id: 'form-required',
    component: 'FormField',
    title: 'FormField / Required',
    name: 'Required',
    args: {
      label: 'Build owner',
      name: 'buildOwner',
      required: true,
      placeholder: 'Jane Doe',
    },
    theme: 'light',
    viewport: 'tablet',
    tags: ['visual', 'a11y', 'form'],
    description: 'Required indicator and native required semantics.',
  },
  {
    id: 'alert-info',
    component: 'Alert',
    title: 'Alert / Info',
    name: 'Info',
    args: {
      title: 'Info',
      message: 'Snapshot generation begins after merge.',
      tone: 'info',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke'],
    description: 'Neutral informational alert style.',
  },
  {
    id: 'alert-success',
    component: 'Alert',
    title: 'Alert / Success',
    name: 'Success',
    args: {
      title: 'Success',
      message: 'All quality gates passed.',
      tone: 'success',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Success tone and messaging.',
  },
  {
    id: 'alert-warning',
    component: 'Alert',
    title: 'Alert / Warning',
    name: 'Warning',
    args: {
      title: 'Warning',
      message: 'Firefox checks retried due to an intermittent timeout.',
      tone: 'warning',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Caution tone for non-blocking alerts.',
  },
  {
    id: 'alert-error',
    component: 'Alert',
    title: 'Alert / Error',
    name: 'Error',
    args: {
      title: 'Error',
      message: 'Lighthouse score dropped below threshold.',
      tone: 'error',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y', 'smoke'],
    description: 'Error styling for blocking defects.',
  },
  {
    id: 'alert-dismissible',
    component: 'Alert',
    title: 'Alert / Dismissible',
    name: 'Dismissible',
    args: {
      title: 'Notice',
      message: 'New visual baseline available.',
      dismissible: true,
      tone: 'info',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'e2e', 'smoke'],
    description: 'Dismiss action interaction coverage.',
  },
  {
    id: 'alert-long-message',
    component: 'Alert',
    title: 'Alert / Long message',
    name: 'Long message',
    args: {
      title: 'Summary',
      message:
        'A minor spacing regression was detected in the tablet viewport and requires confirmation before the release readiness gate can mark this build as fully approved.',
      tone: 'info',
    },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual'],
    description: 'Long multiline alert body wrapping behavior.',
  },
  {
    id: 'tabs-default',
    component: 'Tabs',
    title: 'Tabs / Default',
    name: 'Default',
    args: {
      tabs: tabsBase,
      ariaLabel: 'Quality tabs',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y', 'smoke', 'e2e'],
    description: 'Default tablist and panel mapping.',
  },
  {
    id: 'tabs-selected',
    component: 'Tabs',
    title: 'Tabs / Selected tab',
    name: 'Selected tab',
    args: {
      tabs: tabsBase,
      activeTabId: 'history',
      ariaLabel: 'Quality tabs',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'Pre-selected active tab state.',
  },
  {
    id: 'tabs-keyboard-navigable',
    component: 'Tabs',
    title: 'Tabs / Keyboard navigable',
    name: 'Keyboard navigable',
    args: {
      tabs: tabsBase,
      ariaLabel: 'Quality tabs',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['a11y', 'e2e'],
    description: 'Arrow/home/end keyboard navigation behavior.',
  },
  {
    id: 'tabs-overflow-labels',
    component: 'Tabs',
    title: 'Tabs / Overflow labels',
    name: 'Overflow labels',
    args: {
      tabs: [
        ...tabsBase,
        {
          id: 'extended',
          label: 'Long-running visual regression trend overview tab',
          content: 'Overflow label example content.',
        },
      ],
      ariaLabel: 'Quality tabs',
    },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual', 'a11y'],
    description: 'Long tab labels wrapping on narrow layouts.',
  },
  {
    id: 'tabs-disabled-tab',
    component: 'Tabs',
    title: 'Tabs / Disabled tab',
    name: 'Disabled tab',
    args: {
      tabs: [
        ...tabsBase,
        {
          id: 'restricted',
          label: 'Restricted',
          content: 'Restricted content',
          disabled: true,
        },
      ],
      ariaLabel: 'Quality tabs',
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Disabled tab affordance and focus behavior.',
  },
  {
    id: 'data-table-default',
    component: 'DataTable',
    title: 'DataTable / Default',
    name: 'Default',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: tableRows,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke', 'a11y', 'e2e'],
    description: 'Standard quality checks table.',
  },
  {
    id: 'data-table-empty',
    component: 'DataTable',
    title: 'DataTable / Empty',
    name: 'Empty',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: [],
      emptyMessage: 'No quality results yet.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'No-row fallback state.',
  },
  {
    id: 'data-table-loading',
    component: 'DataTable',
    title: 'DataTable / Loading',
    name: 'Loading',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: tableRows,
      loading: true,
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'async'],
    description: 'Loading panel during async fetch.',
  },
  {
    id: 'data-table-sorted',
    component: 'DataTable',
    title: 'DataTable / Sorted',
    name: 'Sorted',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: tableRows,
      sortedBy: 'duration',
      sortDirection: 'asc',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Announced sort order using aria-sort.',
  },
  {
    id: 'data-table-error',
    component: 'DataTable',
    title: 'DataTable / Error',
    name: 'Error',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: tableRows,
      errorMessage: 'Could not load check history. Please retry.',
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke'],
    description: 'Failure state when table data fetch fails.',
  },
  {
    id: 'data-table-many-rows',
    component: 'DataTable',
    title: 'DataTable / Many rows',
    name: 'Many rows',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: Array.from({ length: 12 }, (_entry, index) => {
        const base = tableRows[index % tableRows.length];
        return {
          id: `many-${index + 1}`,
          values: base ? { ...base.values } : { check: '-', status: '-', duration: '-' },
        };
      }),
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'e2e'],
    description: 'Longer table body scrolling and density.',
  },
  {
    id: 'data-table-mobile-stacked',
    component: 'DataTable',
    title: 'DataTable / Mobile stacked',
    name: 'Mobile stacked layout',
    args: {
      caption: 'Quality check summary',
      columns: tableColumns,
      rows: tableRows,
      stackedOnMobile: true,
    },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual', 'a11y', 'e2e'],
    description: 'Mobile card-like row layout for narrow screens.',
  },
  {
    id: 'product-tile-default',
    component: 'ProductTile',
    title: 'ProductTile / Default',
    name: 'Default',
    args: {
      name: 'Quality Dashboard Kit',
      description: 'Ready-to-use dashboard widgets for release quality reporting.',
      price: 49,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'smoke', 'a11y'],
    description: 'Standard commerce tile with primary CTA.',
  },
  {
    id: 'product-tile-discounted',
    component: 'ProductTile',
    title: 'ProductTile / Discounted',
    name: 'Discounted',
    args: {
      name: 'Quality Dashboard Kit',
      description: 'Limited rollout discount.',
      price: 39,
      originalPrice: 49,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual'],
    description: 'Discount strikethrough and pricing hierarchy.',
  },
  {
    id: 'product-tile-out-of-stock',
    component: 'ProductTile',
    title: 'ProductTile / Out of stock',
    name: 'Out of stock',
    args: {
      name: 'QA Artifact Pack',
      description: 'Package currently unavailable.',
      price: 79,
      outOfStock: true,
    },
    theme: 'dark',
    viewport: 'desktop',
    tags: ['visual', 'a11y'],
    description: 'Disabled CTA and availability messaging.',
  },
  {
    id: 'product-tile-loading',
    component: 'ProductTile',
    title: 'ProductTile / Loading',
    name: 'Loading',
    args: {
      name: 'Loading product',
      description: 'Loading description',
      price: 0,
      loading: true,
    },
    theme: 'light',
    viewport: 'desktop',
    tags: ['visual', 'async'],
    description: 'Skeleton content during fetch.',
  },
  {
    id: 'product-tile-long-name',
    component: 'ProductTile',
    title: 'ProductTile / Long product name',
    name: 'Long product name',
    args: {
      name: 'Advanced Cross-Browser Visual Regression Automation Bundle for Enterprise Teams',
      description: 'Extended label stress test for title wrapping.',
      price: 129,
    },
    theme: 'dark',
    viewport: 'tablet',
    tags: ['visual'],
    description: 'Long heading wrapping and spacing checks.',
  },
  {
    id: 'product-tile-compact-mobile',
    component: 'ProductTile',
    title: 'ProductTile / Compact mobile layout',
    name: 'Compact mobile layout',
    args: {
      name: 'Quality Snapshot Lite',
      description: 'Mobile-first card layout.',
      price: 24,
      compact: true,
    },
    theme: 'light',
    viewport: 'mobile',
    tags: ['visual', 'a11y', 'e2e'],
    description: 'Single-column compact layout for mobile feeds.',
  },
];

export const visualStates = allUiStates.filter((state) => state.tags.includes('visual'));
export const a11yStates = allUiStates.filter((state) => state.tags.includes('a11y'));
export const smokeStates = allUiStates.filter((state) => state.tags.includes('smoke'));

export function getUiStateById(id: string): AnyUiState | undefined {
  return allUiStates.find((state) => state.id === id);
}
