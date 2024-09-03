import { Button, Space, Table, Typography } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Main from '#components/layout/main'

const { Title } = Typography

interface DataType {
  key: React.Key
  track: string
  chrono: string
  date: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Track',
    dataIndex: 'track',
    filters: [
      {
        text: 'Nogaro',
        value: 'Nogaro',
      },
      {
        text: 'Pau Arnos',
        value: 'Pau Arnos',
      },
      {
        text: 'Motorland Aragon',
        value: 'Motorland Aragon',
      },
    ],
    filterMode: 'menu',
    filterSearch: true,
    onFilter: (value, record) => record.track.startsWith(value as string),
    width: '30%',
  },
  {
    title: 'Chrono',
    dataIndex: 'chrono',
    sorter: (a, b) => Number(a.chrono) - Number(b.chrono),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    onFilter: (value, record) => record.date.startsWith(value as string),
    filterSearch: true,
    width: '20%',
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: 'Action',
    key: 'action',
    width: '15%',
    render: (_) => (
      <Space size="middle">
        <Button>Edit</Button>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    track: 'Nogaro',
    chrono: '1.50.21',
    date: '04/09/2024',
  },
  {
    key: '2',
    track: 'Pau Arnos',
    chrono: '1.42.21',
    date: '03/09/2024',
  },
  {
    key: '3',
    track: 'Nogaro',
    chrono: '1.50.21',
    date: '01/09/2024',
  },
  {
    key: '4',
    track: 'Motorland Aragon',
    chrono: '1.35.21',
    date: '04/09/2024',
  },
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

export default function Chronos(props: any) {
  return (
    <Main route="/chronos" {...props}>
      <Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Chronos
        <Button type="primary">
          Add new chrono <PlusOutlined />
        </Button>
      </Title>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </Main>
  )
}
