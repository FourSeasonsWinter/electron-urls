import './JsonSection.css'

interface Props {
  title: string,
  editable: boolean,
  onInputChange: (input: string) => void
}

export default function Request({ title, editable, onInputChange }: Props) {
  return (
    <div className="request">
      <h3 className="section-title">{title}</h3>
      <textarea
        onChange={e => onInputChange(e.target.value)}
        placeholder=""
        rows={10}
        contentEditable={editable}
        spellCheck="false"
        className="json-area"
      />
    </div>
  )
}