import './Modal.css'

import {
  useEffect,
  useState
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { selectInit } from '../../features/init/initSlice'
import {
  modalShow,
  modalHide,
  selectVisibility
} from '../../features/visibility/visibilitySlice'
import { getModal } from '../../utils/getModal'
import ModalLayout from './ModalLayout'

const Modal = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { modalVisible } = useSelector(selectVisibility)
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalData, setModalData] = useState(null)

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

  return (
    <ModalLayout
      visible={modalVisible}
      close={() => {
        searchParams.delete('modalType')
        searchParams.delete('modalId')
        setSearchParams(searchParams)
      }}
      image={modalData && modalData.pic}
      footer={modalData
        ? modalData.services
          ? <button
            type='button'
            className='btn'
            onClick={() => {
              alert(modalData.services.id)
            }}
          >
            Отправить запрос {modalData.services.price ? <>({modalData.services.price} {initData.hotel.currency})</> : ''}
          </button>
          : modalData.link
            ? <a className='btn' href={modalData.link.link} target='_blank'>{modalData.link.title}</a>
            : null
        : null}
    >
      {modalData
        ? <>
          <div className='modal__header'>
            {modalData.title
              ? <h2 className='modal__title'>{modalData.title}</h2>
              : null
            }
            {modalData.subTitle
              ? <div className='modal__subtitle'>{modalData.subTitle}</div>
              : null
            }
          </div>
          {modalData.desc
            ? <div className='modal__desc' dangerouslySetInnerHTML={{ __html: modalData.desc }} />
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
        : null
      }
    </ModalLayout>
  )
}

export default Modal
