import React, { useEffect } from 'react'
import { Col, notification, Row, Tabs } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'
import Login from '#components/login_form'
import Register from '#components/register_form'
import i18n from '#config/i18n_react'

const Context = React.createContext(null)

export default function Home(props: any) {
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    const openNotification = (
      message: string,
      placement: NotificationPlacement,
      details: string
    ) => {
      api.error({
        message,
        description: <Context.Consumer>{() => details}</Context.Consumer>,
        placement,
        duration: 5,
      })
    }

    if (props.error) {
      openNotification('error', 'bottom', props.error)
    }
  })

  return (
    <Context.Provider value={null}>
      {contextHolder}
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
                children: Login(),
              },
              {
                label: i18n.t('register'),
                key: '2',
                children: Register(),
              },
            ]}
          />
        </Col>
      </Row>
    </Context.Provider>
  )
}
