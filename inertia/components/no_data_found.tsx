import { Col, Row, Typography, theme } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import i18n from '#config/i18n_react'

export default function NoDataFound() {
  const { token } = theme.useToken()
  const style: React.CSSProperties = {
    maxWidth: 'none',
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <Row style={style}>
      <Col>
        <Typography.Title
          level={3}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          type="secondary"
        >
          <InboxOutlined />
          {i18n.t('no_data_found')}
        </Typography.Title>
      </Col>
    </Row>
  )
}
