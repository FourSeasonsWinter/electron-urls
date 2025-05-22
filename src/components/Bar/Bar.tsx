import { RiArrowDropDownLine } from 'react-icons/ri'
import { useState } from 'react'
import './Bar.css'

enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Props {
  onSend: (str: string) => void
}

export default function Bar({ onSend }: Props) {
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState<RequestType>(RequestType.GET)
  const [url, setUrl] = useState<string>('')

  function handleRequestTypeClick(type: RequestType) {
    setIsDropdownActive(false)
    setSelectedType(type)
  }

  return (
    <div className='bar'>
      <button
        className='request-type'
        onClick={() => {
          setIsDropdownActive(true)
        }}
      >
        <span>{selectedType.toString()}</span>
        <RiArrowDropDownLine size={24} />
      </button>
      <div className='divider'></div>
      <input
        type='text'
        placeholder='url...'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className='send' onClick={() => onSend(url)}>
        Send
      </button>

      {isDropdownActive && (
        <ul className='request-options'>
          <li onClick={() => handleRequestTypeClick(RequestType.GET)}>GET</li>
          <li onClick={() => handleRequestTypeClick(RequestType.POST)}>POST</li>
          <li onClick={() => handleRequestTypeClick(RequestType.PUT)}>PUT</li>
          <li onClick={() => handleRequestTypeClick(RequestType.DELETE)}>
            DELETE
          </li>
        </ul>
      )}
    </div>
  )
}
