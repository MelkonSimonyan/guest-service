import './Modal.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import { modalShow, modalHide, selectVisibility } from '../../features/visibility/visibilitySlice'
import { setToCart } from '../../features/cart/cartSlice'
import { useLang } from '../../hooks/useLang'
import { getModal } from '../../utils/getModal'
import ModalLayout from './ModalLayout'

const Modal = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { modalVisible } = useSelector(selectVisibility)
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalData, setModalData] = useState(null)
  const getLang = useLang()

  useEffect(() => {
    let modalType = searchParams.get('modalType')

    if (modalType) {
      let modalId = searchParams.get('modalId')
      let currentModalData = getModal(initData.pages, modalType, modalId)
      setModalData(currentModalData)
    } else {
      if (modalVisible) {
        dispatch(modalHide())
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (modalData) {
      dispatch(modalShow())
    }
  }, [modalData])

  const close = () => {
    searchParams.delete('modalType')
    searchParams.delete('modalId')
    setSearchParams(searchParams)
  }

  const addToCart = (item) => {
    dispatch(setToCart(item))
    close()
  }

  const sendRequest = (id) => {
    alert(id)
  }

  if (!modalData) {
    return null
  }

  return (
    <ModalLayout
      visible={modalVisible}
      close={close}
      image={modalData.pic}
      footer={
        modalData.type === 'order' ?
          <button
            type='button'
            className='btn btn_lg'
            onClick={() => {
              addToCart(modalData)
            }}
          >{getLang('add_to_cart')}</button>
          : modalData.services ?
            <button
              type='button'
              className='btn btn_lg'
              onClick={() => {
                sendRequest(modalData.services.id)
              }}
            >{getLang('send_request')}</button>
            : modalData.link ?
              <a
                className='btn btn_lg'
                href={modalData.link.link}
                target='_blank'
              >{modalData.link.title}</a>
              : null
      }
    >
      <>
        <div className='modal__header'>
          {modalData.title
            ? <h2 className='modal__title'>{modalData.title}</h2>
            : null
          }
          {modalData.price || (modalData.services && modalData.services.price)
            ? <div className='modal__price'>{modalData.price || modalData.services.price} {initData.hotel.currency}</div>
            : modalData.subTitle
              ? <div className='modal__subtitle'>{modalData.subTitle}</div>
              : null
          }
        </div>
        {modalData.desc
          ? <div className='modal__desc' dangerouslySetInnerHTML={{ __html: modalData.desc }} />
          : null
        }
        {modalData.tags
          ? <div className='modal__tags'>
            {modalData.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          : null
        }
        {modalData.workTime
          ? <div className='modal__worktime'>
            <div className='modal__worktime-time'>Часы работы:</div>
            <div>{modalData.workTime}</div>
          </div>
          : null
        }
      </>
    </ModalLayout>
  )
}

export default Modal
