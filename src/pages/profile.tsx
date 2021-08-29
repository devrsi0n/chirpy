import Edit2 from '@geist-ui/react-icons/edit2';
import Link2 from '@geist-ui/react-icons/link2';
import Loader from '@geist-ui/react-icons/loader';
import Save from '@geist-ui/react-icons/save';
import Trash2 from '@geist-ui/react-icons/trash2';
import Twitter from '@geist-ui/react-icons/twitter';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { useCurrentUser } from '$/blocks/CurrentUserProvider/useCurrentUser';
import { Avatar } from '$/components/Avatar';
import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Popover } from '$/components/Popover';
import { Text } from '$/components/Text';
import { TextArea } from '$/components/TextArea';
import { TextField } from '$/components/TextField';
import { useToast } from '$/components/Toast';
import { useUpdateUserByPkMutation } from '$/graphql/generated/user';
import { useForm } from '$/hooks/useForm';

type FormFields = {
  name: string;
  bio: string;
  website: string;
  twitter: string;
};

export default function Profile(): JSX.Element {
  const {
    isLogin,
    loading,
    data: { id, avatar, name, username, bio, website, twitterUserName },
    refetchData,
  } = useCurrentUser();

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [updateUserByPk] = useUpdateUserByPkMutation();

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
          variables: {
            id: id!,
            name: fields.name,
            bio: fields.bio,
            website: fields.website,
            twitterUserName: fields.twitter,
          },
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

  if (!isLogin && loading) {
    return (
      <ProfileContainer>
        <div tw="text-gray-500 flex flex-col items-center justify-center">
          <Text>Loading...</Text>
          <Loader tw="animate-spin h-8 w-8" />
        </div>
      </ProfileContainer>
    );
  }

  if (!isLogin) {
    return (
      <ProfileContainer>
        <div tw="text-gray-500 flex items-center justify-center">Oops, please sign in first.</div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer tw="space-y-7">
      <Heading as="h2">Profile</Heading>
      <section tw="space-y-6">
        <div tw="relative bg-gradient-to-r from-blue-400 via-indigo-500 to-primary-500 mt-1 w-full h-40 rounded-t flex justify-center items-end">
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
                    <Text variant="sm" tw="w-max">
                      Your unsaved content will lost, are you sure?
                    </Text>
                    <Button size="sm" onClick={handleClickDiscard}>
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
            <Link variant="solid" href={website} tw="space-x-2 flex flex-row width[fit-content]">
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
              tw="space-x-2 flex flex-row items-center width[fit-content]"
            >
              <Twitter size={22} />
              <span>@{twitterUserName}</span>
            </Link>
          )
        )}
      </section>
    </ProfileContainer>
  );
}

function ProfileContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main tw="py-10" className={'main-container ' + className}>
        {children}
      </main>
    </>
  );
}
