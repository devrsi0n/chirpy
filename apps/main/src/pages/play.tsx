import { useTheme } from 'next-themes';
import Script from 'next/script';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Select } from '$/components/select';
import { Text } from '$/components/text';

export default function PlayGround(): JSX.Element {
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState(theme || 'system');
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitle>Playground</PageTitle>
        <Text variant="secondary">Feel free to play around.</Text>
        <Select
          value={selectedTheme}
          onChange={(value) => setSelectedTheme(value)}
          label="Theme"
          className="w-32"
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
          <Select.Option value="system">System</Select.Option>
        </Select>
      </div>
      <div
        data-chirpy-comment
        data-chirpy-theme={selectedTheme}
        className="my-16"
      />
      <Script
        src="/bootstrap/comment.js"
        data-chirpy-domain={process.env.NEXT_PUBLIC_COMMENT_DOMAIN}
      />
    </SiteLayout>
  );
}
