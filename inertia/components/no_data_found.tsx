import { Col, Row, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

export default function NoDataFound() {
  return (
    <Row style={{ flex: '1', alignItems: 'center', justifyContent: 'center' }}>
      <Col>
        <Typography.Title
          level={3}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          type="secondary"
        >
          <InboxOutlined />
          No data
        </Typography.Title>
      </Col>
    </Row>
  )
}
