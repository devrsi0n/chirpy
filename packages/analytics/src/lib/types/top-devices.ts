import { Color } from '@tremor/react';

export type DeviceType = 'desktop' | 'mobile-ios' | 'mobile-android' | 'bot';

export type TopDevicesData = {
  device: DeviceType;
  browser: string;
  visits: number;
  hits: number;
};

export type TopDevice = {
  device: string;
  visits: number;
};

export type TopDevices = {
  data: TopDevice[];
};
