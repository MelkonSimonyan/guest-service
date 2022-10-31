import { useSelector } from 'react-redux'
import { selectInit } from '../features/init/initSlice'

export const useLang = () => {
  const { initData } = useSelector(selectInit)

  const messages = {
    ...initData.messages,
    "languages": "Языки",
    "select_language": "Выбрать язык",
    "my_orders": "Мои заказы",
    "menu": "Меню",
    "ru": "Русский",
    "am": "Հայերեն",
    "en": "English",
  }

  return (text) => (messages[text] ? messages[text] : '!__' + text + '__!')
}