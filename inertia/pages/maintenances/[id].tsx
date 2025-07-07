import Main from '#components/layout/main'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Editor } from '@/components/blocks/editor-00/editor'
import dayjs from 'dayjs'

import type { User } from '#types/user'
import type { Maintenance } from '#types/maintenance'
import type { Vehicle } from '#types/vehicle'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Input } from '#components/ui/input'
import trackday from '#models/trackday'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@radix-ui/react-select'
import { fr } from 'date-fns/locale'
import { Space } from 'lucide-react'
import { Row, Button } from 'react-day-picker'
import { Tooltip } from 'recharts'
import { z } from 'zod'
import { Form } from '#components/ui/form'

const formSchema = z.object({
  maintenanceId: z.number(),
  date: z.string(),
  vehicleId: z.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  details: z.string().optional(),
})

/**
 * Show unique trackday
 */
export default function Maintenance({
  maintenance,
  userVehicles,
  ...props
}: {
  maintenance?: Maintenance
  user: User
  userVehicles: Vehicle[]
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maintenanceId: maintenance?.id ?? 0,
      date: maintenance?.date ?? '',
      vehicleId: maintenance?.vehicleId ?? undefined,
      name: maintenance?.name || '',
    },
  })
  const { i18n } = useTranslation()
  const [modalCreateVehicleOpen, setModalCreateVehicleOpen] = useState(false)
  const [details, setDetails] = useState(maintenance?.details || '')

  const onChangeContent = (content: string) => {
    setDetails(content)
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (maintenance) {
      router.put(`/maintenances/${maintenance.id}`, data)
    } else {
      router.post('/maintenances', data)
    }
  }

  const onCancel = () => {
    if (maintenance) {
      router.visit('/maintenances/' + maintenance.id)
    } else {
      router.visit('/maintenances')
    }
  }

  return (
    <Main
      title={maintenance ? i18n.t('maintenanceEdit') : i18n.t('maintenanceCreation')}
      {...props}
    >
      {/* <Modal
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
      </Modal> */}
      <Form {...form}>
        <form
          name="maintenance"
          onSubmit={form.handleSubmit((data) => {
            if (maintenance) {
              router.put(`/maintenances/${maintenance.id}`, data)
            } else {
              router.post('/maintenances', data)
            }
          })}
        >
          <div className="grid"></div>
        </form>
      </Form>
    </Main>
  )
}
