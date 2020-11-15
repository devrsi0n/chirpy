import * as React from 'react';

export interface TabsLabelItem {
  value: string;
  label: string | React.ReactNode;
  disabled: boolean;
}

export interface TabsConfig {
  register?: (item: TabsLabelItem) => void;
  currentValue?: string;
}

export const TabsContext = React.createContext<TabsConfig>({});

export const useTabsContext = (): TabsConfig => React.useContext<TabsConfig>(TabsContext);
