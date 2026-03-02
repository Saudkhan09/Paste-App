import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateTopastes, addToPastes } from '../redux/pasteSlice'

const viewPaste = () => {
  const { id } = useParams()

  const allPastes = useSelector((state) => state.paste.pastes || [])
  const paste = allPastes.find((p) => p._id === id)

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">

        {/* Title */}
        <div className="flex gap-2 mb-4">
          <input
            className="w-full p-3 text-lg font-semibold text-gray-800 border rounded-lg bg-gray-50"
            type="text"
            placeholder="Enter the title"
            value={paste?.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <textarea
          className="w-full p-4 border rounded-lg bg-gray-50 resize-none focus:outline-none"
          placeholder="Enter the content"
          value={paste?.content}
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={18}
        />
      </div>
    </div>
  )
}

export default viewPaste