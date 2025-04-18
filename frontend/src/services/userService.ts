import { User } from '../types/user';
import { apiWrapper } from '../utills/apiWrapper';

export const getUsers = async (): Promise<User[]> => {
  return await apiWrapper('/users');
};

export const createUser = async (user: User): Promise<void> => {
  await apiWrapper('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

export const updateUser = async (user: User): Promise<void> => {
  await apiWrapper(`/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
};


export const deleteUser = async (userId: number): Promise<void> => {
  await apiWrapper(`/users/${userId}`, {
    method: 'DELETE',
  });
};
