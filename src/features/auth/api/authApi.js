import { apiHelper } from '../../../helpers/apiHelper';

export const login = (data) => {
  return apiHelper('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const register = (data) => {
  return apiHelper('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
