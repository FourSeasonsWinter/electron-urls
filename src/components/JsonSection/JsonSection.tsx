import './JsonSection.css'

interface Props {
  title: string
  content: string
  onInputChange?: (input: string) => void
}

export default function Request({
  title,
  content,
  onInputChange = () => {
    ('')
  },
}: Props) {
  return (
    <div className='request'>
      <h3 className='section-title'>{title}</h3>
      <textarea
        value={content}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder=''
        rows={10}
        spellCheck='false'
        className='json-area'
      />
    </div>
  )
}
