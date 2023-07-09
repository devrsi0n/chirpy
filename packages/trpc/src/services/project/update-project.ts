import { z } from 'zod';

import { prisma } from '../../common/db-client';

const UPDATE_PROJECT_QUERY_PARAMETERS_INPUT = z.object({
  projectId: z.string(),
  // For revalidation
  domain: z.string(),
  queryParameters: z.string().regex(/^[\w-]+(?:,[\w-]+)*$/i),
});

const UPDATE_PROJECT_INFO_INPUT = z.object({
  projectId: z.string(),
  name: z.string(),
  domain: z.string(),
});

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
  .or(UPDATE_PROJECT_QUERY_PARAMETERS_INPUT)
  .or(UPDATE_PROJECT_INFO_INPUT);

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
      ...(isQueryParametersInput(input)
        ? {
            queryParameters: input.queryParameters,
          }
        : isProjectInfoInput(input)
        ? {
            name: input.name,
            domain: input.domain,
          }
        : { theme: input.theme }),
    },
  });
  return project;
}

export function isQueryParametersInput(
  input: z.infer<typeof UPDATE_PROJECT_INPUT>,
): input is z.infer<typeof UPDATE_PROJECT_QUERY_PARAMETERS_INPUT> {
  return 'queryParameters' in input;
}

export function isProjectInfoInput(
  input: z.infer<typeof UPDATE_PROJECT_INPUT>,
): input is z.infer<typeof UPDATE_PROJECT_INFO_INPUT> {
  return 'name' in input && 'domain' in input;
}
