import Layout from '#components/layout'

export default function NotFound(props: any) {
  return (
    <Layout {...props}>
      <div className="container">
        <div className="title">Page not found</div>

        <span>This page does not exist.</span>
      </div>
    </Layout>
  )
}
