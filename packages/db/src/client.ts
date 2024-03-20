import { isENVDev } from '@chirpy-dev/utils';
import { Prisma, PrismaClient } from '@prisma/client';
import { log } from 'next-axiom';
import SuperJSON from 'superjson';

export type {
  Page,
  Project,
  User,
  Team,
  Member,
  Comment,
  Like,
  NotificationMessage,
  NotificationSubscription,
  Settings,
} from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var _prismaClient: ReturnType<typeof getPrismaClient> | undefined;
}

function getPrismaClient() {
  return new PrismaClient({
    log: isENVDev
      ? ['error', 'warn', 'info', 'query']
      : [
          {
            emit: 'event',
            level: 'error',
          },
          {
            emit: 'event',
            level: 'warn',
          },
        ],
  });
}

export const prisma = global._prismaClient || getPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global._prismaClient = prisma;
}
if (!isENVDev) {
  prisma.$on('error', (e) => {
    log.error(`Prisma error: ${SuperJSON.stringify(e)}`);
  });

  prisma.$on('warn', (e) => {
    log.warn(`Prisma warn: ${SuperJSON.stringify(e)}`);
  });
}

export const prismaExtendedClient = prisma.$extends({
  model: {
    $allModels: {
      // https://github.com/prisma/prisma/issues/4134
      async upsertMany<T>(
        this: T,
        {
          data,
          conflictPaths,
          typeCast,
        }: {
          data: Prisma.Args<T, 'createMany'>['data'];
          conflictPaths: (keyof Prisma.Args<T, 'create'>['data'])[];
          // https://github.com/prisma/prisma/issues/10252
          typeCast?: { [P in keyof Prisma.Args<T, 'create'>['data']]?: string };
        },
      ): Promise<number> {
        data = Array.isArray(data) ? data : [data];
        if (data.length === 0) {
          return 0;
        }

        const context = Prisma.getExtensionContext(this);

        const model = Prisma.dmmf.datamodel.models.find(
          (model) => model.name === context.$name,
        );
        if (!model) {
          throw new Error('No model');
        }

        const tableArg = Prisma.raw(`"${model.dbName || model.name}"`);

        const writeableFields = model.fields.filter(
          (field) =>
            field.name !== 'createdAt' &&
            !field.relationName &&
            !field.isGenerated,
        );

        const values = (data as any[]).map(
          (d) =>
            Prisma.sql`(${Prisma.join(
              writeableFields.map((field) => {
                if (field.isUpdatedAt) {
                  return Prisma.sql`CURRENT_TIMESTAMP`;
                }

                const column = field.name;
                const cast = typeCast && typeCast[column];
                if (cast) {
                  return Prisma.sql`${d[column]}::${Prisma.raw(cast)}`;
                }

                return d[column];
              }),
            )})`,
        );

        const columns = writeableFields.map((field) => field.name);

        const columnsArg = Prisma.raw(columns.map((c) => `"${c}"`).join(','));

        const conflictArg = Prisma.raw(
          conflictPaths.map((c: string) => `"${c}"`).join(','),
        );

        const updateColumns = columns.filter((c) => !conflictPaths.includes(c));
        const updateArg = Prisma.raw(
          updateColumns.map((c) => `"${c}" = EXCLUDED."${c}"`).join(','),
        );

        const result = await (context.$parent as any).$executeRaw`
          INSERT INTO ${tableArg} (${columnsArg})
          VALUES ${Prisma.join(values)}
          ON CONFLICT (${conflictArg}) DO UPDATE SET
            ${updateArg};`;

        return result;
      },
    },
  },
});

export { Prisma } from '@prisma/client';
