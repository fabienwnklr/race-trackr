import Main from '#components/layout/main'
import i18n from '#config/i18n_react'
import { router } from '@inertiajs/react'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park, Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export default function ApiKey(props: any) {
  return (
    <Main {...props}>
      <Typography.Title
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        level={3}
      >
        {i18n.t('apiKeys')}
        <Button type="primary" onClick={() => router.visit('/admin/tracks/create')}>
          {i18n.t('createApiKey')} <PlusOutlined />
        </Button>
      </Typography.Title>
      <Table columns={columns} dataSource={data} />
    </Main>
  )
}
