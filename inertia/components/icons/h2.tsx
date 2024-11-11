export default function H2Icon(props: any) {
  const size = props.size || 24
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="M6 8V40" />
        <path d="M24 8V40" />
        <path d="M7 24H23" />
        <path d="M32 25C32 21.8334 34.6667 20 37 20C39.3334 20 42 21.8334 42 25C42 30.7 32 34.9333 32 40H42" />
      </g>
    </svg>
  )
}
