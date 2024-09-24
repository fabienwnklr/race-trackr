import Main from '#components/layout/main'
import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Row,
  Col,
  Space,
  DatePicker,
  ConfigProvider,
} from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import i18n from '#config/i18n_react'
import locale from 'antd/locale/fr_FR'

import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import type { Track } from '#types/track'
import dayjs from 'dayjs'

const { Title } = Typography

const buttonsStyle = { display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 24 }

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

locale.DatePicker = {
  lang: {
    locale: 'fr_FR',
    placeholder: 'Sélectionner une date',
    rangePlaceholder: ['Date de début', 'Date de fin'],
    today: "Aujourd'hui",
    now: 'Maintenant',
    backToToday: "Retour à aujourd'hui",
    ok: 'OK',
    clear: 'Effacer',
    month: 'Mois',
    year: 'Année',
    timeSelect: "Sélectionner l'heure",
    dateSelect: 'Sélectionner une date',
    monthSelect: 'Choisir un mois',
    yearSelect: 'Choisir une année',
    decadeSelect: 'Choisir une décennie',
    yearFormat: 'YYYY',
    dateFormat: 'JJ/MM/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'JJ/MM/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Mois précédent (PageUp)',
    nextMonth: 'Mois suivant (PageDown)',
    previousYear: 'Année dernière (Control + gauche)',
    nextYear: 'Année prochaine (Control + droite)',
    previousDecade: 'Décennie précédente',
    nextDecade: 'Décennie suivante',
    previousCentury: 'Siècle dernier',
    nextCentury: 'Siècle suivant',
    shortWeekDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    shortMonths: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ],
  },
  timePickerLocale: {
    placeholder: "Sélectionner l'heure",
  },
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
  weekFormat: 'wo/YYYY',
  monthFormat: 'MM/YYYY',
}

export default function CreateTrackDay(props: {
  user: User
  trackday?: Trackday
  tracks: Track[]
}) {
  const { trackday, tracks } = props
  const [form] = Form.useForm()

  const trackOptions = tracks.map((track) => ({
    value: track.id,
    label: track.name,
  }))

  const onCancel = () => {
    window.history.back()
  }

  const onSubmit = (values: Trackday) => {
    if (trackday) {
      router.post(`/trackdays/${trackday.id}/update`, values)
    } else {
      router.post('/trackdays/create', values)
    }
  }

  return (
    <Main route="" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 34,
        }}
        level={3}
      >
        {trackday
          ? `${trackday.track.name} - ${dayjs(trackday.date).format(locale.DatePicker?.dateFormat)}`
          : i18n.t('createTrackday')}
      </Title>

      <Form
        name="createTrackday"
        form={form}
        labelWrap
        onFinish={onSubmit}
        initialValues={{
          trackId: trackday?.trackId,
          date: trackday?.date ? dayjs(trackday?.date).valueOf() : undefined,
        }}
      >
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item<Trackday>
              {...formItemLayout}
              label={i18n.t('track')}
              name="trackId"
              rules={[{ required: true, message: i18n.t('validation:track_required') }]}
            >
              <Select showSearch optionFilterProp="label" options={trackOptions} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday>
              {...formItemLayout}
              label={i18n.t('date')}
              name="date"
              rules={[{ required: true, message: i18n.t('validation:date_required') }]}
              getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={locale.DatePicker?.dateFormat}
                locale={locale.DatePicker}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('weather')} name="weather">
              <Select />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('tire_pressure')}>
              <Form.Item
                name="tirePressureFront"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="Avant" type="number" step={0.1} />
              </Form.Item>
              <Form.Item
                name="tirePressureBack"
                style={{ display: 'inline-block', width: 'calc(50%)', marginLeft: '8px' }}
              >
                <Input placeholder="Arrière" type="number" step={0.1} />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('details')} name="details">
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="chronos">
              {(fields, { add, remove }, { errors }) => (
                <>
                  <Form.Item
                    label={i18n.t('chronos')}
                    labelCol={{ xs: { span: 2 }, sm: { span: 2 } }}
                    wrapperCol={{ xs: { span: 24 }, sm: { span: 24 } }}
                    tooltip={i18n.t('chronos_tooltip')}
                  >
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          message: 'Please input chrono or delete this field.',
                        },
                      ]}
                    >
                      <Input placeholder="1'32'122" />
                    </Form.Item>
                  </Form.Item>
                  {fields.map((field, _index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input chrono or delete this field.',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="chrono" />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      style={{ width: '100%' }}
                      icon={<PlusOutlined />}
                    >
                      {i18n.t('add_chrono')}
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
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
              disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
              {i18n.t('save')}
            </Button>
          </Space>
        </div>
      </Form>
    </Main>
  )
}
