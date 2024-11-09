import Main from '#components/layout/main'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import i18n from '#config/i18n_react'
import FormLayout from '#components/layout/form'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import type { User } from '#types/user'
import type { Maintenance } from '#types/maintenance'

const { Title } = Typography

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
export default function Maintenance(props: { maintenance: Maintenance; user: User }) {
  const { maintenance } = props
  const fields = [
    {
      name: 'name',
      label: i18n.t('name'),
      input: <Input />,
    },
    {
      name: 'description',
      label: i18n.t('description'),
    },
    {
      name: 'date',
      label: i18n.t('date'),
    },
  ]

  return (
    <Main route="/maintenances" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Link
          onClick={() => {
            router.visit('/maintenances')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          Back
        </Typography.Link>
        {maintenance ? maintenance.name : 'New maintenance'}
        <Button type="primary">
          Create new maintenance <PlusOutlined />
        </Button>
      </Title>

      <FormLayout
        name="maintenance"
        onFinish={() => {}}
        onCancel={() => {
          router.visit('/maintenances')
        }}
        initialValues={{
          name: maintenance ? maintenance.name : '',
          details: maintenance ? maintenance.details : '',
          date: maintenance ? maintenance.date : '',
        }}
      >
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item<Maintenance> {...formItemLayout} name="name" label={i18n.t('name')}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Maintenance> {...formItemLayout} name="date" label={i18n.t('date')}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<Maintenance>
              labelCol={{
               span: 2,
              }}
              wrapperCol={{
                span: 22,
              }}
              name="details"
              label={i18n.t('details')}
            >
              <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                licenseKey: '<YOUR_LICENSE_KEY>',
                initialData: '<p>Hello from CKEditor 5 in React!</p>',
            } }
        />
            </Form.Item>
          </Col>
        </Row>
      </FormLayout>
    </Main>
  )
}
