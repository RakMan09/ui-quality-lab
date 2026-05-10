import { useMemo, useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  ariaLabel?: string;
}

function getNextEnabledIndex(tabs: TabItem[], currentIndex: number, direction: 1 | -1): number {
  const total = tabs.length;

  for (let step = 1; step <= total; step += 1) {
    const index = (currentIndex + step * direction + total) % total;
    if (!tabs[index]?.disabled) {
      return index;
    }
  }

  return currentIndex;
}

export function Tabs({ tabs, activeTabId, onTabChange, ariaLabel = 'Tabs' }: TabsProps) {
  const firstEnabled = useMemo(() => tabs.find((tab) => !tab.disabled)?.id ?? tabs[0]?.id ?? '', [tabs]);
  const [internalTabId, setInternalTabId] = useState(firstEnabled);
  const selectedId = activeTabId ?? internalTabId;

  const selectedTab = tabs.find((tab) => tab.id === selectedId && !tab.disabled) ?? tabs.find((tab) => !tab.disabled) ?? tabs[0];

  const selectTab = (tabId: string) => {
    if (tabs.find((item) => item.id === tabId)?.disabled) {
      return;
    }

    if (!activeTabId) {
      setInternalTabId(tabId);
    }

    onTabChange?.(tabId);
  };

  return (
    <div className={styles.tabsRoot}>
      <div role="tablist" aria-label={ariaLabel} className={styles.tabList}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selectedTab?.id;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              disabled={tab.disabled}
              className={[styles.tabButton, isSelected ? styles.selected : ''].filter(Boolean).join(' ')}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const direction: 1 | -1 = event.key === 'ArrowRight' ? 1 : -1;
                  const nextIndex = getNextEnabledIndex(tabs, index, direction);
                  const next = tabs[nextIndex];
                  if (next) {
                    selectTab(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  }
                }

                if (event.key === 'Home') {
                  event.preventDefault();
                  const firstTab = tabs.find((item) => !item.disabled);
                  if (firstTab) {
                    selectTab(firstTab.id);
                    document.getElementById(`tab-${firstTab.id}`)?.focus();
                  }
                }

                if (event.key === 'End') {
                  event.preventDefault();
                  const lastTab = [...tabs].reverse().find((item) => !item.disabled);
                  if (lastTab) {
                    selectTab(lastTab.id);
                    document.getElementById(`tab-${lastTab.id}`)?.focus();
                  }
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {selectedTab ? (
        <section
          id={`panel-${selectedTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedTab.id}`}
          className={styles.panel}
        >
          {selectedTab.content}
        </section>
      ) : null}
    </div>
  );
}
