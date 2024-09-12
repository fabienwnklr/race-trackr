import Main from '#components/layout/main'
import { router } from '@inertiajs/react'
import { Button, Col, Form, Input, notification, Row, Select, Space, theme } from 'antd'
import { Typography } from 'antd'

import type { Track } from '#types/track'
import { PropsWithChildren } from 'react'
import i18n from '#config/i18n_react'

const { Option } = Select
const { Title } = Typography
const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const buttonsStyle = { display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 24 }

const onCancel = () => {
  router.visit('/admin/tracks')
}

export default function CreateAdminTrack(
  props: PropsWithChildren & { user: any; track: Track | null; errors?: string; success?: string }
) {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
  const colSpan = 12
  const { track } = props

  if (track) {
    form.setFieldsValue(track)
  }

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  return (
    <Main route="/admin/tracks/create" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        level={2}
      >
        Admin - {track ? i18n.t('editTrack') : i18n.t('createTrack')}
      </Title>
      <Form
        form={form}
        layout="inline"
        {...layout}
        style={formStyle}
        name="control-hooks"
        onFinish={(values: Track) => {
          if (track) {
            values.slug = track.slug
            router.post(`/admin/tracks/${values.slug}/update`, values)
          } else {
            router.post('/admin/tracks/create', values)
          }
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={colSpan}>
            <Form.Item<Track>
              name="name"
              label={i18n.t('name')}
              rules={[{ required: true, message: i18n.t('required:nameRequired') }]}
              tooltip="Change this name perform to change URL !"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="country" label={i18n.t('country')}>
              <Select placeholder={i18n.t('selectCountry')} allowClear>
                <Option value="France">France</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="city" label={i18n.t('city')}>
              <Select placeholder={i18n.t('select_city')} allowClear>
                <Option value="Nogaro">Nogaro</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="adress" label={i18n.t('adress')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="distance" label={i18n.t('distance')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="bestLapTime" label={i18n.t('bestLapTime')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="bestLapTimePilote" label={i18n.t('bestLapTimePilote')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item<Track> name="infos" label={i18n.t('infos')}>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>

        <div style={buttonsStyle}>
          <Space>
            <Button htmlType="button" onClick={onCancel}>
              {i18n.t('cancel')}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !!form.getFieldsError().filter(({ errors: error_list }) => error_list.length).length
              }
            >
              {i18n.t('save')}
            </Button>
          </Space>
        </div>
      </Form>
    </Main>
  )
}
