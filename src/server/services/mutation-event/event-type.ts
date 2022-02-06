export type EventPayload = EventLike | EventComment;

/**
 * @example
 * ```
 * {
  "event": {
    "session_variables": {
      "x-hasura-role": "user",
      "x-hasura-user-id": "057eb503-75ad-4d2f-be3a-9d9675734d47"
    },
    "op": "INSERT",
    "data": {
      "old": null,
      "new": {
        "createdAt": "2022-01-30T08:30:27.331922+00:00",
        "pageId": "1d6bfbbe-e45b-45ae-983b-d2b7f33666b2",
        "content": {
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "text": "test",
                  "type": "text",
                  "marks": [
                    {
                      "type": "bold"
                    }
                  ]
                },
                {
                  "text": " paragraph",
                  "type": "text"
                }
              ]
            },
            {
              "type": "paragraph",
              "content": [
                {
                  "text": "new line",
                  "type": "text",
                  "marks": [
                    {
                      "type": "underline"
                    }
                  ]
                },
                {
                  "text": "hello",
                  "type": "text"
                }
              ]
            }
          ]
        },
        "userId": "057eb503-75ad-4d2f-be3a-9d9675734d47",
        "id": "c94f9fb0-bd57-43d0-94a2-b3e666669bf0",
        "updatedAt": "2022-01-30T08:30:27.331922+00:00",
        "deletedAt": null,
        "parentId": null
      }
    },
    "trace_context": {
      "trace_id": "f444fa6bbd17e365",
      "span_id": "6dd0dade4563f7c8"
    }
  },
  "created_at": "2022-01-30T08:30:27.331922Z",
  "id": "05302df1-11cb-46f9-a885-48bf175acd98",
  "delivery_info": {
    "max_retries": 3,
    "current_retry": 0
  },
  "trigger": {
    "name": "Comment"
  },
  "table": {
    "schema": "public",
    "name": "Comment"
  }
}
 * ```
 */

export type EventLike = {
  event: {
    session_variables: {
      'x-hasura-role': string;
      'x-hasura-user-id': string;
    };

    trace_context: {
      trace_id: string;
      span_id: string;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: 'Like';
  };
  table: {
    schema: 'public';
    name: 'Like';
  };
} & (
  | {
      event: {
        op: 'INSERT';
        data: {
          old: null;
          new: Like;
        };
      };
    }
  | {
      event: {
        op: 'DELETE';
        data: {
          old: Like;
          new: null;
        };
      };
    }
);

export interface EventComment {
  event: {
    session_variables: {
      'x-hasura-role': string;
      'x-hasura-user-id': string;
    };
    op: 'INSERT' | 'UPDATE';
    data: {
      old: Comment | null;
      new: Comment;
    };
    trace_context: {
      trace_id: string;
      span_id: string;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: 'Comment';
  };
  table: {
    schema: 'public';
    name: 'Comment';
  };
}

interface Comment {
  createdAt: string;
  pageId: string;
  content: {
    content: Array<{
      content: Array<{
        text: string;
        type: string;
      }>;
      type: string;
    }>;
    type: string;
  };
  userId: string;
  id: string;
  updatedAt: string;
  deletedAt: string | null;
  parentId: string | null;
}

interface Like {
  createdAt: string;
  userId: string;
  id: string;
  updatedAt: string;
  commentId: string;
}
