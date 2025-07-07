import * as React from 'react'
import Main from '#components/layout/main'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import type { Track } from '#types/track'
import { format, set, setDefaultOptions } from 'date-fns'
import { fr } from 'date-fns/locale'
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
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/ui/popover'
import { Calendar } from '#components/ui/calendar'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#components/ui/command'

const formSchema = z.object({
  trackId: z.number(),
  date: z.string(),
  weather: z.string(),
  details: z.string(),
  chronos: z.array(z.string()),
  bestChrono: z.string(),
  regulChrono: z.string(),
})

export default function CreateTrackDay({
  trackday,
  tracks,
  ...props
}: {
  user: User
  trackday?: Trackday
  tracks: Track[]
}) {
  const [trackPopoverOpen, setTrackPopoverOpen] = React.useState(false)
  const [trackValue, setTrackValue] = React.useState<string | null>(trackday?.track?.name || null)
  const { i18n } = useTranslation()
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackId: trackday?.id ?? 0,
      date: trackday?.date ?? '',
      weather: trackday?.weather ?? '',
      details: trackday?.details ?? '',
      chronos: trackday?.chronos?.map((chrono) => chrono.toString()) || [],
      bestChrono: trackday?.bestChrono || '',
      regulChrono: trackday?.regulChrono || '',
    },
  })

  setDefaultOptions({ locale: fr })

  const weatherOptions = [
    { value: 'sunny', label: i18n.t('sunny') },
    { value: 'cloudy', label: i18n.t('cloudy') },
    { value: 'rainy', label: i18n.t('rainy') },
  ]

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
    <Main
      title={trackday ? i18n.t('trackdayEdit') : i18n.t('trackdayCreation')}
      {...props}
    >
      <Form {...form}>
        <form name="createTrackday" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid">
            <FormField
              control={form.control}
              name="trackId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>{i18n.t('track')}</FormLabel>
                  <Popover open={trackPopoverOpen} onOpenChange={setTrackPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={trackPopoverOpen}
                        className="w-[300px] justify-between"
                      >
                        {trackValue
                          ? tracks.find((track) => track.name === trackValue)?.name
                          : i18n.t('selectTrack')}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder={i18n.t('search')} />
                        <CommandList>
                          <CommandEmpty>{i18n.t('noTracks')}</CommandEmpty>
                          <CommandGroup>
                            {tracks.map((track) => (
                              <CommandItem
                                key={track.id}
                                value={track.name}
                                onSelect={(currentValue) => {
                                  setTrackValue(
                                    tracks.find((track) => track.name === currentValue)?.name ||
                                      null
                                  )
                                  setTrackPopoverOpen(false)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    trackValue === track.name ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {track.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.t('date')}</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>{i18n.t('pickDate')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} locale={fr} />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weather"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>{i18n.t('weather')}</FormLabel>
                  <Select required defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={i18n.t('weather')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weatherOptions.map((weather, index) => (
                        <SelectItem key={index} value={weather.value}>
                          {weather.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>{i18n.t('details')}</FormLabel>
                  <FormControl>
                    <textarea
                      className="resize-none w-full h-32 border border-gray-300 rounded-md p-2"
                      placeholder={i18n.t('details')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
