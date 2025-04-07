import Main from '#components/layout/main'
import { router } from '@inertiajs/react'
import type { Track } from '#types/track'
import { PropsWithChildren } from 'react'
import i18n from '#config/i18n_react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '#components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '#components/ui/input'
import { Button } from '#components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select'
import { Textarea } from '#components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'country must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'city must be at least 2 characters.',
  }),
  adress: z.string().min(2, {
    message: 'adress must be at least 2 characters.',
  }),
  length: z.string().min(2, {
    message: 'length must be at least 2 characters.',
  }),
  bestLapTime: z.string().min(2, {
    message: 'bestLapTime must be at least 2 characters.',
  }),
  bestLapTimePilote: z.string().min(2, {
    message: 'bestLapTimePilote must be at least 2 characters.',
  }),
  infos: z.string().min(2, {
    message: 'infos must be at least 2 characters.',
  }),
})

export default function CreateAdminTrack(
  props: PropsWithChildren & { user: any; track: Track | null; errors?: string; success?: string }
) {
  const { track} = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: track?.name || '',
      country: track?.country || '',
    },
  })

  const onCancel = () => {
    router.visit('/admin/tracks')
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (track) {
      router.post(`/admin/tracks/${track.slug}/update`, values)
    } else {
      router.post('/admin/tracks/create', values)
    }
  }

  return (
    <Main title={i18n.t('adminTracks')} {...props}>
      <h1 className="text-2xl font-bold flex justify-between items-center">
        Admin - {track ? i18n.t('editTrack') : i18n.t('createTrack')}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('name')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={i18n.t('name')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('country')}</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('city')}</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder={i18n.t('selectCity')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paris">Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('adress')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={i18n.t('adress')} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('length')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={i18n.t('length')} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bestLapTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('bestLapTime')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={i18n.t('bestLapTime')} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bestLapTimePilote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('bestLapTimePilote')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={i18n.t('bestLapTimePilote')} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="infos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t('infos')}</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder={i18n.t('infos')} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel}>
              {i18n.t('cancel')}
            </Button>
            <Button type="submit">{i18n.t('save')}</Button>
          </div>
        </form>
      </Form>
    </Main>
  )
}
