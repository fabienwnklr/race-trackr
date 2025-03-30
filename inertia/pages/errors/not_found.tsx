import Main from '#components/layout/main'

export default function NotFound(props: any) {
  return (
    <Main {...props}>
      <div className="container">
        <div className="title">Page not found</div>

        <span>This page does not exist.</span>
      </div>
    </Main>
  )
}
