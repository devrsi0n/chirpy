import Search from '@geist-ui/react-icons/search';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { Dialog } from '$/components/dialog';
import { Table } from '$/components/table';
import { APP_ADMIN_NAME } from '$/lib/constants';
import { getComment } from '$/server/services/comment';

type rowProps = {
  id?: string;
  parentId?: string;
  content?: {};
};

export default function Admin(props: StaticProps) {
  console.log('propspropsprops', props);
  const comments = props.comments || [];
  const [data, setData] = useState([...comments]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const fetchIdRef = React.useRef(0);

  const handleClick = (info: rowProps) => {
    console.log(info);
    setShowDialog(true);
  };

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'parentId',
        accessor: 'parentId',
      },
      {
        Header: 'content',
        accessor: ({ content }) => <span>{content?.text}</span>,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ cell }) => (
          <Button variant="text" color="primary" onClick={() => handleClick(cell.row.values)}>
            edit
          </Button>
        ),
      },
    ];
  }, []);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(comments?.slice(startRow, endRow));
        setPageCount(Math.ceil(comments.length / pageSize));
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleSearch = () => {
    console.log('sdjssfsdf');
  };

  const handleCloseDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);

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
      <Dialog show={showDialog} title="" onClose={handleCloseDialog}>
        this is a demo dialog
      </Dialog>
    </SiteLayout>
  );
}

type StaticProps = {
  comments: [];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const comments = await getComment();

  return {
    props: { comments },
  };
};
