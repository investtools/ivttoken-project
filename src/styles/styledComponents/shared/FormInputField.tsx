import InputMask from 'react-input-mask'
import LabelInput from './LabelInput'

type FormInputFieldProps = {
  placeholder: string
  label: string
  onChange: (value: string) => void
  value: string
  inputType?: string
  required?: boolean
  mask?: string
  disable?: boolean
  textColor?: string
}

export default function FormInputField({
  inputType,
  placeholder,
  label,
  onChange,
  value,
  required,
  mask,
  disable,
  textColor
}: FormInputFieldProps) {
  const handleNumberInput = (value: string) => {
    if (Number(value) < 0) return '0'
    return value
  }

  const handleMask = (mask: string) => {
    if (mask.toLowerCase() === 'cnpj') return "99.999.999/9999-99"
    if (mask.toLowerCase() === 'rg') return "99.999.999-9"
    if (mask.toLowerCase() === 'rne') return "a9999999-9"
    if (mask.toLowerCase() === 'cpf') return "999.999.999-99"
    if (mask.toLowerCase() === 'fixo') return "(99)9999-9999"
    if (mask.toLowerCase() === 'celular') return "(99)9 9999-9999"
    if (mask.toLowerCase() === 'cnae') return "9999-9/99"
    if (mask.toLowerCase() === 'cep') return "99999-999"
    if (mask.toLowerCase() === 'uf') return "aa"
    if (mask.toLowerCase() === 'inepcode') return "99999999"
    return mask
  }

  return (
    <>
      <div className={`${textColor ?? 'text-[#262626]'} font-normal`}>
        <LabelInput title={label} required={required} />
        <InputMask
          value={inputType === 'number' ? handleNumberInput(value) : value}
          type={inputType || "text"}
          mask={mask ? handleMask(mask) : ""}
          disabled={disable}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-ivtcolor  border border-ivtcolor p-2 rounded-lg text-gray-900 ${disable ? 'cursor-not-allowed text-gray-400' : ''}`} />
      </div>
    </>
  )
}
