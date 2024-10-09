import Main from '#components/layout/main'
import { Avatar, Card, Col, theme, Row } from 'antd'
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
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { WarningOutlined } from '@ant-design/icons'
import i18n from '#config/i18n_react'
import type { DefaultProps } from '#types/props'
import { Head } from '@inertiajs/react'

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
  const {
    token: { colorSuccessBg, colorWarningBg },
  } = theme.useToken()
  console.log(props)
  return (
    <>
      <Head title="Homepage" />
      <Main route="/dashboard" {...props}>
        <h1>{i18n.t('dashboard')}</h1>
        <Row gutter={20} style={{ marginTop: 20, marginBottom: 20 }}>
          <Col span={12} sm={8} md={8}>
            <Card
              style={{
                backgroundColor: colorSuccessBg,
              }}
            >
              <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight" />
              {i18n.t('next_trackday_on', { days: 14 })}
              <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: colorWarningBg,
              }}
            >
              <WarningOutlined style={{ marginRight: 10, fontSize: 20 }} />
              {i18n.t('last_maintenance', { days: 14 })}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: colorWarningBg,
              }}
            >
              <WarningOutlined style={{ marginRight: 10, fontSize: 20 }} />
              {i18n.t('last_maintenance', { days: 14 })}
            </Card>
          </Col>
        </Row>
        <ChronosChart />
        <TrackdaysChart />
        <TrackChart />
      </Main>
    </>
  )
}

function ChronosChart() {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: i18n.t('chronos'),
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: 'Nogaro',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Pau arnos',
        data: [20, 11, 15, 30, 3],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  }

  return <Line options={options} data={data} />
}

function TrackdaysChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: i18n.t('trackdays'),
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: '2022',
        data: [0, 10, 12, 4, 42, 30],
        backgroundColor: 'rgba(142, 55, 42, 0.5)',
      },
      {
        label: '2023',
        data: [0, 5, 40, 12, 75, 66],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '2024',
        data: [0, 15, 60, 80, 155, 1],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return <Bar options={options} data={data} />
}

function TrackChart() {
  const data = {
    labels: ['Nogaro', 'Aragon', 'Pau Arnos', 'Le Mans', 'Navarra', 'Barcelone'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: i18n.t('tracks'),
      },
    },
  }

  return <Doughnut options={options} data={data} />
}
