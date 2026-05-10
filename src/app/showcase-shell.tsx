import { useEffect, useMemo, useState } from 'react';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { FormField } from '../components/FormField';
import { Modal } from '../components/Modal';
import { ProductTile } from '../components/ProductTile';
import { Tabs } from '../components/Tabs';
import { allUiStates, getUiStateById } from '../lab/state-catalog';
import { applyTheme, type ThemeName } from '../lab/themes';
import { testIds } from '../lab/test-ids';
import { viewports } from '../lab/viewports';
import { readRoute } from './routes';
import styles from './App.module.css';

const releaseRows = [
  { id: '1', values: { check: 'Playwright smoke', status: 'Passed', duration: '44s' } },
  { id: '2', values: { check: 'A11y checks', status: 'Passed', duration: '15s' } },
  { id: '3', values: { check: 'Lighthouse CI', status: 'Passed', duration: '36s' } },
];

const releaseColumns = [
  { key: 'check', label: 'Check' },
  { key: 'status', label: 'Status' },
  { key: 'duration', label: 'Duration', align: 'right' as const },
];

function renderStateComponent(state: ReturnType<typeof getUiStateById>) {
  if (!state) {
    return <Alert tone="error" title="State not found" message="Invalid state ID in URL." />;
  }

  switch (state.component) {
    case 'Button':
      return <Button {...state.args} />;
    case 'Card':
      return <Card {...state.args} />;
    case 'Modal':
      return <Modal {...state.args} />;
    case 'FormField':
      return <FormField {...state.args} />;
    case 'Alert':
      return <Alert {...state.args} />;
    case 'Tabs':
      return <Tabs {...state.args} />;
    case 'DataTable':
      return <DataTable {...state.args} />;
    case 'ProductTile':
      return <ProductTile {...state.args} />;
    default:
      return null;
  }
}

export function ShowcaseShell() {
  const route = readRoute(window.location.search);
  const previewState = route.mode === 'state' ? getUiStateById(route.stateId) : undefined;
  const themeFromRoute: ThemeName = previewState?.theme ?? route.theme;
  const [theme, setTheme] = useState<ThemeName>(themeFromRoute);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const statesByComponent = useMemo(() => {
    const counts = new Map<string, number>();
    for (const state of allUiStates) {
      counts.set(state.component, (counts.get(state.component) ?? 0) + 1);
    }

    return counts;
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [tabId, setTabId] = useState('overview');
  const [tableMode, setTableMode] = useState<'default' | 'empty' | 'loading'>('default');

  const modalDemo = (
    <>
      <Button data-testid={testIds.modalTrigger} onClick={() => setModalOpen(true)}>
        Open review modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        title="Release approval"
        description="Confirm checks before publishing artifacts."
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
        confirmLabel="Approve release"
        cancelLabel="Back"
      >
        <p data-testid={testIds.demoModal}>All required checks look good for this candidate.</p>
      </Modal>
    </>
  );

  if (route.mode === 'state') {
    const viewport = viewports[route.viewport];

    return (
      <main className={styles.stateSurface} data-testid={testIds.visualSurface}>
        <header className={styles.stateSurfaceHeader}>
          <div>
            <h1 data-testid={testIds.appTitle}>UI Quality Lab</h1>
            <p className={styles.metaLine}>{previewState?.title ?? 'Unknown state'}</p>
            <p className={styles.metaLine}>{previewState?.description ?? 'No description available.'}</p>
          </div>
          <p className={styles.metaLine}>
            theme: {previewState?.theme ?? theme} · viewport: {route.viewport}
          </p>
        </header>
        <div
          className={styles.previewFrame}
          style={{
            maxWidth: `${viewport.width}px`,
            minHeight: `${Math.min(viewport.height * 0.45, 480)}px`,
          }}
        >
          {renderStateComponent(previewState)}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 data-testid={testIds.appTitle}>UI Quality Lab</h1>
          <p>Production-style component quality automation with visual, accessibility, and performance checks.</p>
        </div>
        <div className={styles.themeSwitch}>
          <span>Theme</span>
          <Button
            variant="secondary"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? 'Light' : 'Dark'}
          </Button>
        </div>
      </header>

      <section className={styles.summaryGrid} aria-label="Coverage summary">
        <article className={styles.summaryCard}>
          <h3>UI States</h3>
          <p>{allUiStates.length}</p>
        </article>
        <article className={styles.summaryCard}>
          <h3>Visual</h3>
          <p>{allUiStates.filter((state) => state.tags.includes('visual')).length}</p>
        </article>
        <article className={styles.summaryCard}>
          <h3>A11y</h3>
          <p>{allUiStates.filter((state) => state.tags.includes('a11y')).length}</p>
        </article>
        <article className={styles.summaryCard}>
          <h3>Smoke/E2E</h3>
          <p>{allUiStates.filter((state) => state.tags.includes('smoke') || state.tags.includes('e2e')).length}</p>
        </article>
      </section>

      <section className={styles.section}>
        <h2>Component State Grid</h2>
        <div className={styles.componentGrid} data-testid={testIds.componentGrid}>
          {[...statesByComponent.entries()].map(([component, count]) => {
            const exampleState = allUiStates.find((state) => state.component === component);
            return (
              <article key={component} className={styles.componentCard}>
                <h3>{component}</h3>
                <p>{count} catalogued states</p>
                {exampleState ? (
                  <a href={`/?state=${exampleState.id}&theme=${exampleState.theme}&viewport=${exampleState.viewport}`}>
                    Open sample state
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Release Readiness</h2>
        <div className={styles.readinessPanel} data-testid={testIds.releasePanel}>
          <div className={styles.readinessRow}>
            <strong>Visual checks</strong>
            <span className={styles.readinessPill}>Passed</span>
          </div>
          <div className={styles.readinessRow}>
            <strong>Accessibility checks</strong>
            <span className={styles.readinessPill}>Passed</span>
          </div>
          <div className={styles.readinessRow}>
            <strong>E2E checks</strong>
            <span className={styles.readinessPill}>Passed</span>
          </div>
          <div className={styles.readinessRow}>
            <strong>Performance checks</strong>
            <span className={styles.readinessPill}>Passed</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Interactive Demo Surface</h2>
        <div className={styles.demoGrid}>
          <article className={styles.demoPanel}>
            <h3>Modal + Alert</h3>
            {modalDemo}
            {alertVisible ? (
              <Alert
                dismissible
                tone="info"
                title="Snapshot update"
                message="New visual baseline is available for review."
                onDismiss={() => setAlertVisible(false)}
              />
            ) : (
              <Alert tone="success" title="Dismissed" message="Alert has been dismissed." />
            )}
          </article>

          <article className={styles.demoPanel}>
            <h3>Form + Tabs</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.includes('@') || email.length < 5) {
                  setFormMessage('Enter a valid email before submitting.');
                  return;
                }
                setFormMessage('Email saved successfully.');
              }}
            >
              <FormField
                label="Notification email"
                name="notificationEmail"
                value={email}
                placeholder="qa-team@company.com"
                onChange={(event) => setEmail(event.target.value)}
                errorText={formMessage.includes('valid') ? formMessage : undefined}
                successText={formMessage.includes('successfully') ? formMessage : undefined}
                helperText={!formMessage ? 'We will send quality results here.' : undefined}
              />
              <div className={styles.controls}>
                <Button type="submit" data-testid={testIds.formSubmit}>
                  Validate email
                </Button>
              </div>
              <p data-testid={testIds.formStatus} className={styles.metaLine}>
                {formMessage || 'Awaiting validation'}
              </p>
            </form>

            <Tabs
              ariaLabel="Demo tabs"
              activeTabId={tabId}
              onTabChange={setTabId}
              tabs={[
                { id: 'overview', label: 'Overview', content: 'Current checks are healthy.' },
                { id: 'incidents', label: 'Incidents', content: 'No open incidents.' },
                { id: 'history', label: 'History', content: 'Last 14 runs retained.' },
              ]}
            />
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Data States</h2>
        <div className={styles.demoPanel}>
          <div className={styles.controls}>
            <Button variant="secondary" onClick={() => setTableMode('default')}>
              Default rows
            </Button>
            <Button variant="secondary" onClick={() => setTableMode('empty')}>
              Empty state
            </Button>
            <Button variant="secondary" onClick={() => setTableMode('loading')}>
              Loading state
            </Button>
          </div>
          <div data-testid={testIds.tableRoot}>
            <DataTable
              caption="Latest check run"
              columns={releaseColumns}
              rows={tableMode === 'empty' ? [] : releaseRows}
              loading={tableMode === 'loading'}
              emptyMessage="No rows in this mode."
              stackedOnMobile
            />
          </div>
          <ProductTile
            name="UI Quality Starter Kit"
            description="Component templates with reusable quality testing hooks."
            price={49}
            originalPrice={79}
          />
        </div>
      </section>
    </main>
  );
}
