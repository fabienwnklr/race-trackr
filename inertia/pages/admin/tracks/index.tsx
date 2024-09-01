import { Button, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Nav from '#components/nav'
import { router } from '@inertiajs/react'

import type { Track } from '#types/track'
import type { ColumnType } from 'antd/es/table'
import type { PropsWithChildren } from 'react'
import type { User } from '#types/user'

const { Title } = Typography

const onChange: TableProps<Track>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function AdminTracks(
  props: PropsWithChildren & {
    columns: ColumnType<Track>[]
    data: Track[]
    user: User
  }
) {
  const { columns, data } = props
  const aditionnalCols: ColumnType<Track>[] = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, track) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              onClick={() => {
                router.visit(`/admin/tracks/${track.slug}`)
              }}
            >
              View
            </Button>
            <Button
              size="small"
              onClick={() => {
                router.visit(`/admin/tracks/${track.slug}/edit`)
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={() => {
                //
              }}
            >
              Delete
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <Nav route="/admin/tracks" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Admin - Tracks
        <Button type="primary" onClick={() => router.visit('/admin/tracks/create')}>
          Create new track <PlusOutlined />
        </Button>
      </Title>
      <Table columns={[...columns, ...aditionnalCols]} dataSource={data} onChange={onChange} />
    </Nav>
  )
}
