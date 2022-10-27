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
import Popup from '../Popup/Popup'

const Modal = () => {
  const dispatch = useDispatch()
  const { initData } = useSelector(selectInit)
  const { modalVisible } = useSelector(selectVisibility)
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    let modalType = searchParams.get('modalType')
    let modalId = searchParams.get('modalId')

    if (modalType) {
      let currentModalData = getModal(initData.pages, modalType, modalId)
      setModalData(currentModalData)
      dispatch(modalShow())
    } else {
      if (modalVisible) {
        dispatch(modalHide())
      }
    }
  }, [searchParams])

  return (
    <Popup
      visible={modalVisible}
      close={() => {
        searchParams.delete('modalType')
        searchParams.delete('modalId')
        setSearchParams(searchParams)
      }}
    >
      {modalData
        ? <div>
          {modalData.pic
            ? <img src={modalData.pic} />
            : null
          }
          {modalData.title
            ? <h2>{modalData.title}</h2>
            : null
          }
          {modalData.subTitle
            ? <h3>{modalData.subTitle}</h3>
            : null
          }
          {modalData.desc
            ? <div dangerouslySetInnerHTML={{ __html: modalData.desc }} />
            : null
          }
          {modalData.workTime
            ? <div>Время работы: {modalData.workTime}</div>
            : null
          }
          {modalData.link
            ? <a href={modalData.link.link} target='_blank'>{modalData.link.title}</a>
            : null
          }
        </div>
        : null
      }
    </Popup>
  )
}

export default Modal
