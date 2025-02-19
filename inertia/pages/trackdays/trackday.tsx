import Main from '#components/layout/main'
import {
  Button,
  Typography,
  Row,
  Col,
  Card,
  theme,
  Image,
  Dropdown,
  MenuProps,
  Space,
  Modal,
} from 'antd'
import {
  LeftOutlined,
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons'
import SunnyIcon from '#components/icons/sunny'
import { router } from '@inertiajs/react'
import type { User } from '#types/user'
import type { Trackday } from '#types/trackday'
import i18n from '#config/i18n_react'
import dayjs from 'dayjs'
import RainyIcon from '#components/icons/rainy'
import CloudyIcon from '#components/icons/cloudy'
import ChronoIcon from '#components/icons/chrono'
import { cleanFalsyValues, convertToChronoFormat, convertToMilliseconds } from '#utils/index'
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
import TirePressureIcon from '#components/icons/tire_pressure'
import { Line } from 'react-chartjs-2'
import type { Chrono } from '#types/chrono'
import type { ItemType } from 'antd/es/menu/interface'
import { defaultData, modalConfig, modalConfigDelete } from '../../../constants'
import { NoWeatherIcon } from '#components/icons/no_weather'

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

  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e)
  }

  const dropdownItems: ItemType[] = [
    {
      key: 'delete',
      label: i18n.t('deleteTrackday'),
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        Modal.confirm({
          ...modalConfigDelete(i18n),
          onOk: () => {
            router.delete('/trackdays/' + trackday.id)
          },
        })
      },
    },
    {
      key: 'export',
      label: i18n.t('exportTrackday'),
      icon: <CloudDownloadOutlined />,
      onClick: () => {
        router.get('/trackdays/' + trackday.id + '/export')
      },
    },
  ]

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
            router.visit('/trackdays')
          }}
        >
          <LeftOutlined style={{ marginRight: 5 }} />
          {i18n.t('back')}
        </Typography.Link>
        {trackday.track.name} - {dayjs(trackday.date).format('DD/MM/YYYY')}
        {/* Actions */}
        <Space wrap>
          <Dropdown.Button
            type="primary"
            trigger={['click']}
            onClick={() => router.get('/trackdays/' + trackday.id + '/edit')}
            menu={{ items: dropdownItems, onClick: onMenuClick }}
          >
            {i18n.t('edit')}
            <EditOutlined />
          </Dropdown.Button>
        </Space>
      </Title>

      <Row gutter={[16, 16]}>
        {/* Weather */}
        <Col span={12} xs={24} sm={6}>
          <Card title={i18n.t('weather')} bordered={false} style={{ height: '100%' }}>
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
        </Col>
        {/* Best chrono */}
        <Col span={12} xs={24} sm={6}>
          <Card
            styles={{
              title: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              body: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
            // title={
            //   <>
            //     {i18n.t('bestLapTime')}
            //     <ChronoIcon size={30} />
            //   </>
            // }
            bordered={false}
            style={{ height: '100%' }}
          >
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
        </Col>

        {/* Chrono regul */}
        <Col xs={24} sm={6}>
          <Card title={i18n.t('regulLapTime')} bordered={false} style={{ height: '100%' }}>
            <p>{trackday.regulChrono ?? defaultData}</p>
          </Card>
        </Col>

        {/* Details */}
        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ height: '100%' }}>
            <p>{i18n.t('details')}</p>
            {trackday.details}
          </Card>
        </Col>
        {/* Track map */}
        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ height: '100%' }}>
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
                onClick={() =>
                  Modal.info({
                    ...modalConfig(i18n),
                    title: trackday.track.name,
                  })
                }
              >
                {i18n.t('trackInfos')}
                <InfoCircleOutlined />
              </Button>
            </div>
            <Image
              alt={trackday.track.name}
              preview={{ styles: { body: { backgroundColor: token.colorBgContainer } } }}
              src={`/resources/images/tracks/layout/${trackday.track.slug}.svg`}
            />
          </Card>
        </Col>

        {/* Chronos chart */}
        <Col span={24}>
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
