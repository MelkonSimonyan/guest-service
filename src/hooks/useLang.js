import { useSelector } from 'react-redux'
import { selectInit } from '../features/init/initSlice'

export const useLang = () => {
  const { initData } = useSelector(selectInit)

  const messages = {
    ...initData.messages,
    //"hasClosedItems": "Некоторые товары недоступны сейчас, проверьте ваш заказ и продолжите.",
  }

  return (text) => (messages[text] ? messages[text] : '!__' + text + '__!')
}