import Trash2 from '@geist-ui/react-icons/trash2';
import * as React from 'react';
import tw from 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Avatar } from '$/components/avatar';
import { Button } from '$/components/button';
import { Link } from '$/components/link';
import { Popover } from '$/components/popover';
import { Table } from '$/components/table';
import { Text } from '$/components/text';
import { useAllProjectsQuery, AllProjectsQuery } from '$/graphql/generated/project';
import { useDeleteUser } from '$/hooks/use-delete-user';

type projectRowProps = AllProjectsQuery['projects'][number];

type PagiProps = {
  limit: number;
  offset: number;
};

export default function Admin(): JSX.Element {
  const [params, setParams] = React.useState({ limit: 10, offset: 0 });

  const [{ data, fetching: projectLoading }, fetchProjects] = useAllProjectsQuery({
    variables: { ...params },
  });
  const projects = data?.projects || [];
  const deleteOneUser = useDeleteUser();

  const handleDeleteUser = async ({ User: { id } }: projectRowProps) => {
    deleteOneUser(id);
  };

  React.useEffect(() => {
    fetchProjects({ ...params });
  }, [params]);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'user',
        accessor: (rowProps: projectRowProps) => (
          <div tw="flex items-center">
            <Avatar src={rowProps?.User?.avatar!} />
            <p tw="ml-2 text-sm">{rowProps?.name}</p>
          </div>
        ),
      },
      {
        Header: 'project_id',
        accessor: 'id',
      },
      {
        Header: 'domain',
        accessor: ({ domain }: projectRowProps) => (
          <Link tw="text-blue-900" href={`/admin/${domain}`} variant="plain" tabIndex={-1}>
            {domain}
          </Link>
        ),
      },
      {
        Header: 'operation',
        accessor: (rowProps: projectRowProps) => (
          <Popover
            placement="topEnd"
            buttonAs="button"
            content={
              <div tw="flex flex-row items-center space-x-2">
                <Text size="sm" tw="w-max text-black">
                  Are you sure to delete this user?
                </Text>
                <Button variant="text" color="red" onClick={() => handleDeleteUser(rowProps)}>
                  confirm
                </Button>
              </div>
            }
          >
            <div css={[tw`flex flex-row items-center`]}>
              <Trash2 size={16} />
              <span tw="ml-1">Delete</span>
            </div>
          </Popover>
        ),
      },
    ];
    // eslint-disable-next-line
  }, []);

  return (
    <SiteLayout title="Admin">
      {projects?.length ? (
        <Table
          columns={columns}
          data={projects}
          next={projects.length}
          fetchData={() => {}}
          loading={projectLoading}
          pagination
          paginationChange={({ limit, offset }: PagiProps) => {
            setParams({ limit, offset });
          }}
        />
      ) : (
        <Text>No Project</Text>
      )}
    </SiteLayout>
  );
}
