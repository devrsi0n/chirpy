import * as React from 'react';
import Head from 'next/head';
import { Link } from '$/components/Link';
import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';
import { List } from '$/components/List';
import { Layout } from '$/components/Layout/Layout';

export default function PrivacyPolicy(): JSX.Element {
  return (
    <Layout>
      <section>
        <Head>
          <title>ZOO: Privacy Policy</title>
        </Head>
        <article className="flex flex-col pb-12 article">
          <Heading as="h1" className="pb-6">
            Privacy Policy
          </Heading>
          <div>
            <Text>
              Your privacy is important to us. As a web-based service provider, we require some
              personal information in order to provide a service to you. However, we don’t ask for
              this information unless we truly need it. It is ZOO's policy to respect your privacy
              regarding any information we may collect from you across our website,{' '}
              <Link href={process.env.NEXT_PUBLIC_APP_URL}>{process.env.NEXT_PUBLIC_APP_URL}</Link>.
              Personal Information We may ask you for personal information, such as:
            </Text>
            <List variant="unordered">
              <li>Your name</li>
              <li>Email address</li>
              <li>Contact details</li>
              <li>Company details</li>
              <li>Payment details</li>
            </List>
            <Text>This information is used for the purposes of:</Text>
            <List variant="unordered">
              <li>providing you with products and services</li>
              <li>providing you with information about our products and services</li>
              <li>
                managing and improving our products, services, quality control, administration,
                communication and internal processes
              </li>
              <li>personalizing and customizing your experience with us</li>
              <li>verifying your identity</li>
              <li>granting you access to your account with us</li>
              <li>investigating any enquiries or complaints submitted by or about you</li>
              <li>complying with regulatory or legal obligations</li>
            </List>
            <Text>
              You are free to refuse our request for your personal information, with the
              understanding that we may be unable to provide you with some of your desired services.
              We do not share your personal information with third-parties, except where required by
              law, to protect our own rights, or to provide a service to you. We will only retain
              personal information for as long as necessary to provide you with a service.
            </Text>
            <br />
            <Text>
              We do not share your personal information with third-parties, except where required by
              law, to protect our own rights, or to provide a service to you.
            </Text>
            <br />
            <Text>
              We will only retain personal information for as long as necessary to provide you with
              a service.
            </Text>
          </div>
          <div>
            <Heading as="h2">Business Data</Heading>
            <Text>
              Our respect for your privacy extends to the data you input into our website over the
              normal course of using our services. We will not share your data with third-parties,
              except where required by law, to protect our own rights, or to provide a service to
              you. We may, however, disclose anonymised and aggregated versions of this information
              for business, marketing or public relations purposes. We will only retain your data
              for as long as necessary to provide you with a service.
            </Text>
          </div>
          <div>
            <Heading as="h2">Cookies</Heading>
            <Text>
              We use “cookies” to collect information about you and your activity across our site. A
              cookie is a small piece of data that our website stores on your computer, and accesses
              each time you visit so we can understand how you use our site and serve you content
              based on preferences you have specified.
            </Text>
            <br />
            <Text>
              If you do not wish to accept cookies from us, you should instruct your browser to
              refuse cookies from our website, with the understanding that we may be unable to
              provide you with some of your desired service without them. This policy covers only
              the use of cookies between your computer and our website; it does not cover the use of
              cookies by any advertisers. For more details, please refer to our Cookie Policy.
            </Text>
          </div>
          <div>
            <Heading as="h2">Third-Party Services</Heading>
            <Text>We employ third-party services for our:</Text>
            <List variant="unordered">
              <li>Payment processing (checkout)</li>
              <li>Email (customer support)</li>
              <li>Customer relationship management</li>
              <li>Advertising and remarketing</li>
            </List>
            <br />
            <Text>
              These third parties have access to selected personal information only to perform
              specific tasks on our behalf or to improve the relevance of information presented to
              you. We review the privacy policies of all our third-party providers before enlisting
              their services to ensure their practices align with ours.
            </Text>
          </div>
          <div>
            <Heading as="h2">Security</Heading>
            <Text>
              We take security seriously, and do what we can within commercially acceptable means to
              protect your personal information from loss or theft, as well as unauthorized access,
              disclosure, copying, use or modification. That said, we advise that no method of
              electronic transmission or storage is 100% secure, and cannot guarantee the absolute
              security of your data.
            </Text>
          </div>
        </article>
        <style jsx>
          {`
            .article > * {
              margin-bottom: theme('padding.10');
            }
          `}
        </style>
      </section>
    </Layout>
  );
}
