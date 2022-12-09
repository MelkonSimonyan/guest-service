import './Modal.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { selectInit } from '../../features/init/initSlice'
import { setToCart } from '../../features/cart/cartSlice'
import {
  selectVisibility,
  modalShow,
  modalHide,
} from '../../features/visibility/visibilitySlice'

import { useLang } from '../../hooks/useLang'
import { getModal } from '../../utils/getModal'

import ModalLayout from './ModalLayout'

const Modal = () => {
  const getLang = useLang()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { initData } = useSelector(selectInit)
  const { modalVisible } = useSelector(selectVisibility)
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalData, setModalData] = useState(null)

  const openModal = () => {
    dispatch(modalShow())
  }

  const closeModal = () => {
    searchParams.delete('modalType')
    searchParams.delete('modalId')
    searchParams.delete('storeId')
    setSearchParams(searchParams)
  }

  const addToCart = () => {
    closeModal()
    dispatch(setToCart(modalData))
  }

  const orderService = () => {
    closeModal()
    navigate('/cart?serviceId=' + modalData.id)
  }

  useEffect(() => {
    let modalType = searchParams.get('modalType')

    if (modalType) {
      let modalId = searchParams.get('modalId')
      let storeId = searchParams.get('storeId')
      let currentModalData = getModal(initData.pages, modalType, modalId, storeId)
      setModalData(currentModalData)
    } else {
      if (modalVisible) {
        dispatch(modalHide())
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (modalData) {
      openModal()
    }
  }, [modalData])

  if (!modalData) {
    return null
  }

  return (
    <ModalLayout
      visible={modalVisible}
      close={closeModal}
      image={modalData.pic}
      slider={modalData.slider}
      footer={
        modalData.type === 'item' ?
          <button type='button'
            className='btn btn_lg'
            onClick={addToCart}
          >
            {getLang('addToBasket')}
          </button> :

          modalData.type === 'service' ?
            <button type='button'
              className='btn btn_lg'
              onClick={orderService}
            >
              {getLang('sendRequest')}
            </button> :

            modalData.type === 'link' ?
              <a target='_blank'
                className='btn btn_lg'
                href={modalData.link?.link}
              >
                {modalData.link?.title}
              </a> : null
      }
    >
      <>
        <div className='modal__header'>
          {modalData.title ?
            <h2 className='modal__title'>{modalData.title}</h2> : null
          }

          {modalData.subTitle ?
            <div className='modal__subtitle'>{modalData.subTitle}</div> : null
          }

          {(modalData.price || modalData.service?.price) ?
            <div className='modal__price'>{modalData.price || modalData.service?.price}&nbsp;<span dangerouslySetInnerHTML={{ __html: initData.currencies[initData.currency].symbol }} /></div> : null
          }
        </div>

        {modalData.desc ?
          <div className='modal__desc' dangerouslySetInnerHTML={{ __html: modalData.desc }} /> : null
        }

        {modalData.tags ?
          <div className='modal__tags'>
            {modalData.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div> : null
        }

        {modalData.workTime ?
          <div className='modal__worktime'>
            <div className='modal__worktime-title'>{getLang('WorkTime')}</div>
            <div>{modalData.workTime}</div>
          </div> : null
        }
      </>
    </ModalLayout>
  )
}

export default Modal
