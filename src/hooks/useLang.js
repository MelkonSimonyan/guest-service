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
    "send_request": "Отправить запрос",
    "cart": "Корзина",
    "add_to_cart": "Добавить в корзину",
    "order_cost": "Стоимость заказа",
    "service_fee": "Сервисный сбор",
    "total": "Итого",
    "number_persons": "Количество персон",
    "delivery_time": "Время доставки",
    "hotel_stay": "Проживание в отеле",
    "hotel_guest": "Я гость отеля",
    "not_hotel_guest": "Я не гость отеля",
    "payment_method": "Способ оплаты",
    "guest_account": "Счет гостя",
    "pay_online": "Оплатить<br /> онлайн",
    "card_upon_receipt": "Картой<br /> при получении",
    "cash": "Наличными",
    "contact_details": "Контактные данные",
    "room_number": "Номер комнаты",
    "surname_latin": "Фамилия латиницей",
    "other_wishes": "Прочие пожелания",
    "confirm_order": "Подтвердить заказ",
    "select": "Выбрать",
    "select_date_and_time": "Выберите дату и время",
  }

  return (text) => (messages[text] ? messages[text] : '!__' + text + '__!')
}