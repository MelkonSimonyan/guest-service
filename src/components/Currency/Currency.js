import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { selectInit } from '../../features/init/initSlice'
import {
  selectVisibility,
  currencyHide,
} from '../../features/visibility/visibilitySlice'

import { useLang } from '../../hooks/useLang'

import ModalLayout from '../Modal/ModalLayout'

const Currency = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { initData } = useSelector(selectInit)
  const { currencyVisible } = useSelector(selectVisibility)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const getLang = useLang()

  const hideCurrency = () => {
    dispatch(currencyHide())
  }

  const changeCurrencyTemp = (code) => {
    setSelectedCurrency(code)
  }

  const changeCurrency = () => {
    localStorage.setItem('currency', selectedCurrency)
    hideCurrency()
    window.location.reload()
  }

  useEffect(() => {
    setSelectedCurrency(initData.currency)
  }, [])

  useEffect(() => {
    if (currencyVisible) {
      hideCurrency()
    }
  }, [location.pathname])

  return (
    <ModalLayout
      visible={currencyVisible}
      close={hideCurrency}
      footer={<button
        type='button'
        className='btn btn_lg'
        onClick={changeCurrency}
      >{getLang('ChooseCurrency')}</button>}
    >
      <div className='modal__header'>
        <h2 className='modal__title'>{getLang('currency')}</h2>
      </div>

      <div className='modal-list'>
        {Object.entries(initData.currencies).map(([key, currency]) => (
          <div
            className={`modal-list__item ${currency.code === selectedCurrency ? 'is-active' : ''}`}
            key={key}
            onClick={() => {
              changeCurrencyTemp(currency.code)
            }}
          >
            <span
              className='modal-list__icon'
              dangerouslySetInnerHTML={{ __html: currency.symbol }}
            />

            <span className='modal-list__text'>{currency.name}</span>

            {currency.code === selectedCurrency ?
              <span className='modal-list__select-icon'>
                <BsFillCheckCircleFill />
              </span> : ''
            }
          </div>
        ))}
      </div>
    </ModalLayout>
  )
}

export default Currency
