export function ParagraphIcon(props: any) {
  const size = props.size || 24
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5.5h-9a4 4 0 0 0 0 8h2m3-8v13m-3-13v13"
      />
    </svg>
  )
}
