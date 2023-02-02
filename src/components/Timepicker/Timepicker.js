import './Timepicker.css'
import React, { useState, useEffect } from 'react'
import { MdChevronRight, MdOutlineAccessTime } from 'react-icons/md'

import { useLang } from '../../hooks/useLang'

import ModalLayout from '../Modal/ModalLayout'

const Timepicker = ({
  time,
  asap,
  setTime,
  waitTime,
  availableTime,
  maxDaysDelivery,
}) => {
  const getLang = useLang()
  const [open, setOpen] = useState(false)

  const [selectedAsap, setSelectedAsap] = useState(false)

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
    const tempTime = clearTime(time + waitTime)
    const tempDate = new Date(tempTime)

    setStartTime(tempTime)
    setStartHours(tempDate.getHours())
    setStartMinutes(tempDate.getMinutes())

    setSelectedTime(tempTime)
  }, [])

  useEffect(() => {
    setSelectedAsap(asap)
  }, [asap])

  useEffect(() => {
    if (startTime && selectedTime) {
      const selectedD = new Date(selectedTime)
      const startD = new Date(startTime)
      selectedD.setHours(0, 0, 0, 0)
      startD.setHours(0, 0, 0, 0)

      setSelectedDay((selectedD.getTime() - startD.getTime()) / (24 * 60 * 60 * 1000))
      setSelectedHours((new Date(selectedTime)).getHours())
      setSelectedMinutes((new Date(selectedTime)).getMinutes())
      setTime(selectedAsap ? '' : clearTime(selectedTime))
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
            selectedAsap ? getLang('asCanSoon') :
              getDateString(selectedTime) + ', ' + ('0' + selectedHours).slice(-2) + ':' + ('0' + selectedMinutes).slice(-2) :
            null
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
            setTime(selectedAsap ? '' : clearTime(selectedTime))
            setOpen(false)
          }}
        >{getLang('choose')}</button>}
      >
        <div className='modal__header'>
          <h2 className='modal__title'>{getLang('deliveryTime')}</h2>
        </div>

        <div className='timepicker__row'>
          <div className={`timepicker__col ${selectedAsap ? '_asap' : '_day'}`}>
            <select
              className='form-select'
              value={selectedAsap ? '' : selectedDay}
              onChange={(e) => {
                setSelectedDay(Number(e.target.value))
                setSelectedAsap(e.target.value === '')
              }}
            >
              {asap ?
                <option value=''>{getLang('asCanSoon')}</option> : null
              }
              {[...Array(maxDaysDelivery)].map((x, i) =>
                <option value={i} key={i}>
                  {getDateString(startTime + 24 * 60 * 60 * 1000 * i)}
                </option>
              )}
            </select>
          </div>

          {selectedAsap ? null : <>
            <div className='timepicker__col _hour'>
              <select
                className='form-select'
                value={selectedHours}
                onChange={(e) => {
                  setSelectedHours(Number(e.target.value))
                }}
              >
                {[...Array(24)].map((x, i) =>
                  <option value={i} key={i} disabled={
                    (selectedDay === 0 && i < startHours)
                    ||
                    (
                      availableTime
                      &&
                      (
                        (
                          availableTime.to[0] > availableTime.from[0]
                          &&
                          (
                            i < availableTime.from[0]
                            ||
                            (
                              (availableTime.to[1] > 0 && i > availableTime.to[0])
                              ||
                              (availableTime.to[1] == 0 && i >= availableTime.to[0])
                            )
                          )
                        )
                        ||
                        (
                          availableTime.to[0] < availableTime.from[0]
                          &&
                          (
                            i < availableTime.from[0]
                            &&
                            (
                              (availableTime.to[1] > 0 && i > availableTime.to[0])
                              ||
                              (availableTime.to[1] == 0 && i >= availableTime.to[0])
                            )
                          )
                        )
                      )
                    )
                  }>
                    {('0' + (i)).slice(-2)}
                  </option>
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
                  <option value={i * 5} key={i} disabled={
                    (selectedDay === 0 && selectedHours === startHours && (i * 5) < startMinutes)
                    ||
                    (
                      availableTime
                      &&
                      (
                        (
                          selectedHours == availableTime.from[0]
                          &&
                          (i * 5) < availableTime.from[1]
                        )
                        ||
                        (
                          selectedHours == availableTime.to[0]
                          &&
                          (i * 5) >= availableTime.to[1]
                        )
                      )
                    )
                  }>
                    {('0' + (i * 5)).slice(-2)}
                  </option>
                )}
              </select>
            </div>
          </>}
        </div>
      </ModalLayout>
    </div>
  )
}

export default Timepicker