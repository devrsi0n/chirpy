import Search from '@geist-ui/react-icons/search';
import Head from 'next/head';
import * as React from 'react';
import { useTable } from 'react-table';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { useCurrentUser } from '$/contexts/current-user-provider/useCurrentUser';
import { useUserDashboardProjectsQuery } from '$/graphql/generated/user';
import { APP_NAME } from '$/lib/constants';

export default function Admin() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'createdAt',
        accessor: 'createdAt', // accessor is the "key" in the data
      },
      {
        Header: 'domain',
        accessor: 'domain',
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'name',
        accessor: 'name',
      },
    ],
    [],
  );

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

  console.log('datadata', projects);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: projects,
  });

  // eslint-disable-next-line
  const handleSearch = () => {};

  return (
    <SiteLayout hideFullBleed>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <div className="pl-24 pr-24">
        <div className="bg-white rounded-md w-full">
          <div className=" flex items-center justify-start pb-6 space-x-4">
            <div className="flex bg-gray-50 items-center p-2 rounded-md border-solid border-2 border-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
            <Button onClick={handleSearch} variant="solid" color="primary">
              <Search />
              <span>Search</span>
            </Button>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal" {...getTableProps()}>
              <thead className="bg-violet-600">
                {headerGroups.map((headerGroup) => (
                  // eslint-disable-next-line
                  <tr className='bg-violet-600' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // eslint-disable-next-line
                      <th
                        {...column.getHeaderProps()}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    // eslint-disable-next-line
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          // eslint-disable-next-line
                          <td
                            {...cell.getCellProps()}
                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export const strings = {
  heroTitlePoint: 'Open source & privacy friendly',
  heroTitle: 'Disqus alternate',
  heroDescription: 'Build a better community by integrating a modern comment system.',
  callToAction: {
    main: 'Get Early Access',
    secondary: 'Learn More',
  },
};
