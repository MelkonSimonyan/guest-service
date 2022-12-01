import './Timepicker.css'
import React, { useState, useEffect } from 'react'
import { MdChevronRight, MdOutlineAccessTime } from 'react-icons/md'

import { useLang } from '../../hooks/useLang'

import ModalLayout from '../Modal/ModalLayout'

const Timepicker = ({
  time,
  setTime,
  waitTime,
  maxDaysDelivery,
}) => {
  const getLang = useLang()
  const [open, setOpen] = useState(false)

  const [startTime, setStartTime] = useState('')
  const [startHours, setStartHours] = useState('')
  const [startMinutes, setStartMinutes] = useState('')

  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedHours, setSelectedHours] = useState('')
  const [selectedMinutes, setSelectedMinutes] = useState('')

  const clearTime = (time) => {
    const date = new Date(time)

    date.setSeconds(0)
    date.setMilliseconds(0)

    if (date.getMinutes() > 55) {
      date.setHours(date.getHours() + 1)
      date.setMinutes(0)
    } else {
      date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5)
    }

    if (date.getHours() > 22) {
      date.setDate(date.getDate() + 1)
      date.setHours(7)
      date.setMinutes(0)
    }

    return date.getTime()
  }

  const getDateString = (time) => {
    const monthNames = getLang('monthNames')
    const dayNames = getLang('dayNames')

    const date = new Date(time)

    const dayOfWeek = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()

    if (dayNames[dayOfWeek] && monthNames[month]) {
      return dayNames[dayOfWeek] + ' ' + ('0' + day).slice(-2) + ' ' + monthNames[month]
    }

    return ''
  }

  useEffect(() => {
    const currentTime = (new Date()).getTime()

    if (time < currentTime) {
      time = currentTime
    }

    setStartTime(clearTime(currentTime + waitTime))
    setSelectedTime(clearTime(currentTime + waitTime))
  }, [])

  useEffect(() => {
    if (startTime) {
      const startDate = new Date(startTime)

      setStartHours(startDate.getHours())
      setStartMinutes(startDate.getMinutes())
    }
  }, [startTime])

  useEffect(() => {
    if (selectedTime) {
      if (startTime) {
        const startD = new Date(startTime)
        const selectedD = new Date(selectedTime)

        startD.setHours(0, 0, 0, 0)
        selectedD.setHours(0, 0, 0, 0)

        setSelectedDay((selectedD.getTime() - startD.getTime()) / (24 * 60 * 60 * 1000))
      }

      const selectedDate = new Date(selectedTime)

      setSelectedHours(selectedDate.getHours())
      setSelectedMinutes(selectedDate.getMinutes())
      setTime(clearTime(selectedTime))
    }
  }, [startTime, selectedTime])

  useEffect(() => {
    if (selectedDay !== '' && selectedHours !== '' && selectedMinutes !== '') {
      const d = new Date(startTime)

      d.setHours(0, 0, 0, 0)

      const t = d.getTime()

      if (selectedDay === 0 && selectedHours < startHours) {
        setSelectedHours(startHours)
        setSelectedMinutes(startMinutes)
      } else if (selectedDay === 0 && selectedHours === startHours && selectedMinutes < startMinutes) {
        setSelectedMinutes(startMinutes)
      } else {
        setSelectedTime(t + selectedDay * 24 * 60 * 60 * 1000 + selectedHours * 60 * 60 * 1000 + selectedMinutes * 60 * 1000)
      }
    }
  }, [selectedDay, selectedHours, selectedMinutes])

  return (
    <div className='timepicker'>
      <button
        type='button'
        className='timepicker__label btn btn_secondary'
        onClick={() => {
          setOpen(true)
        }}
      >
        <span className='timepicker__label-icon'><MdOutlineAccessTime /></span>
        <span className='timepicker__label-text'>{
          selectedTime ?
            getDateString(selectedTime) + ', ' + ('0' + selectedHours).slice(-2) + ':' + ('0' + selectedMinutes).slice(-2) : null
        }</span>
        <span className='timepicker__label-arrow'><MdChevronRight /></span>
      </button>

      <ModalLayout
        visible={open}
        close={() => {
          setOpen(false)
        }}
        footer={<button
          type='button'
          className='btn btn_lg'
          onClick={() => {
            setTime(selectedTime)
            setOpen(false)
          }}
        >{getLang('choose')}</button>}
      >
        <div className='modal__header'>
          <h2 className='modal__title'>{getLang('deliveryTime')}</h2>
        </div>

        <div className='timepicker__row'>
          <div className='timepicker__col _day'>
            <select
              className='form-select'
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(Number(e.target.value))
              }}
            >
              {[...Array(maxDaysDelivery)].map((x, i) =>
                <option value={i} key={i}>{getDateString(startTime + 24 * 60 * 60 * 1000 * i)}</option>
              )}
            </select>
          </div>

          <div className='timepicker__col _hour'>
            <select
              className='form-select'
              value={selectedHours}
              onChange={(e) => {
                setSelectedHours(Number(e.target.value))
              }}
            >
              {[...Array(16)].map((x, i) =>
                <option value={i + 7} key={i} disabled={selectedDay === 0 && i + 7 < startHours}>{('0' + (i + 7)).slice(-2)}</option>
              )}
            </select>
          </div>

          <div className='timepicker__col _divident'>:</div>

          <div className='timepicker__col _minute'>
            <select
              className='form-select'
              value={selectedMinutes}
              onChange={(e) => {
                setSelectedMinutes(Number(e.target.value))
              }}
            >
              {[...Array(12)].map((x, i) =>
                <option value={i * 5} key={i} disabled={selectedDay === 0 && selectedHours === startHours && (i * 5) < startMinutes}>{('0' + (i * 5)).slice(-2)}</option>
              )}
            </select>
          </div>
        </div>
      </ModalLayout>
    </div>
  )
}

export default Timepicker