import { Button, Descriptions, Modal, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Main from '#components/layout/main'
import { router } from '@inertiajs/react'

import type { Track } from '#types/track'
import type { ColumnType } from 'antd/es/table'
import { useState, type PropsWithChildren } from 'react'

import type { User } from '#types/user'
import i18n from '#config/i18n_react'

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
  // Modal for view track
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Track | null>(null)

  const showTrack = (track: Track) => {
    setModalData(track)
    setIsModalOpen(true)
  }

  const deleteTrack = (track: Track) => {
    Modal.confirm({
      title: i18n.t('delete_track'),
      content: i18n.t('delete_track_confirm', { name: track.name }),
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
  const aditionnalCols: ColumnType<Track>[] = [
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

  return (
    <Main route="/admin/tracks" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        level={2}
      >
        Admin - {i18n.t('tracks')}
        <Button type="primary" onClick={() => router.visit('/admin/tracks/create')}>
          {i18n.t('createTrack')} <PlusOutlined />
        </Button>
      </Title>

      <Modal
        width="max-content"
        centered
        title={`${i18n.t('track')}: ${modalData?.name}`}
        open={isModalOpen}
        footer={null}
        onOk={() => {
          hideModal()
        }}
        onCancel={() => {
          hideModal()
        }}
      >
        <Descriptions bordered size="middle" layout="vertical">
          {Object.keys(modalData || {}).map((key) => {
            return (
              <Descriptions.Item key={key} label={i18n.t(key)}>
                {modalData?.[key as keyof Track]}
              </Descriptions.Item>
            )
          })}
        </Descriptions>
      </Modal>
      <Table columns={[...columns, ...aditionnalCols]} dataSource={data} onChange={onChange} />
    </Main>
  )
}
