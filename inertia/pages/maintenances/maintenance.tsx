import Nav from '#components/nav'
import { Button, Typography } from 'antd'
import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title } = Typography
/**
 * Show unique trackday
 */
export default function Maintenance(props: any) {
  return (
    <Nav route="/maintenances">
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Link
          onClick={() => {
            router.get('/maintenances')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          Back
        </Typography.Link>
        Maintenance for {props.name}
        <Button type="primary">
          Create new maintenance <PlusOutlined />
        </Button>
      </Title>
    </Nav>
  )
}
