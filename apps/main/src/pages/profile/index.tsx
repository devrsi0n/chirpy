import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Avatar } from '$/components/avatar';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import {
  IconEdit2,
  IconLink2,
  IconSave,
  IconTrash2,
  IconTwitter,
} from '$/components/icons';
import { Link } from '$/components/link';
import { Popover } from '$/components/popover';
import { Spinner } from '$/components/spinner';
import { Text } from '$/components/text';
import { TextArea } from '$/components/text-area';
import { TextField } from '$/components/text-field';
import { useToast } from '$/components/toast';
import { useCurrentUser } from '$/contexts/current-user-context';
import {
  useCurrentUserQuery,
  useUpdateUserByPkMutation,
} from '$/graphql/generated/user';
import { useBypassCacheRefetch } from '$/hooks/use-bypass-cache-refetch';
import { useForm } from '$/hooks/use-form';
import { logger } from '$/lib/logger';
import { EMAIL_REGEXP } from '$/utilities/validator';

type FormFields = {
  name: string;
  email: string;
  bio: string;
  website: string;
  twitter: string;
};

export default function Profile(): JSX.Element {
  const { data: currentUser, isSignIn, refetchUser } = useCurrentUser();
  const refetchWithoutCache = useBypassCacheRefetch(refetchUser);
  const [{ data, fetching }] = useCurrentUserQuery({
    variables: { id: currentUser.id || '-1' },
    pause: !currentUser.id,
  });
  const {
    name,
    email,
    bio,
    website,
    twitterUserName,
    id,
    image,
    username,
    emailVerified,
    type,
  } = data?.userByPk || {};
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [{}, updateUserByPk] = useUpdateUserByPkMutation();

  const { register, errors, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: name || '',
      email: email || '',
      bio: bio || '',
      website: website || '',
      twitter: twitterUserName || '',
    },
  });
  const { showToast } = useToast();
  const handleClickButton = handleSubmit(async (fields) => {
    if (isEditMode) {
      const { error } = await updateUserByPk({
        id: id || '-1',
        name: fields.name,
        email: fields.email,
        bio: fields.bio,
        website: fields.website,
        twitterUserName: fields.twitter,
      });
      if (error) {
        logger.error('Update user profile failed', error);
        if (error.message.includes(`unique constraint \"User_email_key\"`)) {
          showToast({
            type: 'error',
            title: `${fields.email} is in use`,
            description:
              'The email address you entered is already in use. Please try another one.',
          });
        } else {
          showToast({
            type: 'error',
            title:
              'Sorry, something wrong happened in our side, please try again later.',
          });
        }
        return;
      }
      refetchWithoutCache();
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  });

  const handleClickDiscard = () => {
    setIsEditMode(false);
  };

  if (!isSignIn && fetching) {
    return (
      <ProfileContainer>
        <Spinner className="mt-20 justify-center" />
      </ProfileContainer>
    );
  }

  return (
    <SiteLayout title={name || 'Profile'}>
      <ProfileContainer className="space-y-7">
        <PageTitle>Profile</PageTitle>
        <section className="space-y-6">
          <div className="relative mt-1 flex h-40 w-full items-end justify-center rounded-t bg-gradient-to-r from-primary-900 to-plum-900">
            {(image || name || username || email) && (
              <Avatar
                src={image}
                size="xl"
                className="absolute translate-y-1/2"
                alt={`${name}'s avatar`}
                email={email}
                name={name}
                username={username}
              />
            )}
          </div>
          <div className="flex flex-row items-start justify-between pt-4">
            <div className="space-y-4">
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
              {username && (
                <Text title="Username, can't edit">@{username}</Text>
              )}
              {/* We only allow no email or unverified anonymous user to edit the email */}
              {isEditMode &&
              (!email || (type === 'anonymous' && !emailVerified)) ? (
                <TextField
                  {...register('email', {
                    pattern: {
                      value: EMAIL_REGEXP,
                      message: `Invalid email address`,
                    },
                  })}
                  label="Email"
                  errorMessage={errors.email}
                  hintText={
                    'You need to sign-in with this email address to verify it after saving'
                  }
                />
              ) : (
                email && (
                  <div>
                    <Text title="Email, can't edit it">{email}</Text>
                    {type === 'anonymous' && !emailVerified && (
                      <Text variant="secondary" size="sm" className="mt-1.5">
                        This email address is unverified, you need to sign-in
                        with this email address to verify it
                      </Text>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-row space-x-2">
              {isEditMode && (
                <Popover>
                  <Popover.Button>
                    <IconTrash2 size={16} />
                    <span className="ml-1">Discard</span>
                  </Popover.Button>
                  <Popover.Panel>
                    <div className="flex flex-row items-center space-x-2">
                      <Text className="w-max">
                        Your unsaved content will lost, are you sure?
                      </Text>
                      <Button size="sm" onClick={handleClickDiscard}>
                        Confirm
                      </Button>
                    </div>
                  </Popover.Panel>
                </Popover>
              )}
              <Button
                className="space-x-1"
                onClick={handleClickButton}
                variant="solid"
                color="primary"
                aria-label={`${isEditMode ? 'Save' : 'Edit'} profile`}
              >
                {isEditMode ? <IconSave size={16} /> : <IconEdit2 size={16} />}
                <span>{isEditMode ? 'Save' : 'Edit'}</span>
              </Button>
            </div>
          </div>
          {isEditMode ? (
            <TextArea {...register('bio')} label="Bio" />
          ) : (
            bio && <Text variant="secondary">{bio}</Text>
          )}
          {isEditMode ? (
            <TextField
              {...register('website')}
              label="Website"
              prefixNode="https://"
            />
          ) : (
            website && (
              <Link
                variant="solid"
                href={website}
                className="flex w-fit flex-row space-x-2"
              >
                <IconLink2 />
                <span>{website}</span>
              </Link>
            )
          )}
          {isEditMode ? (
            <TextField
              {...register('twitter')}
              label="Twitter"
              prefixNode="https://twitter.com/"
            />
          ) : (
            twitterUserName && (
              <Link
                variant="solid"
                href={`https://twitter.com/${twitterUserName}`}
                className="flex w-fit flex-row items-center space-x-2"
              >
                <IconTwitter size={22} />
                <span>@{twitterUserName}</span>
              </Link>
            )
          )}
        </section>
      </ProfileContainer>
    </SiteLayout>
  );
}

function ProfileContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <section className={className}>{children}</section>;
}
