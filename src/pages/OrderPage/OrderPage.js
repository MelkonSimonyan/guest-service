import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdErrorOutline, MdOutlineShoppingBasket, MdOutlineCheckCircleOutline } from 'react-icons/md'

import API from '../../API/API'
import { setPageInfo } from '../../features/pageInfo/pageInfoSlice'

import { useFetching } from '../../hooks/useFetching'
import { useLang } from '../../hooks/useLang'


const OrderPage = () => {
  const dispatch = useDispatch()
  const getLang = useLang()
  const params = useParams()
  const orderContent = useRef(null)
  const [orderData, setOrderData] = useState(null)

  const [fetchOrder, isOrderLoading, orderError] = useFetching(async () => {
    const response = await API.getResource('order/' + params.id)

    setOrderData(response.data)
  })

  useEffect(() => {
    fetchOrder()

    dispatch(setPageInfo({
      pageId: 'order',
      pageTitle: '',
      parentLink: '/'
    }))
  }, [])

  useEffect(() => {
    if (orderData?.success) {
      if (localStorage.getItem('orderRedirect') && (orderData.pay?.url || orderData.pay?.html)) {
        localStorage.removeItem('orderRedirect')

        setTimeout(function () {
          if (orderData.pay.url) {
            let btn = orderContent.current.querySelector('a')
            if (btn) {
              btn.click()
            }
          } else if (orderData.pay.html) {
            let form = orderContent.current.querySelector('form')
            if (form) {
              form.submit()
            }
          }
        }, 2000)
      }
    }
  }, [orderData])

  if (isOrderLoading || !orderData) {
    return <div className='content'>
      <div className='container'>
        {isOrderLoading && <div className='loader _fix'></div>}
      </div>
    </div>
  }

  if (orderData.success) {
    return (
      <div className='content'>
        <div className='container'>
          <div className='page-message'>
            <div className='page-message__content'>
              <div className='page-message__icon' style={{ color: 'var(--success-color)' }}>
                <MdOutlineCheckCircleOutline />
              </div>

              <div className='page-message__subtitle'>
                <span dangerouslySetInnerHTML={{ __html: orderData.success || getLang('orderSuccess') }}></span>
              </div>

              {orderData.pay ?
                <div ref={orderContent}>
                  {orderData.pay.url ?
                    <a className='page-message__btn btn btn_lg' href={orderData.pay.url}>{getLang('pay')}</a> :
                    orderData.pay.html ?
                      <div dangerouslySetInnerHTML={{ __html: orderData.pay.html }}></div> :
                      <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
                  }
                </div> :
                <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='content'>
      <div className='container'>
        <div className='page-message'>
          <div className='page-message__content'>
            <div className='page-message__icon' style={{ color: 'var(--error-color)' }}>
              <MdErrorOutline />
            </div>

            <div className='page-message__subtitle'>
              <span dangerouslySetInnerHTML={{ __html: orderError || orderData?.pay?.error }}></span>
            </div>

            <Link className='page-message__btn btn btn_lg' to='/'>{getLang('mainMenu')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage