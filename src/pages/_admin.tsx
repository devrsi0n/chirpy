import Search from '@geist-ui/react-icons/search';
import Head from 'next/head';
import React, { useEffect } from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { Table } from '$/components/table';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useUserDashboardProjectsQuery } from '$/graphql/generated/user';
import { APP_ADMIN_NAME } from '$/lib/constants';

const columns = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'name',
    accessor: 'name',
  },
  {
    Header: 'domain',
    accessor: 'domain',
  },
  {
    Header: 'createdAt',
    accessor: 'createdAt',
  },
];

export default function Admin() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const {
    data: { id, name },
  } = useCurrentUser();

  const [{ data: dataList, fetching: projectLoading }, fetchUserProjects] =
    useUserDashboardProjectsQuery({
      variables: {
        id: id!,
      },
    });

  const { projects = [] } = dataList?.userByPk || {};

  console.log('projects', projects);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(projects?.slice(startRow, endRow));
        setPageCount(Math.ceil(projects.length / pageSize));
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleSearch = () => {
    console.log('sdjssfsdf');
  };

  return (
    <SiteLayout hideFullBleed>
      <Head>
        <title>{APP_ADMIN_NAME}</title>
      </Head>
      <div tw="px-24">
        <div tw="bg-white rounded-md w-full">
          <div tw="flex items-center justify-start space-x-4">
            <div tw="flex bg-gray-200 items-center p-2 rounded-md border-solid border-2">
              <input
                tw="w-64 ml-1 block bg-gray-200 outline-none"
                type="text"
                name=""
                id=""
                placeholder="search"
              />
            </div>
            <Button onClick={handleSearch} variant="solid" color="primary">
              <Search />
              <span>Search</span>
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
          pagination
        />
      </div>
    </SiteLayout>
  );
}
