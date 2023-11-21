import RequiredFieldMessage from "./RequiredFieldMessage"

interface LabelInputProps {
  title: string
  required?: boolean
}

const LabelInput: React.FC<LabelInputProps> = ({ title, required }) => {
  return (
    <div className="text-[14px] font-bold text-lg text-ivtcolor2">
      {title} {required && <RequiredFieldMessage />}
    </div>
  )
}

export default LabelInput
