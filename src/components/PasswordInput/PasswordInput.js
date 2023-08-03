import './passwordInput.css'

import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const PasswordInput = ({
  register,
  registerData,
  name,
  autoFocus,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='password-field'>
      <input
        {...register(name, registerData)}
        autoFocus={autoFocus || false}
        className={className}
        type={showPassword ? 'text' : 'password'}
      />
      <button type='button'
        className='password-field__btn'
        tabIndex={-1}
        onClick={() => {
          setShowPassword(showPassword => !showPassword)
        }}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  )
}

export default PasswordInput