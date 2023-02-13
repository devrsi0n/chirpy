import * as React from 'react';

import {
  Button,
  FormField,
  Heading,
  Input,
  Link,
  Text,
} from '../../../../components';

export type BlogHeroProps = {
  decorator?: string;
  title: string;
  description?: string;
  privacyLink?: string;
};

export function BlogHero(props: BlogHeroProps): JSX.Element {
  return (
    <section className="py-24">
      {props.decorator && (
        <Text variant="primary" className="mb-3 font-semibold">
          {props.decorator}
        </Text>
      )}
      <Heading as="h1" className="font-semibold">
        {props.title}
      </Heading>
      {props.description && (
        <Text variant="secondary" className="mt-8">
          {props.description}
        </Text>
      )}
      <div className="mt-10 flex items-start gap-4">
        <FormField
          className="!w-90"
          hint={
            props.privacyLink && (
              <span>
                We care about your data in our{' '}
                <Link
                  variant="plain"
                  href={props.privacyLink}
                  className="underline"
                >
                  privacy policy
                </Link>
                .
              </span>
            )
          }
        >
          <Input name="email" placeholder="Enter your email" />
        </FormField>
        <Button variant="primary">Subscribe</Button>
      </div>
    </section>
  );
}
