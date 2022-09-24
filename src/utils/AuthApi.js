/**Регистрация.
 * Пример успешного ответа:
 * {
      "data": {
        "_id": "5f5204c577488bcaa8b7bdf2",,
        "email": "email@yandex.ru"
      }
    } 
    код ошибки:
    400 - некорректно заполнено одно из полей
    --------------------------- 
    Авторизация.
    Пример успешного ответа:
    {
      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    } 
    коды ошибок:
    400 - не передано одно из полей 
    401 - пользователь с email не найден 
 */
export const baseUrl = 'https://auth.nomoreparties.co';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      ...!!token && { 'Authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    });
}

export const register = (email, password) => {
  return request({
    url: '/signup',
    data: { password, email }
  });
}

export const authorize = (email, password) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
}

export const checkLoggedIn = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}

