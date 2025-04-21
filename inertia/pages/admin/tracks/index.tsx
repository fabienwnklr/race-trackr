import Main from '#components/layout/main'
import { router } from '@inertiajs/react'

import type { Track } from '#types/track'
import { useState, type PropsWithChildren } from 'react'

import type { User } from '#types/user'
import { Dialog } from '#components/ui/dialog'
import { Table, TableHeader } from '#components/ui/table'
import { Button } from '#components/ui/button'
import { Space } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()
  // Modal for view track
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Track | null>(null)

  const showTrack = (track: Track) => {
    setModalData(track)
    setIsModalOpen(true)
  }

  const deleteTrack = (track: Track) => {
    Modal.confirm({
      title: i18n.t('deleteTrack'),
      content: i18n.t('deleteTrackConfirm', { name: track.name }),
      onOk: () => {
        router.delete(`/admin/tracks/${track.slug}/delete`)
      },
      cancelText: i18n.t('cancel'),
      okButtonProps: {
        danger: true,
      },
      okText: i18n.t('delete'),
      centered: true,
    })
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const { columns, data } = props

  const aditionnalCols = [
    {
      title: i18n.t('actions'),
      dataIndex: 'actions',
      key: 'actions',
      render: (_, track) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              onClick={() => {
                showTrack(track)
              }}
            >
              <EyeOutlined />
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                router.visit(`/admin/tracks/${track.slug}/edit`)
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              size="small"
              type="primary"
              onClick={() => {
                deleteTrack(track)
              }}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        )
      },
    },
  ]

  columns.forEach((col) => {
    col.sorter = (a, b) => a.name.length - b.name.length
    col.sortDirections = ['ascend']
    col.ellipsis = true
  })

  return (
    <Main {...props}>
      <Table>
        <TableHeader>
          <TableTitle>
            {i18n.t('tracks')}
          </TableTitle>
        </TableHeader>
      </Table>
    </Main>
  )
}
