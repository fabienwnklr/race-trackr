import Main from '#components/layout/main'
import { Button, Typography } from 'antd'
import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'

const { Title } = Typography
/**
 * Show trackdays filtering on specific track
 */
export default function Track(props: any) {
  return (
    <Main route="/trackdays" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Link
          onClick={() => {
            router.get('/trackdays')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          Back
        </Typography.Link>
        Nogaro's trackdays
        <Button type="primary">
          Add new trackday <PlusOutlined />
        </Button>
      </Title>
    </Main>
  )
}
