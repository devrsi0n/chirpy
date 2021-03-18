import * as React from 'react';
import Head from 'next/head';
import { Link } from '$/components/Link';
import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';
import { Layout } from '$/components/Layout';

export default function TermsOfService(): JSX.Element {
  return (
    <Layout>
      <section>
        <Head>
          <title>Terms of Service</title>
        </Head>
        <article tw="flex flex-col pb-12">
          <Heading as="h1" tw="pb-6">
            Terms of Service
          </Heading>
          <div>
            <Heading as="h2">1. Terms</Heading>
            <Text>
              By accessing the website at{' '}
              <Link href={process.env.NEXT_PUBLIC_APP_URL}>{process.env.NEXT_PUBLIC_APP_URL}</Link>,
              you are agreeing to be bound by these terms of service, all applicable laws and
              regulations, and agree that you are responsible for compliance with any applicable
              local laws. If you do not agree with any of these terms, you are prohibited from using
              or accessing this site. The materials contained in this website are protected by
              applicable copyright and trademark law.
            </Text>
          </div>
          <div>
            <Heading as="h2">2. Use License</Heading>
            <Text>
              Permission is granted to temporarily download one copy of the materials (information
              or software) on {process.env.NEXT_PUBLIC_APP_NAME}'s website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer
              of title, and under this license you may not:
            </Text>
            <br />
            <Text>
              Modify or copy the materials; use the materials for any commercial purpose, or for any
              public display (commercial or non-commercial); attempt to decompile or reverse
              engineer any software contained on {process.env.NEXT_PUBLIC_APP_NAME}'s website;
              remove any copyright or other proprietary notations from the materials; or transfer
              the materials to another person or “mirror” the materials on any other server. This
              license shall automatically terminate if you violate any of these restrictions and may
              be terminated by {process.env.NEXT_PUBLIC_APP_NAME} at any time. Upon terminating your
              viewing of these materials or upon the termination of this license, you must destroy
              any downloaded materials in your possession whether in electronic or printed format.
            </Text>
          </div>
          <div>
            <Heading as="h2">3. Disclaimer</Heading>
            <Text>
              a. The materials on {process.env.NEXT_PUBLIC_APP_NAME}'s website are provided on an
              ‘as is’ basis. {process.env.NEXT_PUBLIC_APP_NAME} makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of
              rights.
            </Text>
            <br />
            <Text>
              b. Further, {process.env.NEXT_PUBLIC_APP_NAME} does not warrant or make any
              representations concerning the accuracy, likely results, or reliability of the use of
              the materials on its website or otherwise relating to such materials or on any sites
              linked to this site.
            </Text>
          </div>
          <div>
            <Heading as="h2">4. Limitations</Heading>
            <Text>
              In no event shall {process.env.NEXT_PUBLIC_APP_NAME} or its suppliers be liable for
              any damages (including, without limitation, damages for loss of data or profit, or due
              to business interruption) arising out of the use or inability to use the materials on{' '}
              {process.env.NEXT_PUBLIC_APP_NAME}'s website, even if{' '}
              {process.env.NEXT_PUBLIC_APP_NAME}
              or a {process.env.NEXT_PUBLIC_APP_NAME} authorized representative has been notified
              orally or in writing of the possibility of such damage. Because some jurisdictions do
              not allow limitations on implied warranties, or limitations of liability for
              consequential or incidental damages, these limitations may not apply to you.
            </Text>
          </div>
          <div>
            <Heading as="h2">5. Accuracy of materials</Heading>
            <Text>
              The materials appearing on {process.env.NEXT_PUBLIC_APP_NAME} website could include
              technical, typographical, or photographic errors. {process.env.NEXT_PUBLIC_APP_NAME}{' '}
              does not warrant that any of the materials on its website are accurate, complete or
              current. {process.env.NEXT_PUBLIC_APP_NAME} may make changes to the materials
              contained on its website at any time without notice. However{' '}
              {process.env.NEXT_PUBLIC_APP_NAME} does not make any commitment to update the
              materials.
            </Text>
          </div>
          <div>
            <Heading as="h2">5. Accuracy of materials</Heading>
            <Text>
              The materials appearing on {process.env.NEXT_PUBLIC_APP_NAME} website could include
              technical, typographical, or photographic errors. {process.env.NEXT_PUBLIC_APP_NAME}{' '}
              does not warrant that any of the materials on its website are accurate, complete or
              current. {process.env.NEXT_PUBLIC_APP_NAME} may make changes to the materials
              contained on its website at any time without notice. However{' '}
              {process.env.NEXT_PUBLIC_APP_NAME} does not make any commitment to update the
              materials.
            </Text>
          </div>
          <div>
            <Heading as="h2">6. Links</Heading>
            <Text>
              {process.env.NEXT_PUBLIC_APP_NAME} has not reviewed all of the sites linked to its
              website and is not responsible for the contents of any such linked site. The inclusion
              of any link does not imply endorsement by {process.env.NEXT_PUBLIC_APP_NAME} of the
              site. Use of any such linked website is at the user’s own risk.
            </Text>
          </div>
          <div>
            <Heading as="h2">7. Modifications</Heading>
            <Text>
              {process.env.NEXT_PUBLIC_APP_NAME} may revise these terms of service for its website
              at any time without notice. By using this website you are agreeing to be bound by the
              then current version of these terms of service.
            </Text>
          </div>
          <div>
            <Heading as="h2">8. Governing Law</Heading>
            <Text>
              These terms and conditions are governed by and construed in accordance with the laws
              of Vancouver, Canada and you irrevocably submit to the exclusive jurisdiction of the
              courts in that State or location.
            </Text>
          </div>
        </article>
      </section>
    </Layout>
  );
}
