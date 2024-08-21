import Nav from '#components/nav'
import { Avatar, Card, Col, Row } from 'antd'
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
import { red, orange } from '@ant-design/colors'
import { WarningOutlined } from '@ant-design/icons'

const { Meta } = Card

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

export default function Dashboard(props: any) {
  return (
    <>
      <Nav route="/dashboard" {...props}>
        <h1>Dashboard</h1>
        <Row gutter={20} style={{ marginTop: 20, marginBottom: 20 }}>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: red.at(1),
              }}
            >
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                description={'Next trackday on 14 days'}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: orange.at(1),
              }}
            >
              <WarningOutlined style={{ marginRight: 10, fontSize: 20 }} />
              {'Last maintenance 14 days'}
            </Card>
          </Col>
        </Row>
        <ChronosChart />
        <TrackdaysChart />
        <TrackChart />
      </Nav>
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
        text: 'Chronos progress',
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
        text: 'Chart.js Bar Chart',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 5, 40, 12, 75, 66],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [0, 15, 60, 80, 155, 1],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return <Bar options={options} data={data} />
}

function TrackChart() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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

  return <Doughnut data={data} />
}
