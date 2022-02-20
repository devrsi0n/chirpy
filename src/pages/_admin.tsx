import Search from '@geist-ui/react-icons/search';
import Trash2 from '@geist-ui/react-icons/trash2';
import React, { useCallback, useEffect } from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { CommentTree } from '$/blocks/comment-tree';
import { SiteLayout } from '$/blocks/layout';
import { Avatar } from '$/components/avatar';
import { Button } from '$/components/button';
import { Dialog } from '$/components/dialog';
import { Heading } from '$/components/heading';
import { Popover } from '$/components/popover';
import { Table } from '$/components/table';
import { Text } from '$/components/text';
import { useDeleteUser } from '$/hooks/use-delete-user';
import { getComment } from '$/server/gql/comment';
import { CommentContentFragment } from '$/server/graphql/generated/comment';
import { CommentLeafType } from '$/types/widget';
import { dayjs } from '$/utilities/date';

type StaticProps = {
  commentList: [];
};

type fetchDateProps = {
  limit: number;
  offset: number;
};

const handleSearch = () => {
  console.log('test');
};

export default function Admin(props: StaticProps) {
  const commentList = props.commentList || [];
  const [data, setData] = React.useState([...commentList]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [showDialog, setShowDialog] = React.useState(false);
  const [comments, setComments] = React.useState<CommentContentFragment[]>([]);
  const deleteOneUser = useDeleteUser();
  const [pageParams, setPageParams] = React.useState({ limit: 10, offset: 10 });

  const handleClick = (rowProps: CommentContentFragment) => {
    setShowDialog(true);
    setComments([rowProps]);
  };

  const handleDeleteUser = async ({ user: { id } }: CommentContentFragment) => {
    deleteOneUser(id);
  };

  React.useEffect(() => {
    const fetchData = (params: fetchDateProps) => {
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...params }),
      }).then((res) => {
        console.log('........................', res);
      });
    };
    fetchData(pageParams);
  }, []);

  const commentsDetail = useCallback((comments: []): string => {
    let commentsAll = '';
    const getEveryComments = (comments: []) => {
      comments?.map((comment: any) => {
        return !!comment.text
          ? (commentsAll = `${commentsAll}\n${comment.text}`)
          : getEveryComments(comment.content);
      });
    };
    getEveryComments(comments);

    return commentsAll;
  }, []);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'user',
        accessor: (rowProps: CommentContentFragment) => (
          <div onClick={() => handleClick(rowProps)} tw="flex items-center cursor-pointer">
            <Avatar src={rowProps?.user?.avatar!} />
            <p tw="ml-2 text-sm">{rowProps?.user?.name}</p>
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
        Header: 'comment',
        accessor: ({ comment }: CommentContentFragment) => commentsDetail(comment),
      },
      {
        Header: 'operation',
        accessor: (rowProps: CommentContentFragment) => (
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
    <SiteLayout hideFullBleed title="Admin">
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
          fetchData={() => {}}
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
            <Heading as="h2" tw="mb-3 mr-8">
              Comments
            </Heading>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: tw`max-w-2xl sm:(px-14 py-10)` }}
      >
        <div tw="space-y-2">
          <ul>
            {comments?.map((comment: Partial<CommentLeafType>) => (
              <CommentTree
                key={comment.id}
                depth={1}
                comment={comment as any}
                onSubmitReply={() => Promise.resolve()}
                onClickLikeAction={() => Promise.resolve()}
              />
            ))}
          </ul>
        </div>
      </Dialog>
    </SiteLayout>
  );
}

export const getStaticProps = async () => {
  const commentList = await getComment(10, 0);

  return {
    props: { commentList },
  };
};
