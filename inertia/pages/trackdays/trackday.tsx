import Main from '#components/layout/main'
import { Button, Typography } from 'antd'
import { LeftOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'

const { Title } = Typography
/**
 * Show unique trackday
 */
export default function Trackday(props: { user: User; trackday: Trackday }) {
  const { trackday } = props
  return (
    <Main route="/trackdays" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        level={2}
      >
        <Typography.Link
          onClick={() => {
            router.get('/trackdays')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          {i18n.t('back')}
        </Typography.Link>
        {i18n.t('trackday_of', { date: dayjs(trackday.date).format('DD/MM/YYYY') })}
        <Button type="primary" onClick={() => router.get('/trackdays/' + trackday.id + '/edit')}>
          {i18n.t('edit')}
          <EditOutlined />
        </Button>
      </Title>
    </Main>
  )
}
