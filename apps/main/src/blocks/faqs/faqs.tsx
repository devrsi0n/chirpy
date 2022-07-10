import * as React from 'react';

import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Text } from '$/components/text';

import { FAQ } from './faq';
import { FAQ_LIST } from './faq-data';

export function FAQs(): JSX.Element {
  return (
    <section className="flex w-full flex-col items-center">
      <div>
        <Text color="primary" className="mb-3 text-center font-semibold">
          FAQs
        </Text>
        <Heading as="h2" className="mb-6 text-center text-5xl font-semibold">
          Ask us anything
        </Heading>
        <Text variant="secondary" className="mb-24 text-center">
          Need something cleared up? Here are our most frequently asked
          questions.
        </Text>
      </div>
      <article className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10 2xl:grid-cols-3">
        {FAQ_LIST.map(({ title, description, icon }) => (
          <FAQ title={title} description={description} key={title}>
            {icon}
          </FAQ>
        ))}
        <div className="col-span-full mt-8 flex flex-col rounded-lg bg-white px-5 py-8 dark:bg-black lg:flex-row lg:items-start lg:justify-between lg:p-8">
          <div className="sm:0 mb-6">
            <Heading as="h5" className="mb-2">
              Still have questions?
            </Heading>
            <Text
              variant="secondary"
              className="max-w-xs md:max-w-full"
            >{`Can't find the answer you're looking for? Please chat to our friendly team.`}</Text>
          </div>
          <Link
            variant="plain"
            href={`mailto:support@chirpy.dev`}
            target="_blank"
          >
            <Button variant="solid" color="primary">
              Get in touch
            </Button>
          </Link>
        </div>
      </article>
    </section>
  );
}
