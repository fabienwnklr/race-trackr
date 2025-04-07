import Main from '#components/layout/main'
import { router } from '@inertiajs/react'
import i18n from '#config/i18n_react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import type { Track } from '#types/track'
import dayjs from 'dayjs'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  trackId: z.number(),
  date: z.string(),
  weather: z.string(),
  details: z.string(),
  chronos: z.array(z.string()),
  bestChrono: z.string(),
  regulChrono: z.string(),
})

export default function CreateTrackDay(props: {
  user: User
  trackday?: Trackday
  tracks: Track[]
}) {
  const { trackday, tracks } = props
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const weatherOptions = [
    { value: 'sunny', label: i18n.t('sunny') },
    { value: 'cloudy', label: i18n.t('cloudy') },
    { value: 'rainy', label: i18n.t('rainy') },
  ]

  const trackOptions = tracks.map((track) => ({
    value: track.id,
    label: track.name,
  }))

  const onCancel = () => {
    if (trackday) {
      router.visit('/trackdays/' + trackday.id)
    } else {
      router.visit('/trackdays')
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trackday = new FormData(e.target as HTMLFormElement) as unknown as Trackday
    if (trackday) {
      router.post(`/trackdays/${trackday.id}/update`, trackday)
    } else {
      router.post('/trackdays/create', trackday)
    }
  }

  return (
    <Main title={trackday ? i18n.t('editTrackday') : i18n.t('createTrackday')} {...props}>
      <Form {...form}></Form>
      <form name="createTrackday" onSubmit={onSubmit}>
        <div>
          <div>
            <Form.Item<Trackday>
              {...formItemLayout}
              label={i18n.t('track')}
              name="trackId"
              rules={[{ required: true, message: i18n.t('validation:track_required') }]}
            >
              <Select showSearch optionFilterProp="label" options={trackOptions} />
            </Form.Item>
          </div>

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
                format={locale.DatePicker?.lang.dateFormat}
                locale={locale.DatePicker}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('weather')} name="weather">
              <Select options={weatherOptions} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('details')} name="details">
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.List name="chronos">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      required={false}
                      key={field.key}
                      label={index === 0 && !trackday?.chronos?.length ? i18n.t('chrono') : ''}
                      {...(index === 0 && !trackday?.chronos?.length
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                    >
                      <Form.Item
                        key={field.key}
                        name={field.name}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            message: i18n.t('validation:chrono_required'),
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!/^\d+\.\d{1,2}(\.\d{1,3})?$/.test(value)) {
                                return Promise.reject(
                                  new Error(i18n.t('validation:chrono_invalid'))
                                )
                              }

                              if (!value || getFieldValue('chronos').includes(value)) {
                                return Promise.resolve()
                              }

                              return Promise.reject(new Error('test'))
                            },
                          }),
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder={i18n.t('chrono')}
                          style={{ width: '50%', marginRight: 8 }}
                        />
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
      </form>
    </Main>
  )
}
