import { Button, Descriptions, Modal, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Nav from '#components/nav'
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

  const showModal = (track: Track) => {
    setModalData(track)
    setIsModalOpen(true)
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
                showModal(track)
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
                //
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
    <Nav route="/admin/tracks" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Admin - {i18n.t('tracks')}
        <Button type="primary" onClick={() => router.visit('/admin/tracks/create')}>
          {i18n.t('create_track')} <PlusOutlined />
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
          <Descriptions.Item label={i18n.t('name')}>{modalData?.name}</Descriptions.Item>
          <Descriptions.Item label={i18n.t('slug')}>{modalData?.slug}</Descriptions.Item>
          <Descriptions.Item label={i18n.t('country')}>{modalData?.country}</Descriptions.Item>
          <Descriptions.Item label={i18n.t('city')}>{modalData?.city}</Descriptions.Item>
          <Descriptions.Item label={i18n.t('adress')}>{modalData?.adress}</Descriptions.Item>
          <Descriptions.Item label={i18n.t('infos')}>{modalData?.infos}</Descriptions.Item>
        </Descriptions>
      </Modal>
      <Table columns={[...columns, ...aditionnalCols]} dataSource={data} onChange={onChange} />
    </Nav>
  )
}
