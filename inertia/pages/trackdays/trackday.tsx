import Main from '#components/layout/main'
import { Button, Typography, Row, Col, Card, theme, Image } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import SunnyIcon from '#components/icons/sunny'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'
import RainyIcon from '#components/icons/rainy'
import CloudyIcon from '#components/icons/cloudy'
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
import 'chartjs-adapter-spacetime'

import type { Chrono } from '#types/chrono'

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

const { Title } = Typography
/**
 * Show unique trackday
 */
export default function Trackday(props: { user: User; trackday: Trackday }) {
  const { token } = theme.useToken()
  const { trackday } = props

  if (!trackday.bestChrono) {
    // calcul best chrono time into chronos array
    const bestChrono = trackday.chronos.reduce((a, b) => {
      return a.lapTime < b.lapTime ? a : b
    })
    trackday.bestChrono = bestChrono.lapTime
  }

  if (!trackday.regulChrono) {
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

  return (
    <Main route="" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: token.colorBgContainer,
          // padding: 10,
          // borderRadius: token.borderRadiusLG,
        }}
        level={3}
      >
        <Typography.Link
          onClick={() => {
            window.history.back()
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          {i18n.t('back')}
        </Typography.Link>
        {trackday.track.name} - {dayjs(trackday.date).format('DD/MM/YYYY')}
        <Button type="primary" onClick={() => router.get('/trackdays/' + trackday.id + '/edit')}>
          {i18n.t('edit')}
          <EditOutlined />
        </Button>
      </Title>

      <Row gutter={16}>
        {/* Weather */}
        <Col span={12} xs={24} sm={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <p>{i18n.t('weather')}</p>
            {trackday.weather === 'sunny' ? (
              <SunnyIcon size={80} />
            ) : trackday.weather === 'cloudy' ? (
              <CloudyIcon size={80} />
            ) : (
              <RainyIcon size={80} />
            )}
          </Card>
        </Col>
        {/* Tire pressure */}
        <Col span={12} xs={24} sm={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <p>{i18n.t('tire_pressure')}</p>
            <p>{i18n.t('front') + ' : ' + trackday.tirePressureFront}</p>
            <p>{i18n.t('back') + ' : ' + trackday.tirePressureBack}</p>
          </Card>
        </Col>
        {/* Best chrono */}
        <Col span={12} xs={24} sm={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <p>{i18n.t('best_chrono')}</p>
            <p>{trackday.bestChrono}</p>
          </Card>
        </Col>

        {/* Chrono regul */}
        <Col span={12} xs={24} sm={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <p>{i18n.t('regul_chrono')}</p>
            <p>{trackday.regulChrono}</p>
          </Card>
        </Col>

        {/* Track map */}
        <Col span={24} style={{ marginTop: 20 }}>
          <Card bordered={false} style={{ height: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <p>{i18n.t('track_map')}</p>
              <Button onClick={() => router.visit(`/tracks/${trackday.track.slug}`)}>
                See map infos
              </Button>
            </div>
            <Image
              alt={trackday.track.name}
              height={250}
              width="100%"
              preview={{ bodyStyle: { backgroundColor: token.colorBgContainer } }}
              src={`/inertia/images/track_${trackday.track.slug}.svg`}
            />
          </Card>
        </Col>

        {/* Chronos chart */}
        <Col span={24} style={{ marginTop: 20 }}>
          <Card bordered={false} style={{ height: '100%' }}>
            <ChronosChart chronos={trackday.chronos} />
          </Card>
        </Col>
      </Row>
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
