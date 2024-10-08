import axios from 'axios';

export const formatDateYearFirst = (date) => {
  if (!date) return;
  const [dd, mm, yyyy] = date.split('-');
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDateDayFirst = (date) => {
  if (!date) return;
  const [yyyy, mm, dd] = date.split('-');
  return `${dd}-${mm}-${yyyy}`;
};

export const setJwtToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
