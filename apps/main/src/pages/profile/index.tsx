import Edit2 from '@geist-ui/react-icons/edit2';
import Link2 from '@geist-ui/react-icons/link2';
import Save from '@geist-ui/react-icons/save';
import Trash2 from '@geist-ui/react-icons/trash2';
import Twitter from '@geist-ui/react-icons/twitter';
import * as React from 'react';

import { SiteLayout } from '@chirpy/blocks';
import { PageTitle } from '@chirpy/blocks';
import { Avatar } from '@chirpy/components';
import { Button } from '@chirpy/components';
import { Heading } from '@chirpy/components';
import { Link } from '@chirpy/components';
import { Popover } from '@chirpy/components';
import { Spinner } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { TextArea } from '@chirpy/components';
import { TextField } from '@chirpy/components';
import { useToast } from '@chirpy/components';
import { useCurrentUser } from '@chirpy/contexts';
import { useUpdateUserByPkMutation } from '@chirpy/graphql/generated/user';
import { useForm } from '$/hooks/use-form';

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
          id: id || '-1',
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
        <Spinner className="justify-center mt-20" />
      </ProfileContainer>
    );
  }

  return (
    <SiteLayout title={name || 'Profile'}>
      <ProfileContainer className="space-y-7">
        <PageTitle>Profile</PageTitle>
        <section className="space-y-6">
          <div className="relative mt-1 w-full h-40 rounded-t flex justify-center items-end bg-gradient-to-r from-primary-900 to-plum-900">
            {avatar && (
              <Avatar
                src={avatar}
                size="xl"
                className="absolute translate-y-1/2"
                alt={`Avatar of ${name}`}
              />
            )}
          </div>
          <div className="pt-4 flex flex-row justify-between items-start">
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
            <div className="flex flex-row space-x-2">
              {isEditMode && (
                <Popover
                  content={
                    <div className="flex flex-row items-center space-x-2">
                      <Text className="w-max">Your unsaved content will lost, are you sure?</Text>
                      <Button size="sm" onClick={handleClickDiscard}>
                        Confirm
                      </Button>
                    </div>
                  }
                >
                  <Trash2 size={16} />
                  <span className="ml-1">Discard</span>
                </Popover>
              )}
              <Button
                className="space-x-1"
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
              <Link variant="solid" href={website} className="space-x-2 flex flex-row w-fit">
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
                className="space-x-2 flex flex-row items-center w-fit"
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

function ProfileContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <section className={className}>{children}</section>;
}
