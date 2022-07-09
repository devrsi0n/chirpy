import * as React from 'react';

import { Heading } from '$/components/heading';
import { Text } from '$/components/text';

import { FAQ } from './faq';
import { FAQ_LIST } from './faq-data';

export function FAQs(): JSX.Element {
  return (
    <section className=" w-full">
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
      <article className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {FAQ_LIST.map(({ title, description, icon }) => (
          <FAQ title={title} description={description} key={title}>
            {icon}
          </FAQ>
        ))}
      </article>
    </section>
  );
}
