import { useSelector } from 'react-redux'
import { selectInit } from '../features/init/initSlice'

export const useLang = () => {
  const { initData } = useSelector(selectInit)

  const messages = {
    ...initData.messages,
    "choose": "Выбрать",
    "ChooseCurrency": "Выбрать валюту",
  }

  return (text) => (messages[text] ? messages[text] : '!__' + text + '__!')
}