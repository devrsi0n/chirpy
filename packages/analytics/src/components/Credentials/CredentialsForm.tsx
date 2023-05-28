import { SelectBox, SelectBoxItem, TextInput, Button } from '@tremor/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { HostType } from '../../lib/types/credentials';
import { OptionType } from '../../lib/types/options';

const hostOptions: OptionType<HostType>[] = [
  { text: HostType.Eu, value: HostType.Eu },
  { text: HostType.Us, value: HostType.Us },
  { text: 'Other', value: HostType.Other },
];

export default function CredentialsForm() {
  const router = useRouter();
  const [hostType, setHostType] = useState<HostType>(hostOptions[0].value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const credentials = Object.fromEntries(formData) as Record<string, string>;
    const { token, hostName } = credentials;
    if (!token || (hostType === HostType.Other && !hostName)) return;
    const host = hostType === HostType.Other ? hostName : hostType;
    const params = new URLSearchParams({ token, host });
    router.push({ pathname: router.pathname, search: params.toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col justify-between"
      aria-labelledby="credentials-title"
    >
      <div className="space-y-10">
        <div className="space-y-1">
          <label className="text-neutral-64 block text-sm font-normal">
            Token
          </label>
          <TextInput
            name="token"
            placeholder="p.eyJ3kdsfk2395IjogImMzZTMwNDIxLTYwNzctNGZhMS1iMjY1LWQwM2JhZDIzZGRlOCIsICJpZCI6ICIwYmUzNTgzNi0zODAyLTQwMmUtOTUxZi0zOWFm"
          />
          <p className="text-secondaryLight text-xs">
            Copy the token named dashboard generated with your web-analytics
            project.
          </p>
        </div>
        <div className="flex items-end gap-10">
          <div className="flex-1">
            <label className="text-neutral-64 mb-1 block text-sm font-normal">
              Host
            </label>
            <SelectBox
              value={hostType}
              onValueChange={(value) => setHostType(value as HostType)}
            >
              {hostOptions.map(({ text, value }) => (
                <SelectBoxItem key={value} text={text} value={value} />
              ))}
            </SelectBox>
          </div>
          <div className="flex-1">
            {hostType === HostType.Other && (
              <>
                <label className="text-neutral-64 mb-1 block text-sm font-normal">
                  Host name
                </label>
                <TextInput name="hostName" placeholder="Host name" />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" color="emerald">
            View dashboard
          </Button>
        </div>
      </div>
    </form>
  );
}
