import ReCAPTCHA from "react-google-recaptcha"

type CaptchaProps = {
    onChange: (value: string | null) => void
}

const Captcha: React.FC<CaptchaProps> = ({ onChange }) => {
    const captchaKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY || ""
    return (
        <ReCAPTCHA
            sitekey={captchaKey}
            onChange={onChange}
        />
    )
}

export default Captcha