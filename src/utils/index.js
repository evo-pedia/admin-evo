// go to ./links.js file for complete list of links
// ================== DEVELOP ===================
// export const baseUrl = 'http://192.168.100.11:8000';
// awgeler
// export const baseUrl = 'http://192.168.1.17:8000';
// jims mancingqu
// export const baseUrl = 'http://192.168.100.42:8000';
// production
export const baseUrl = 'https://backend-evo.herokuapp.com';
// ================ HAK ISTIMEWA ================

// SAVED
export const token = localStorage.getItem('token');
export const adminType = localStorage.getItem('role');

export const dateFormat = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const dateString = new Date().toLocaleString('id-ID', dateOptions);
  const formattedString = dateString.replace('.', ':');

  return formattedString;
};

export const dateNaboyAnying = (date) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const tanggal = new Date(date).toLocaleString('id-ID', dateOptions);
  const tanggalFormat = tanggal.replace('.', ':');

  return tanggalFormat;
};

export const lastUpdated = () => {
  const formattedDate = dateFormat().slice(22);

  return formattedDate;
};

export const moneyFormat = (num) => {
  const newNum = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(num);

  return newNum;
};

export const thousandFormat = (num) => {
  const newNum = new Intl.NumberFormat('id-ID').format(num);

  return newNum;
};

export const getEmailUser = (str) => {
  const newEmail = str.substr(0, str.indexOf('@'));

  return newEmail;
};

export const setEmailUser = (str) => {
  const newEmail = `${str}@gmail.com`;

  return newEmail;
};

export const checkPhone = (phone) => {
  const phoneRegex = /^((?:\+62|62)|0)[2-9]{1}[0-9]+$/;

  if (phoneRegex.test(phone)) {
    return true;
  }

  return false;
};

export const numberOnly = (num) => {
  const regex = /^[0-9\b]+$/;
  const res = regex.test(num);

  return res;
};

export const checkEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    return true;
  }

  return false;
};

export const ubahReward = (reward) => {
  switch (reward) {
    case '1':
      return 'New Community';
    case '2':
      return 'Club Trainer';
    case '3':
      return 'Star Club';
    case '4':
      return 'Bronze Star';
    case '5':
      return 'Silver Star';
    case '6':
      return 'Gold Star';
    case '7':
      return 'Diamond Star';
    case '8':
      return 'Red Diamond Star';
    case '9':
      return 'Black Diamond Star';
    default:
      return 'Belum ada reward.';
  }
};

// factory
export const fetchWithToken = async (url, method, struct) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  };

  if (method === 'POST') {
    // check data
    if (struct === undefined) {
      //console.log('No data provided.');
      return;
    }

    const body = JSON.stringify(struct);

    const upstream = await fetch(url, {
      method,
      headers,
      body,
    });

    const downstream = await upstream.json();

    return downstream;
  }

  if (method === 'GET') {
    const upstream = await fetch(url, {
      method,
      headers,
    });

    const downstream = await upstream.json();

    return downstream;
  }
};
