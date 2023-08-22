const initialRatio = 46 / 76

export const DownArrow = ({width = 46, className, active, black = false}) =>{

    return <svg className={`${className} ${!active? "-rotate-90": ""} h-full`} width={width} height={ initialRatio * width} viewBox="0 0 76 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1926 38.4056L74.0626 11.5355C76.0152 9.58291 76.0152 6.41709 74.0626 4.46447L71.9413 2.34315C69.9887 0.390525 66.8228 0.390524 64.8702 2.34315L41.5357 25.6777C39.5831 27.6303 36.4173 27.6303 34.4646 25.6777L11.1301 2.34315C9.17749 0.390524 6.01166 0.390524 4.05904 2.34315L1.93772 4.46447C-0.0149011 6.41709 -0.0149013 9.58291 1.93772 11.5355L28.8078 38.4056L34.4646 44.0624C36.4173 46.0151 39.5831 46.0151 41.5357 44.0624L47.1926 38.4056Z" fill={black ? "black" : "white"}/>
    </svg>
}
