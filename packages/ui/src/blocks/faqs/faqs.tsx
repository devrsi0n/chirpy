import * as React from 'react';

import { Button, Heading, Link, SectionHeader, Text } from '../../components';
import { FEEDBACK_LINK } from 'utils';

import { FAQ } from './faq';
import { FAQ_LIST } from './faq-data';

export interface IFAQsProps {
  id: string;
}

export function FAQs({ id }: IFAQsProps): JSX.Element {
  return (
    <section className="flex w-full flex-col items-center" id={id}>
      <SectionHeader
        label="FAQs"
        title="Ask us anything"
        description="Need something cleared up? Here are our most frequently asked
          questions."
      />
      <article className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10 2xl:grid-cols-3">
        {FAQ_LIST.map(({ title, description, icon }) => (
          <FAQ title={title} description={description} key={title}>
            {icon}
          </FAQ>
        ))}
        <div className="col-span-full mt-8 flex flex-col rounded-lg bg-gray-0 px-5 py-8 lg:flex-row lg:items-start lg:justify-between lg:p-8">
          <div className="sm:0 mb-6">
            <Heading as="h5" className="mb-2 font-semibold">
              Still have questions?
            </Heading>
            <Text
              variant="secondary"
              className="max-w-xs md:max-w-full"
            >{`Can't find the answer you're looking for? Please chat to our friendly team.`}</Text>
          </div>
          <Link variant="plain" href={FEEDBACK_LINK} target="_blank">
            <Button variant="solid" color="primary">
              Get in touch
            </Button>
          </Link>
        </div>
      </article>
    </section>
  );
}
