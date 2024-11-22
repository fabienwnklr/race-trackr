import i18n from '#config/i18n_react'
import { Button, Form, Space } from 'antd'

const buttonsStyle = { display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 24 }

export default function FormLayout(props: {
  onFinish: (fiels: any) => void
  onCancel: () => void
  initialValues?: any
  name: string
  children: React.ReactNode
}) {
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
          <Button type="primary" htmlType="submit">
            {i18n.t('save')}
          </Button>
        </Space>
      </div>
    </Form>
  )
}
