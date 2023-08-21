import axios from 'axios'

//export const apiRoot = 'https://api.travelstay.ru/api/widget/v1/guestportal/'
export const apiRoot = 'https://api.uhotels.app/api/widget/v1/guestportal/'

export const headers = {
  domain: window.location.hostname,
  hotel: localStorage.getItem('hotel') || '1:ea66c06c1e1c05fa9f1aa39d98dc5bc1',
  lang: localStorage.getItem('lang') || 'ru',
  currency: localStorage.getItem('currency') || 'RUB',
  portal: localStorage.getItem('portal'),
  access: localStorage.getItem('access'),
  Authorization: localStorage.getItem('authToken') ? 'Bearer ' + localStorage.getItem('authToken') : null
}

export default class API {
  static async getResource(url) {
    const response = await axios.get(apiRoot + url, { headers })
    return response
  }

  static async order(params) {
    const response = await axios.post(apiRoot + 'order', { ...params }, { headers })
    return response
  }

  static async feedback(params) {
    const response = await axios.post(apiRoot + 'feedback', { ...params }, { headers })
    return response
  }

  static async recommend(params, storeId) {
    const response = await axios.post(apiRoot + 'recommend' + '/' + storeId, { ...params }, { headers })
    return response
  }

  static async hasUser(params) {
    const response = await axios.post(apiRoot + 'user/has', { ...params }, { headers })
    return response
  }

  static async authorize(params) {
    const response = await axios.post(apiRoot + 'user/authorize', { ...params }, { headers })
    return response
  }

  static async registration(params) {
    const response = await axios.post(apiRoot + 'user/register', { ...params }, { headers })
    return response
  }

  static async confirmEmail(params) {
    const response = await axios.post(apiRoot + 'user/confirm-email', { ...params }, { headers })
    return response
  }

  static async sendPassword(params) {
    const response = await axios.post(apiRoot + 'user/send-password', { ...params }, { headers })
    return response
  }

  static async resetPassword(params) {
    const response = await axios.post(apiRoot + 'user/reset-password', { ...params }, { headers })
    return response
  }

  static async updateProfile(params) {
    const response = await axios.post(apiRoot + 'user/profile', { ...params }, { headers })
    return response
  }

  static async getBonuses(params) {
    const response = await axios.post(apiRoot + 'bonuses', { ...params }, { headers })
    return response
  }
}