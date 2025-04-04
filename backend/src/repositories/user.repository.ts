import prisma from '@/config/prisma';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { TUserFilter, TUserData, TUserQueryFilters } from '@/types/user.type';

const buildOrderBy = (column: string, order: string) => {
  const keys = column.split('.');
  let orderBy: Record<string, any> = { [keys.pop()!]: order };

  while (keys.length) {
    orderBy = { [keys.pop()!]: orderBy };
  }

  return orderBy;
};

const filterUsers = (filter: TUserFilter) => {
  let filters = {};

  const roles = filter?.roles
    ? filter?.roles?.split(',').map((role: string) => Number(role))
    : [];

  const genders = filter?.genders
    ? filter?.genders?.split(',').map((gender: string) => gender.toUpperCase())
    : [];

  const keywords = filter?.keywords;

  if (roles.length) {
    filters = {
      ...filters,
      roleId: {
        in: roles,
      },
    };
  }

  if (genders.length) {
    filters = {
      ...filters,
      profile: {
        gender: {
          in: genders,
        },
      },
    };
  }

  if (keywords) {
    filters = {
      ...filters,
      OR: [
        {
          username: {
            contains: keywords,
            mode: 'insensitive',
          },
        },
        {
          profile: {
            firstName: {
              contains: keywords,
              mode: 'insensitive',
            },
          },
        },
        {
          profile: {
            lastName: {
              contains: keywords,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }

  return filters;
};

export const findUsers = async ({
  range,
  sortBy,
  filter,
}: TUserQueryFilters) => {
  const { start = 0, end = 10 } = range || {};
  const { column = 'updatedAt', order = 'desc' } = sortBy || {};

  const skip = Number(start) || 0;
  const skipEnd = Number(end) || 0;
  const take = skipEnd - skip;
  const orderBy = [];

  if (column && order) {
    const orderByColumn = buildOrderBy(column, order);
    orderBy.push(orderByColumn);
  }

  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          birthDate: true,
          website: true,
          avatarUrl: true,
          gender: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: filter ? filterUsers(filter) : undefined,
    orderBy,
    skip,
    take,
  });
};

export const countUsers = async ({ filter }: TUserQueryFilters) => {
  return await prisma.user.count({
    where: filter ? filterUsers(filter) : undefined,
  });
};

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      password: true,
      bank: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          birthDate: true,
          website: true,
          avatarUrl: true,
          gender: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username: username },
    select: {
      id: true,
      username: true,
      password: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      role: { select: { id: true, name: true } },
      bank: true
    },
  });
};

export const insertUser = async (userData: TUserData) => {
  const user = await prisma.user.create({
    data: {
      id: generateId(50),
      username: userData.username,
      password: await new Argon2id().hash(userData.password),
      roleId: userData.roleId,
      bank: {
        create: {
          quantity: 35000000.00
        }
      }
    },
  });

  return user;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const updateUser = async (id: string, userData: TUserData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: userData.username,
      password: await new Argon2id().hash(userData.password),
      roleId: userData.roleId,
    },
  });

  return user;
};
