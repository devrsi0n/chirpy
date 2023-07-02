import { z } from 'zod';

import { prisma } from '../common/db-client';

export const UPDATE_PROJECT_INPUT = z
  .object({
    projectId: z.string(),
    theme: z.object({
      colors: z.object({
        light: z.any(),
        dark: z.any(),
      }),
    }),
  })
  .or(
    z.object({
      projectId: z.string(),
      queryParameters: z.string().regex(/^[\w-]+(?:,[\w-]+)*$/i),
    }),
  );

export async function updateProject(
  input: z.infer<typeof UPDATE_PROJECT_INPUT>,
  userId: string,
) {
  const project = await prisma.project.updateMany({
    where: {
      id: input.projectId,
      userId,
    },
    data: {
      ...(isQueryParameters(input)
        ? {
            queryParameters: input.queryParameters,
          }
        : { theme: input.theme }),
    },
  });
  return project;
}

function isQueryParameters(
  input: z.infer<typeof UPDATE_PROJECT_INPUT>,
): input is { queryParameters: string; projectId: string } {
  return 'queryParameters' in input;
}
