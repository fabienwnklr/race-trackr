import { Button, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Nav from '#components/nav'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import type { Track } from '#types/track'
import { ColumnsType, ColumnType } from 'antd/es/table'

const { Title } = Typography

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
// ];

const onChange: TableProps<Track>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function AdminTracks(props: any) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [columns, setColumns] = useState<ColumnType<Track>[]>([])
  const [data, setData] = useState<Track[]>([])
  const colsToIgnore = ['id', 'createdAt', 'updatedAt']

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const response = await fetch('/api/tracks')
      const dataResponse: Track[] = await response.json()
      // set state when the data received
      setTracks(dataResponse)

      if (dataResponse.length === 0) return

      const cols: ColumnsType<Track> = Object.keys(dataResponse[0])
        .filter((key) => !colsToIgnore.includes(key))
        .map((key) => {
          return {
            title: key,
            dataIndex: key,
            key: key,
          }
        })

      cols.push({
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, track) => (
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
                router.visit(`/admin/tracks/${track.slug}/delete`)
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      })

      const datas = []
      for (const track of dataResponse) {
        datas.push({
          key: track.name ?? 'NA',
          name: track.name ?? 'NA',
          slug: track.slug ?? 'NA',
          country: track.country ?? 'NA',
          city: track.city ?? 'NA',
          adress: track.adress ?? 'NA',
          distance: track.distance ?? 'NA',
          bestLapTime: track.best_lap_time ?? 'NA',
          bestLapTimePilote: track.best_lap_time ?? 'NA',
          infos: track.infos ?? 'NA',
        })
      }

      setColumns(cols as unknown as ColumnType<Track>[])
      setData(Object.values(datas) as unknown as Track[])
    }

    dataFetch()
  }, [])
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
          Add new track <PlusOutlined />
        </Button>
      </Title>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </Nav>
  )
}
