import Main from '#components/layout/main'
import SunnyIcon from '#components/icons/sunny'
import { router } from '@inertiajs/react'
import { format } from 'date-fns'

import i18n from '#config/i18n_react'
import RainyIcon from '#components/icons/rainy'
import CloudyIcon from '#components/icons/cloudy'
import ChronoIcon from '#components/icons/chrono'
import { convertToChronoFormat, convertToMilliseconds } from '#utils/index'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Chrono } from '#types/chrono'
import { defaultData } from '../../../constants'
import { NoWeatherIcon } from '#components/icons/no_weather'
import { Trash2Icon, DownloadIcon, EllipsisIcon, InfoIcon } from 'lucide-react'
import { Button } from '#components/ui/button'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Card } from '#components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#components/ui/dropdown-menu'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
)

/**
 * Show unique trackday
 */
export default function Trackday(props: { user: User; trackday: Trackday }) {
  const { trackday } = props

  if (!trackday.bestChrono && trackday.chronos.length > 0) {
    // calcul best chrono time into chronos array
    const bestChrono = trackday.chronos.reduce((a, b) => {
      return a.lapTime < b.lapTime ? a : b
    })
    trackday.bestChrono = bestChrono.lapTime
  }

  if (!trackday.regulChrono && trackday.chronos.length > 0) {
    // Calcul de la somme des temps de tour (lapTime) avec la fonction reduce
    let totalLapTime = 0

    for (let i = 0; i < trackday.chronos.length; i++) {
      totalLapTime += convertToMilliseconds(trackday.chronos[i].lapTime)
    }

    // Calcul de la moyenne
    const averageLapTimeMs = Math.round(totalLapTime / trackday.chronos.length)
    const averageChrono = convertToChronoFormat(averageLapTimeMs)

    trackday.regulChrono = averageChrono
  }

  const dropdownItems = [
    {
      key: 'delete',
      label: i18n.t('deleteTrackday'),
      icon: <Trash2Icon className="text-red-500" />,
      danger: true,
      onClick: () => {
        // Modal.confirm({
        //   ...modalConfigDelete(i18n),
        //   onOk: () => {
        //     router.delete('/trackdays/' + trackday.id)
        //   },
        // })
      },
    },
    {
      key: 'export',
      label: i18n.t('exportTrackday'),
      icon: <DownloadIcon />,
      onClick: () => {
        router.get('/trackdays/' + trackday.id + '/export')
      },
    },
  ]

  return (
    <Main title={i18n.t('trackday')} {...props}>
      <div className="flex justify-between items-center mb-4">
        <h1>{i18n.t('trackday_of', { date: format(trackday.date, 'dd/MM/yyyy') })}</h1>

        <div className="flex">
          <Button
            className="rounded-r-none border-r-1 border-white"
            onClick={() => router.get('/trackdays/' + trackday.id + '/edit')}
          >
            {i18n.t('edit')}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-l-none">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* loop on dropdownItems */}
              {dropdownItems.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  onClick={item.onClick}
                  className={item.danger ? 'text-red-500' : ''}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Weather */}

        <Card className="">
          {trackday.weather === 'sunny' ? (
            <SunnyIcon size={100} />
          ) : trackday.weather === 'cloudy' ? (
            <CloudyIcon size={100} />
          ) : trackday.weather === 'rainy' ? (
            <RainyIcon size={100} />
          ) : (
            <NoWeatherIcon size={100} />
          )}
        </Card>
        {/* Best chrono */}
        <Card>
          <ChronoIcon size={100} />
          <p>{i18n.t('bestLapTime') + ' ' + (trackday.bestChrono ?? defaultData)}</p>
          <Button
            style={{
              marginTop: 20,
            }}
          >
            {i18n.t('showMyChronos')}
          </Button>
        </Card>

        {/* Chrono regul */}
        <Card>
          <p>{trackday.regulChrono ?? defaultData}</p>
        </Card>

        {/* Details */}
        <Card className="col-span-3">
          <p>{i18n.t('details')}</p>
          {trackday.details}
        </Card>
        {/* Track map */}
        <Card className="col-span-3">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <p>
              {trackday.track.name} - {i18n.t('trackMap')}
            </p>
            <Button
            // onClick={() =>
            // Modal.info({
            //   ...modalConfig(i18n),
            //   title: trackday.track.name,
            // })
            // }
            >
              {i18n.t('trackInfos')}
              <InfoIcon />
            </Button>
          </div>
          <Zoom>
            <img
              src={`/resources/images/tracks/layout/${trackday.track.slug}.svg`}
              alt={trackday.track.name}
              className="w-full h-auto"
            />
          </Zoom>
        </Card>

        {/* Chronos chart */}
        <Card className="col-span-3">
          <ChronosChart chronos={trackday.chronos} />
        </Card>
      </div>
    </Main>
  )
}

function ChronosChart({ chronos }: { chronos: Chrono[] }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: i18n.t('chronos'),
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tours',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  }
  const labels = chronos.map((_chrono, index) => {
    return index + 1
  })
  const chronosData = chronos.map((chrono, index) => {
    return {
      x: index + 1,
      // need to slice millisecond otherwise data doesn't display
      y: chrono.lapTime.slice(0, 4),
    }
  })

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: chronosData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
    ],
  }

  return <Line options={options} data={data} />
}
