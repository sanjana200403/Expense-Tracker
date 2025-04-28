import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, label, placeholder, onChange, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(prev => !prev)

  return (
    <div className="mb-4">
      {label && (
        <label className='text-[13px] text-slate-800 mb-1 block'>
          {label}
        </label>
      )}
      <div className='input-box flex items-center gap-2 border p-2 rounded-md'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none text-sm'
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye size={16} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={16} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Input
