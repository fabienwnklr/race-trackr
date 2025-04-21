import Main from '#components/layout/main'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'
import { TriangleAlert } from 'lucide-react'
import type { DefaultProps } from '#types/props'
import { Head } from '@inertiajs/react'
import { Card, CardContent } from '#components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/avatar'
import { ChronoChart } from '#components/charts/chrono-chart'
import { TrackdayChart } from '#components/charts/trackday-chart'
import { TrackChart } from '#components/charts/track-chart'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
)

export default function Dashboard(props: DefaultProps) {
  const { i18n } = useTranslation()
  return (
    <>
      <Head title="Homepage" />
      <Main title={i18n.t('dashboard')} {...props}>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Card className="bg-success-light">
            <CardContent className="flex items-center justify-center">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight" />
                <AvatarFallback>user</AvatarFallback>
              </Avatar>
              {i18n.t('next_trackday_on', { days: 14 })}
            </CardContent>
          </Card>

          <Card className="bg-error-light">
            <CardContent className="flex items-center justify-center">
              <TriangleAlert style={{ marginRight: 10, fontSize: 20 }} />
              {i18n.t('last_maintenance', { days: 14 })}
            </CardContent>
          </Card>

          <Card className="bg-warning-light">
            <CardContent className="flex items-center justify-center">
              <TriangleAlert style={{ marginRight: 10, fontSize: 20 }} />
              {i18n.t('last_maintenance', { days: 14 })}
            </CardContent>
          </Card>
        </div>
        {/* grid 3 columns but if one in single on column, take 2 columns*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <ChronoChart />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <TrackdayChart />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <TrackChart />
          </div>
        </div>
      </Main>
    </>
  )
}
