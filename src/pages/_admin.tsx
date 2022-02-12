import Search from '@geist-ui/react-icons/search';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState, useRef } from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { CommentTree } from '$/blocks/comment-tree';
import { SiteLayout } from '$/blocks/layout';
import { Table } from '$/components/Table';
import { Button } from '$/components/button';
import { Dialog } from '$/components/dialog';
import { Heading } from '$/components/heading';
import { APP_ADMIN_NAME } from '$/lib/constants';
import { CommentContentFragment } from '$/server/graphql/generated/comment';
import { getComment } from '$/server/services/comment';
import { CommentLeafType } from '$/types/widget';

export default function Admin(props: StaticProps) {
  const commentList = props.commentList || [];
  const [data, setData] = useState([...commentList]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const fetchIdRef = useRef(0);
  const [comments, setComments] = useState([]);

  const handleClick = (rowProps: CommentContentFragment) => {
    setShowDialog(true);
    setComments([rowProps]);
  };

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'comment_id',
        accessor: 'id',
      },
      {
        Header: 'user',
        accessor: ({ user }) => <span>{user?.name}</span>,
      },
      {
        Header: 'createdAt',
        accessor: 'createdAt',
      },
      {
        Header: 'comments',
        accessor: (rowProps) => (
          <Button variant="text" color="primary" onClick={() => handleClick(rowProps)}>
            detail
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
        setData(commentList?.slice(startRow, endRow));
        setPageCount(Math.ceil(commentList.length / pageSize));
        setLoading(false);
      }
    }, 1000);
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const handleSearch = () => {
    console.log('test');
  };

  return (
    <SiteLayout hideFullBleed>
      <Head>
        <title>{APP_ADMIN_NAME}</title>
      </Head>
      <div tw="px-24">
        <div tw="bg-white rounded-md w-full dark:(bg-grayd-300)">
          <div tw="flex items-center justify-start space-x-4">
            <div tw="flex bg-gray-400 items-center p-2 rounded-md border-solid">
              <input
                tw="w-64 ml-1 block text-black bg-gray-400 placeholder-gray-800 outline-none"
                type="search"
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
      <Dialog
        showDismissButton
        show={showDialog}
        title={
          <div tw="w-5/6">
            <Heading as="h2" tw="mb-3">
              Comments
            </Heading>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: tw`max-w-2xl sm:(px-14 py-10)` }}
      >
        <div tw="">
          <div tw="space-y-2">
            <ul tw="min-w-full">
              {comments?.map((comment: CommentLeafType) => (
                <CommentTree
                  key={comment.id}
                  depth={1}
                  comment={comment}
                  onClickLikeAction={() => {}}
                  // onSubmitReply={() => console.log(123)}
                />
              ))}
            </ul>
          </div>
        </div>
      </Dialog>
    </SiteLayout>
  );
}

type StaticProps = {
  commentList: [];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const commentList = await getComment();

  return {
    props: { commentList },
  };
};
