import { useSelector } from 'react-redux'
import { selectInit } from '../features/init/initSlice'

export const useLang = () => {
  const { initData } = useSelector(selectInit)

  const messages = {
    ...initData.messages,
    "choose": "Выбрать",
    "ChooseCurrency": "Выбрать валюту",
    "WorkTime": "Часы работы:",
    "tryAgain": "Попробовать снова",
    "serverError": "Произошла ошибка на сервере, извините за неудобство",
    "orderSuccess": "Ваш запрос был успешно отправлен.<br> Мы с Вами скоро свяжимся.",
    "feedbackTheme": "Тема",
    "formMessage": "Сообщение",
    "formEmail": "E-mail",
    "formErrorRequired": "Обязательное поле",
    "send": "Отправить",
  }

  return (text) => (messages[text] ? messages[text] : '!__' + text + '__!')
}