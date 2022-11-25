export const apiRoot = 'https://api.travelstay.ru/api/widget/v1/guest-service/'

export const headers = {
  domain: window.location.hostname,
  lang: localStorage.getItem('lang') || 'ru',
  currency: localStorage.getItem('currency') || 'RUB',
}