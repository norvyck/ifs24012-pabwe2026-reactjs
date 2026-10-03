import { apiHelper } from '../../../helpers/apiHelper';

export const getUsers = () => {
  return apiHelper('/users', { method: 'GET' });
};

export const getProfile = () => {
  return apiHelper('/users/me', { method: 'GET' });
};

export const updateProfile = (data) => {
  return apiHelper('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateProfilePhoto = (file) => {
  const formData = new FormData();
  formData.append('photo', file);
  
  const token = localStorage.getItem('accessToken');
  // Gunakan fetch langsung untuk file upload (menghindari Content-Type: application/json)
  return fetch(`${DELCOM_BASEURL}/users/me/photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  }).then(res => res.json());
};

export const updatePassword = (data) => {
  return apiHelper('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
