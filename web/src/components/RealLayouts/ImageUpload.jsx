import React, { useState, useRef } from 'react'

import JoditEditor from 'jodit-react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const ImageUploadForm = ({
  markers,
  setMarkers,
  url1,
  setsetUrl1,
  image,
  setImage,
  prev,
}) => {
  const [preview, setPreview] = useState(prev || null)
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null)
  const [editNumber, setEditNumber] = useState('')
  const [editNote, setEditNote] = useState('') // State to hold the note text
  const [editColor, setEditColor] = useState('red')
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const editorRef = useRef(null) // Ref for Jodit Editor

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleMouseDown = (e) => {
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMarkers([
      ...markers,
      { x, y, number: markers.length + 1, color: 'red', note: '' },
    ])
  }

  const handleEditNumberChange = (e) => {
    setEditNumber(e.target.value)
  }

  const handleEditColorChange = (e) => {
    setEditColor(e.target.value)
  }

  const handleEditNoteChange = (newContent) => {
    console.log(newContent)
    setEditNote(newContent)
  }

  const handleEditNumberSubmit = (e) => {
    e.preventDefault()
    if (selectedMarkerIndex !== null && editNumber !== '') {
      const updatedMarkers = markers.map((marker, index) =>
        index === selectedMarkerIndex
          ? { ...marker, number: editNumber, color: editColor, note: editNote }
          : marker
      )
      setMarkers(updatedMarkers)
      setEditNumber('')
      setEditNote('')
      setSelectedMarkerIndex(null)
    }
  }

  const handleDeleteMarker = (index) => {
    setMarkers(markers.filter((_, i) => i !== index))
    if (selectedMarkerIndex === index) {
      setSelectedMarkerIndex(null)
      setEditNumber('')
      setEditNote('')
      setEditColor('red')
    }
  }

  const handleMarkerClick = (index) => {
    setSelectedMarkerIndex(index)
    setEditNumber(markers[index].number)
    setEditNote(markers[index].note || '')
    setEditColor(markers[index].color)
  }

  return (
    <div className="mt-4 flex items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Upload an Image</h2>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {preview && (
          <div className="relative mb-4">
            <img
              src={preview}
              alt="Image Preview"
              ref={imageRef}
              className="h-auto max-w-full rounded-lg"
              onMouseDown={handleMouseDown}
            />
            {markers.map((marker, index) => {
              const left = `calc(${marker.x}% - 12px)` // Adjust for icon size
              const top = `calc(${marker.y}% - 24px)` // Adjust for icon size
              return (
                <div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{ left, top }}
                  onClick={() => handleMarkerClick(index)}
                >
                  <FaMapMarkerAlt
                    color={
                      selectedMarkerIndex === index ? 'blue' : marker.color
                    }
                    size="24"
                  />
                  <span
                    className={`font-bold ${
                      selectedMarkerIndex === index
                        ? 'text-blue-500'
                        : `text-${marker.color}-500`
                    }`}
                  >
                    {marker.number}
                  </span>
                </div>
              )
            })}
          </div>
        )}
        {selectedMarkerIndex !== null && (
          <>
            <div className="mb-4 flex space-x-4">
              <input
                type="number"
                value={editNumber}
                onChange={handleEditNumberChange}
                className="rounded-lg border px-4 py-2 text-sm"
                placeholder="Edit Marker Number"
              />
              <select
                value={editColor}
                onChange={handleEditColorChange}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
              </select>

              <div
                onClick={handleEditNumberSubmit}
                className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
                Update Marker
              </div>
            </div>
            <div className="mb-4">
              <JoditEditor
                ref={editorRef}
                value={editNote}
                onChange={handleEditNoteChange}
              />
            </div>
          </>
        )}
        {markers.map((marker, index) => (
          <div key={index} className="mb-2">
            <span>PLOT NO {index + 1}</span>
            <span
              onClick={() => handleMarkerClick(index)}
              className="ml-2 cursor-pointer text-blue-500 underline"
            >
              Edit
            </span>
            <span
              onClick={() => handleDeleteMarker(index)}
              className="ml-2 cursor-pointer text-red-500 underline"
            >
              Delete
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploadForm
