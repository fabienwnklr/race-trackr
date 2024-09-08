import { Col, notification, Row, Tabs } from 'antd'
import Login from '#components/login_form'
import Register from '#components/register_form'
import i18n from '#config/i18n_react'

export default function Home(props: { errors?: string }) {
  const { errors } = props

  if (errors) {
    notification.error({
      message: i18n.t('validation:error'),
      description: errors,
    })
  }

  return (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
      <Col lg={10} sm={14} xs={18}>
        <Tabs
          defaultActiveKey="1"
          style={{
            padding: '1rem',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 10px 2px',
            borderRadius: '0.5rem',
          }}
          items={[
            {
              label: i18n.t('login'),
              key: '1',
              children: <Login />,
            },
            {
              label: i18n.t('register'),
              key: '2',
              children: <Register />,
            },
          ]}
        />
      </Col>
    </Row>
  )
}
