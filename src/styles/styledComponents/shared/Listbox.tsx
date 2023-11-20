import Select, { type StylesConfig, components, type DropdownIndicatorProps } from 'react-select'
import LabelInput from './LabelInput'
import ChevronDownIcon from '../icons/ChevronDownIcon'

interface OptionType {
  label: string
  value: string
}

interface ListboxProps {
  placeholder: string
  options: OptionType[]
  value: string
  onChange: (selectedOption: string | number | null) => void
  required: boolean
  label: string
  loading?: boolean
}

export default function ListboxComponent({ options, placeholder, onChange, required, value, label, loading }: ListboxProps) {
  const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, false>) => {
    return (
      <components.DropdownIndicator {...props}>
        {loading ? <div className="spinner-border text-primary" role="status" /> : <ChevronDownIcon />}
      </components.DropdownIndicator>
    )
  }

  const listboxStyle: StylesConfig<OptionType, false> = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      height: '37px',
      borderRadius: '9999px',
      boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.08)',
      borderColor: state.isFocused
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(0, 0, 0, 0.2)',
      border: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(0, 0, 0, 0.2)'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#575756',
      fontSize: '14px',
      fontWeight: 400
    }),
  }

  const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label))
  const selectedOption = value ? options.find(opt => opt.value === value) : null

  return (
    <div>
      <LabelInput title={label} required={required} />
      <Select
        value={selectedOption}
        options={sortedOptions}
        placeholder={selectedOption ? undefined : placeholder}
        styles={listboxStyle}
        components={{ DropdownIndicator }}
        onChange={(selectedOption) => onChange(String(selectedOption?.value))}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        noOptionsMessage={({ inputValue }) =>
          inputValue ? `Nenhuma opção encontrada para "${inputValue}"` : "Nenhuma opção disponível"
        }
      />
    </div>
  )
}
