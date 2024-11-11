export default function H1Icon(props: any) {
  const size = props.size || 24
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
      <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="M6 8V40" />
        <path d="M25 8V40" />
        <path d="M6 24H25" />
        <path d="M34.2261 24L39.0001 19.0166V40" />
      </g>
    </svg>
  )
}
