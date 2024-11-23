import { useState } from 'react'
import Main from '#components/layout/main'
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import i18n from '#config/i18n_react'
import FormLayout from '#components/layout/form_layout'
import TextEditor from '#components/TextEditor/TextEditor'
import dayjs from 'dayjs'
import fr from 'antd/locale/fr_FR'

import type { User } from '#types/user'
import type { Maintenance } from '#types/maintenance'
import type { Vehicle } from '#types/vehicle'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

/**
 * Show unique trackday
 */
export default function Maintenance(props: {
  maintenance?: Maintenance
  user: User
  userVehicles: Vehicle[]
}) {
  const { maintenance, userVehicles } = props
  const [modalCreateVehicleOpen, setModalCreateVehicleOpen] = useState(false)
  const [details, setDetails] = useState(maintenance?.details || '')

  const onChangeContent = (content: string) => {
    setDetails(content)
  }

  return (
    <Main
      title={maintenance ? i18n.t('editMaintenance') : i18n.t('createMaintenance')}
      route="/maintenances"
      {...props}
    >
      <Modal
        title={i18n.t('createVehicle')}
        maskClosable={false}
        footer={null}
        closable={false}
        open={modalCreateVehicleOpen}
        onCancel={() => {
          setModalCreateVehicleOpen(false)
        }}
      >
        <FormLayout
          name="vehicle"
          onFinish={(fields) => {
            router.post('/user-vehicles/create', fields)
          }}
          onCancel={() => {
            setModalCreateVehicleOpen(false)
          }}
        >
          <Form.Item<Vehicle>
            {...formItemLayout}
            name="name"
            label={i18n.t('name')}
            rules={[{ required: true, message: i18n.t('required:nameRequired') }]}
          >
            <Input />
          </Form.Item>
        </FormLayout>
      </Modal>

      <FormLayout
        name="maintenance"
        onFinish={(data) => {
          data.details = details
          router.post(
            maintenance ? `/maintenances/${maintenance.id}/update` : '/maintenances/create'
          )
        }}
        onCancel={() => {
          router.visit('/maintenances')
        }}
        initialValues={{
          name: maintenance ? maintenance.name : '',
          details: maintenance ? maintenance.details : '',
          date: maintenance
            ? dayjs(maintenance.date).valueOf()
            : dayjs(new Date().toISOString()).valueOf(),
        }}
      >
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item<Maintenance>
              {...formItemLayout}
              style={{ width: '100%' }}
              label={i18n.t('vehicle')}
            >
              <Flex>
                <Space.Compact style={{ flex: 'auto' }}>
                  <Form.Item<Maintenance>
                    name="vehicleId"
                    noStyle
                    rules={[{ required: true, message: i18n.t('validation:vehicleRequired') }]}
                  >
                    <Select
                      options={userVehicles.map((vehicle) => ({
                        label: vehicle.name,
                        value: vehicle.id,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item noStyle>
                    <Tooltip title={i18n.t('createVehicle')}>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          // Open modal for create vehicle
                          setModalCreateVehicleOpen(true)
                        }}
                      ></Button>
                    </Tooltip>
                  </Form.Item>
                </Space.Compact>
              </Flex>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<Maintenance> {...formItemLayout} name="name" label={i18n.t('name')}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Maintenance>
              {...formItemLayout}
              name="date"
              label={i18n.t('date')}
              getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
            >
              <DatePicker format={fr.DatePicker?.lang.dateFormat} locale={fr.DatePicker} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<Maintenance>
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 20,
              }}
              name="details"
              label={i18n.t('details')}
            >
              <TextEditor content={details} onUpdate={onChangeContent} />
            </Form.Item>
          </Col>
        </Row>
      </FormLayout>
    </Main>
  )
}
