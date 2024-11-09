import i18n from '#config/i18n_react'
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd'

const buttonsStyle = { display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 24 }

export default function FormLayout(props: any) {
  const { name, onFinish, onCancel, initialValues, children } = props
  const [form] = Form.useForm()
  return (
    <Form name={name} form={form} labelWrap onFinish={onFinish} initialValues={{ initialValues }}>
      {children}

      <div style={buttonsStyle}>
        <Space>
          <Button htmlType="button" onClick={onCancel}>
            {i18n.t('cancel')}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
          >
            {i18n.t('save')}
          </Button>
        </Space>
      </div>
    </Form>
  )
}
