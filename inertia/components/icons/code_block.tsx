export default function CodeBlockIcon(props: any) {
  const size = props.size || 24
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
      <path
        fill="currentColor"
        d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17ZM7.5 5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 24.5 5h-17Zm6.207 5.293a1 1 0 0 1 0 1.414L9.414 16l4.293 4.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0Zm4.586 1.414a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L22.586 16l-4.293-4.293Z"
      />
    </svg>
  )
}
