import * as React from 'react'
import Main from '#components/layout/main'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import type { Track } from '#types/track'
import { format } from 'date-fns'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/ui/popover'
import { Calendar } from '#components/ui/calendar'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()
  const { trackday, tracks } = props
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackId: trackday?.id ?? 0,
      date: trackday?.date ?? '',
    },
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (trackday) {
      router.post(`/trackdays/${trackday.id}/update`, data)
    } else {
      router.post('/trackdays/create', data)
    }
  }

  return (
    <Main title={trackday ? i18n.t('editTrackday') : i18n.t('createTrackday')} {...props}>
      <Form {...form}>
        <form name="createTrackday" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="trackId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('track')}</FormLabel>
                <Select required defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.t('track')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {trackOptions.map((track, index) => (
                      <SelectItem key={index} value={track.value?.toString()}>
                        {track.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{i18n.t('trackdayDate')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Form.Item<Trackday> {...formItemLayout} label={i18n.t('weather')} name="weather">
              <Select options={weatherOptions} />
            </Form.Item>


            <Form.Item<Trackday> {...formItemLayout} label={i18n.t('details')} name="details">
              <Input.TextArea />
            </Form.Item>

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
            </Form.List> */}

          <div className="grid grid-cols-8 gap-4 mt-5">
            <Button type="button" variant="outline" onClick={onCancel}>
              {i18n.t('cancel')}
            </Button>
            <Button
              type="submit"
              // disabled
            >
              {i18n.t('save')}
            </Button>
          </div>
        </form>
      </Form>
    </Main>
  )
}
