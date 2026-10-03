import { apiHelper } from '../../../helpers/apiHelper';

export const getLostFounds = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiHelper(`/lost-founds?${query}`, { method: 'GET' });
};

export const getLostFoundDetail = (id) => {
  return apiHelper(`/lost-founds/${id}`, { method: 'GET' });
};

export const addLostFound = (data) => {
  return apiHelper('/lost-founds', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateLostFound = (id, data) => {
  return apiHelper(`/lost-founds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateLostFoundCover = (id, file) => {
  const formData = new FormData();
  formData.append('cover', file);
  
  const token = localStorage.getItem('accessToken');
  return fetch(`${DELCOM_BASEURL}/lost-founds/${id}/cover`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  }).then(res => res.json());
};

export const deleteLostFound = (id) => {
  return apiHelper(`/lost-founds/${id}`, { method: 'DELETE' });
};

export const getDailyStats = () => {
  return apiHelper('/lost-founds/stats/daily', { method: 'GET' });
};

export const getMonthlyStats = () => {
  return apiHelper('/lost-founds/stats/monthly', { method: 'GET' });
};
