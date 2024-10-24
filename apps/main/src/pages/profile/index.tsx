import { RouterOutputs, trpc } from '@chirpy-dev/trpc/src/client';
import {
  Avatar,
  Button,
  EMAIL_REGEXP,
  Heading,
  IconEdit2,
  IconLink2,
  IconSave,
  IconTrash2,
  IconTwitter,
  Link,
  logger,
  Popover,
  Spinner,
  Text,
  TextArea,
  TextField,
  useForm,
  useToast,
} from '@chirpy-dev/ui';
import * as React from 'react';

import { useCurrentUser } from '$/contexts/current-user-context';
import { SiteLayout } from '../../components/layout';
import { PageTitle } from '../../components/page-title';

type FormFields = {
  name: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  twitter: string;
};

export default function Profile(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const { data } = trpc.user.myProfile.useQuery();

  if (!isSignIn || !data) {
    return (
      <SiteLayout title={'Profile'}>
        <PageTitle>Profile</PageTitle>
        <ProfileContainer>
          <Spinner className="mt-20 justify-center" />
        </ProfileContainer>
      </SiteLayout>
    );
  }
  return <ProfileSection {...data} />;
}

function ProfileSection(
  props: NonNullable<RouterOutputs['user']['myProfile']>,
): JSX.Element {
  const {
    name,
    email,
    bio,
    website,
    twitterUserName,
    image,
    username,
    emailVerified,
  } = props;
  const [isEditMode, setIsEditMode] = React.useState(false);
  const { mutateAsync: updateProfile } = trpc.user.updateProfile.useMutation();

  const { register, errors, hasError, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: name || '',
      username: username || '',
      email: email || '',
      bio: bio || '',
      website: website || '',
      twitter: twitterUserName || '',
    },
  });
  const { showToast } = useToast();
  const utils = trpc.useContext();
  const { refetchUser } = useCurrentUser();
  const handleClickSubmit = handleSubmit(async (fields) => {
    try {
      await updateProfile({
        name: fields.name,
        username: fields.username,
        email: fields.email,
        bio: fields.bio,
        website: fields.website,
        twitterUserName: fields.twitter,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Update user profile failed', error);
        if (error.message.includes(`Unique constraint`)) {
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
      }
      throw error;
    }
    await Promise.allSettled([
      utils.user.myProfile.invalidate(),
      refetchUser(),
    ]);
  });

  const handleClickDiscard = () => {
    setIsEditMode(false);
  };

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
              {username ? (
                <Text title="Username, can't edit">@{username}</Text>
              ) : isEditMode ? (
                <TextField
                  {...register('username', {
                    required: { value: true, message: 'Username is required' },
                    pattern: {
                      value: /^\w+$/,
                      message: `Only word characters are allowed`,
                    },
                    minLength: { value: 3, message: 'At least 3 characters' },
                    maxLength: { value: 16, message: 'At most 16 characters' },
                  })}
                  label="Username"
                  hintText="Required for creating projects"
                  errorMessage={errors.username}
                />
              ) : (
                <></>
              )}
              {/* We only allow no email or unverified anonymous user to edit the email */}
              {isEditMode && (!email || !emailVerified) ? (
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
                    {!emailVerified && (
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
                    <div className="flex flex-col items-end gap-2">
                      <Text className="w-60">
                        Your unsaved content will lost, are you sure?
                      </Text>
                      <Button size="sm" onClick={handleClickDiscard}>
                        OK
                      </Button>
                    </div>
                  </Popover.Panel>
                </Popover>
              )}
              <Button
                className="space-x-1"
                onClick={async (e) => {
                  if (isEditMode) {
                    if (hasError) {
                      return;
                    }
                    await handleClickSubmit(e);
                  }
                  setIsEditMode((prev) => !prev);
                }}
                variant="solid"
                color="primary"
                aria-label={`${isEditMode ? 'Save' : 'Edit'} profile`}
                disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
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
                variant="primary"
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
                variant="primary"
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
