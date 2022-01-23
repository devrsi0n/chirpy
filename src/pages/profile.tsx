import Edit2 from '@geist-ui/react-icons/edit2';
import Link2 from '@geist-ui/react-icons/link2';
import Save from '@geist-ui/react-icons/save';
import Trash2 from '@geist-ui/react-icons/trash2';
import Twitter from '@geist-ui/react-icons/twitter';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Avatar } from '$/components/avatar';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Popover } from '$/components/popover';
import { Spinner } from '$/components/spinner';
import { Text } from '$/components/text';
import { TextArea } from '$/components/text-area';
import { TextField } from '$/components/text-field';
import { useToast } from '$/components/toast';
import { useCurrentUser } from '$/contexts/current-user-provider/useCurrentUser';
import { useUpdateUserByPkMutation } from '$/graphql/generated/user';
import { useForm } from '$/hooks/use-form';
import { APP_NAME } from '$/lib/constants';

type FormFields = {
  name: string;
  bio: string;
  website: string;
  twitter: string;
};

export default function Profile(): JSX.Element {
  const {
    isSignIn,
    loading,
    data: { id, avatar, name, username, bio, website, twitterUserName },
    refetchData,
  } = useCurrentUser();

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [{}, updateUserByPk] = useUpdateUserByPkMutation();

  const { register, errors, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: name || '',
      bio: bio || '',
      website: website || '',
      twitter: twitterUserName || '',
    },
  });
  const { showToast } = useToast();
  const handleClickButton = handleSubmit(async (fields) => {
    if (isEditMode) {
      try {
        await updateUserByPk({
          id: id!,
          name: fields.name,
          bio: fields.bio,
          website: fields.website,
          twitterUserName: fields.twitter,
        });
        refetchData?.();
        showToast({
          type: 'success',
          title: 'Profile saved!',
        });
        setIsEditMode(false);
      } catch (error) {
        console.error(error);
        showToast({
          type: 'error',
          title: 'Sorry, something wrong happened in our side, please try again later.',
        });
      }
    } else {
      setIsEditMode(true);
    }
  });

  const handleClickDiscard = () => {
    setIsEditMode(false);
  };

  if (!isSignIn && loading) {
    return (
      <ProfileContainer>
        <Spinner tw="justify-center mt-20" />
      </ProfileContainer>
    );
  }

  return (
    <SiteLayout>
      <Head>
        <title>
          {name} - {APP_NAME} profile
        </title>
      </Head>

      <ProfileContainer tw="space-y-7">
        <PageTitle>Profile</PageTitle>
        <section tw="space-y-6">
          <div tw="relative mt-1 w-full h-40 rounded-t flex justify-center items-end bg-gradient-to-r from-primary-900 to-plum-900">
            {avatar && (
              <Avatar
                src={avatar}
                size="xl"
                tw="absolute transform translate-y-1/2"
                alt={`Avatar of ${name}`}
              />
            )}
          </div>
          <div tw="pt-4 flex flex-row justify-between items-start">
            <div>
              {isEditMode ? (
                <TextField
                  {...register('name', {
                    required: { value: true, message: 'Name is required' },
                  })}
                  label="Name"
                  errorMessage={errors.name}
                />
              ) : (
                name && <Heading as="h4">{name}</Heading>
              )}
              {username && <Text title="Username, can't edit">@{username}</Text>}
            </div>
            <div tw="flex flex-row space-x-2">
              {isEditMode && (
                <Popover
                  buttonProps={{ variant: 'text' }}
                  content={
                    <div tw="flex flex-row items-center space-x-2">
                      <Text tw="w-max text-gray-100">
                        Your unsaved content will lost, are you sure?
                      </Text>
                      <Button variant="solid" size="sm" onClick={handleClickDiscard}>
                        Confirm
                      </Button>
                    </div>
                  }
                >
                  <Trash2 size={16} />
                  <span tw="ml-1">Discard</span>
                </Popover>
              )}
              <Button
                tw="space-x-1"
                onClick={handleClickButton}
                variant="solid"
                color="primary"
                aria-label={`${isEditMode ? 'Save' : 'Edit'} profile`}
              >
                {isEditMode ? <Save size={16} /> : <Edit2 size={16} />}
                <span>{isEditMode ? 'Save' : 'Edit'}</span>
              </Button>
            </div>
          </div>
          {isEditMode ? <TextArea {...register('bio')} label="Bio" /> : bio && <Text>{bio}</Text>}
          {isEditMode ? (
            <TextField {...register('website')} label="Website" prefixNode="https://" />
          ) : (
            website && (
              <Link variant="solid" href={website} tw="space-x-2 flex flex-row w-fit">
                <Link2 />
                <span>{website}</span>
              </Link>
            )
          )}
          {isEditMode ? (
            <TextField {...register('twitter')} label="Twitter" prefixNode="https://twitter.com/" />
          ) : (
            twitterUserName && (
              <Link
                variant="solid"
                href={`https://twitter.com/${twitterUserName}`}
                tw="space-x-2 flex flex-row items-center w-fit"
              >
                <Twitter size={22} />
                <span>@{twitterUserName}</span>
              </Link>
            )
          )}
        </section>
      </ProfileContainer>
    </SiteLayout>
  );
}

Profile.auth = true;

function ProfileContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <section className={className}>{children}</section>;
}
