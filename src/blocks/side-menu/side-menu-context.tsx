import * as React from 'react';

export type SideMenuContextType = {
  onClickMenuItem: () => void;
};

const SideMenuContext = React.createContext<SideMenuContextType>({
  onClickMenuItem: () => {
    //
  },
});

export type SideMenuContextProviderProps = {
  children: React.ReactNode;
} & SideMenuContextType;

export function SideMenuContextProvider({
  onClickMenuItem,
  children,
}: SideMenuContextProviderProps): JSX.Element {
  const onClickMenuItemRef = React.useRef<() => void>(onClickMenuItem);
  onClickMenuItemRef.current = onClickMenuItem;

  const value = React.useMemo(
    () => ({
      onClickMenuItem: onClickMenuItemRef.current,
    }),
    [],
  );

  return <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>;
}

export function useSideMenuContext(): SideMenuContextType {
  const context = React.useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenuContext must be used within a SideMenuContextProvider');
  }
  return context;
}
