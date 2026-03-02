import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateTopastes, addToPastes } from '../redux/pasteSlice'

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')

  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes || [])

  useEffect(() => {
    if (!pasteId) return
    const paste = allPastes.find((p) => p._id === pasteId)
    if (!paste) return

    setTitle(paste.title)
    setValue(paste.content)
  }, [pasteId, allPastes])

  function createPaste() {
    const paste = {
      _id: pasteId || Date.now().toString(36),
      title,
      content: value,
      createdAt: new Date().toISOString(),
    }

    if (pasteId) dispatch(updateTopastes(paste))
    else dispatch(addToPastes(paste))

    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {pasteId ? 'Update Paste' : 'Create New Paste'}
        </h1>

        {/* Title + Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={createPaste}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>

        {/* Content */}
        <textarea
          placeholder="Write your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={16}
          className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  )
}

export default Home