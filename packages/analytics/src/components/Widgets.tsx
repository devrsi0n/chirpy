import dynamic, { LoaderComponent } from 'next/dynamic';

import InView from './InView';
import Widget from './Widget';

const enum WidgetHeight {
  XLarge = 588,
  Large = 472,
  Medium = 344,
  Small = 216,
}

function lazyLoadWidget(
  importPromise: () => LoaderComponent,
  loaderSize?: number,
) {
  return dynamic(importPromise, {
    loading: () => (
      <Widget>
        <Widget.Content status="loading" loaderSize={loaderSize} />
      </Widget>
    ),
    ssr: false,
  });
}

const KPIsWidget = lazyLoadWidget(() => import('./KpisWidget'), 80);
const BrowsersWidget = lazyLoadWidget(() => import('./BrowsersWidget'));
const TopPagesWidget = lazyLoadWidget(() => import('./TopPagesWidget'));
const TrendWidget = lazyLoadWidget(() => import('./TrendWidget'), 40);
const TopDevicesWidget = lazyLoadWidget(() => import('./TopDevicesWidget'));
const TopSourcesWidget = lazyLoadWidget(() => import('./TopSourcesWidget'));
const TopLocationsWidget = lazyLoadWidget(() => import('./TopLocationsWidget'));

export default function Widgets() {
  return (
    <div className="grid-rows-3-auto grid grid-cols-2 gap-5 sm:gap-10">
      <div className="col-span-2" style={{ height: WidgetHeight.XLarge }}>
        <KPIsWidget />
      </div>
      <div className="grid-rows-3-auto col-span-2 col-start-1 grid grid-cols-1 gap-5 sm:gap-10 lg:col-span-1">
        <InView height={WidgetHeight.Small}>
          <TrendWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopPagesWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopLocationsWidget />
        </InView>
      </div>
      <div className="grid-rows-2-auto lg:grid-rows-3-auto col-span-2 col-start-1 grid grid-cols-1 gap-5 sm:gap-10 md:grid-cols-2 lg:col-span-1 lg:col-start-2 lg:grid-cols-1">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <InView height={WidgetHeight.Large}>
            <TopSourcesWidget />
          </InView>
        </div>
        <InView height={WidgetHeight.Medium}>
          <TopDevicesWidget />
        </InView>
        <InView height={WidgetHeight.Medium}>
          <BrowsersWidget />
        </InView>
      </div>
    </div>
  );
}
