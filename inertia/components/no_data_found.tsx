import { Col, Row, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { gray } from '@ant-design/colors'

export default function NoDataFound() {
  return (
    <Row
      style={{
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '0.4rem',
      }}
    >
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
