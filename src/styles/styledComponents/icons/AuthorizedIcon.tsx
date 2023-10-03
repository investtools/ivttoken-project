interface AuthorizedIconProps {
  strokeWidth?: string
  size?: string
}

const AuthorizedIcon: React.FC<AuthorizedIconProps> = ({ strokeWidth, size }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={`${strokeWidth ?? "1.5"}`} stroke="currentColor" className={`${size ? `w-${size} h-${size}` : "w-12 h-12"}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default AuthorizedIcon
