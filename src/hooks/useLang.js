import { useSelector } from 'react-redux'
import { selectInit } from '../features/init/initSlice'

export const useLang = () => {
  const { initData } = useSelector(selectInit)

  return (text) => (initData.messages[text] ? initData.messages[text] : '!__' + text + '__!')
}