import Search from '@geist-ui/react-icons/search';
import Head from 'next/head';
import React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { CommentTree } from '$/blocks/comment-tree';
import { SiteLayout } from '$/blocks/layout';
import { Table } from '$/components/Table';
import { Avatar } from '$/components/avatar';
import { Button } from '$/components/button';
import { Dialog } from '$/components/dialog';
import { Heading } from '$/components/heading';
import { APP_ADMIN_NAME } from '$/lib/constants';
import { CommentContentFragment } from '$/server/graphql/generated/comment';
import { getComment } from '$/server/services/comment';
import { CommentLeafType } from '$/types/widget';
import { dayjs } from '$/utilities/date';

type StaticProps = {
  commentList: [];
};

export default function Admin(props: StaticProps) {
  const commentList = props.commentList || [];
  const [data, setData] = React.useState([...commentList]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [showDialog, setShowDialog] = React.useState(false);
  const fetchIdRef = React.useRef(0);
  const [comments, setComments] = React.useState<CommentContentFragment[]>([]);

  const handleClick = (rowProps: CommentContentFragment) => {
    setShowDialog(true);
    setComments([rowProps]);
  };

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'user',
        accessor: (rowProps: CommentContentFragment) => (
          <div tw="cursor-pointer">
            <Avatar onClick={() => handleClick(rowProps)} src={rowProps?.user?.avatar!} />
            <p tw="mt-1">{rowProps?.user?.name}</p>
          </div>
        ),
      },
      {
        Header: 'comment_id',
        accessor: 'id',
      },
      {
        Header: 'creation_time',
        accessor: ({ createdAt }: CommentContentFragment) =>
          createdAt && dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        Header: 'comments',
        accessor: (rowProps: CommentContentFragment) => (
          <Button variant="text" color="red" onClick={() => handleClick(rowProps)}>
            Delete
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
              {comments?.map((comment: Partial<CommentLeafType>) => (
                <CommentTree
                  key={comment.id}
                  depth={1}
                  comment={comment}
                  // onClickLikeAction={() => {}}
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

export const getStaticProps = async () => {
  const commentList = await getComment();

  return {
    props: { commentList },
  };
};
