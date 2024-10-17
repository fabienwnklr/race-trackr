export function SortIcon(props: any) {
  const { size = 20 } = props

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M4 16L13 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
        <path d="M6 11H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
        <path d="M8 6L13 6" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
        <path
          d="M17 4L17 20L20 16"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}
