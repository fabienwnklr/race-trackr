import Main from '#components/layout/main'
import dayjs from 'dayjs'

import type { Trackday } from '#types/trackday'
import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import { slugify } from '#utils/index'


export default function Trackdays(props: { trackdays: Trackday[]; user: any }) {
  const { token } = theme.useToken()
  const { trackdays } = props
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]
  return (
    <>
      <Main {...props}>
        <Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          level={3}
          ellipsis
        >
          {i18n.t('trackdays')}
          <Button
            type="primary"
            onClick={() => {
              router.visit('/trackdays/create')
            }}
          >
            {i18n.t('createTrackday')} <PlusOutlined />
          </Button>
        </Title>

        {trackdays.length ? (
          <>
            {/* <Flex style={{ marginBottom: 20 }} justify="space-between">
              <Flex>
                <Radio.Group defaultValue="a">
                  <Tooltip title="Grid view">
                    <Radio.Button value="a">
                      <MainOutlined />
                    </Radio.Button>
                  </Tooltip>
                  <Tooltip title="List view">
                    <Radio.Button value="b">
                      <UnorderedListOutlined />
                    </Radio.Button>
                  </Tooltip>
                </Radio.Group>
              </Flex>
              <Input.Search style={{ width: 300 }} placeholder={i18n.t('search')} />

              <Flex gap={'small'}>
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Button>
                    <SortIcon />
                  </Button>
                </Dropdown>
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Button>
                    <FilterOutlined style={{ fontSize: 20 }} />
                  </Button>
                </Dropdown>
              </Flex>
            </Flex> */}
            <Row gutter={30}>
              {trackdays.map((td, i) => (
                <Col
                  key={i}
                  span={8}
                  xs={24}
                  sm={12}
                  md={8}
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <Card
                    onClick={() => {
                      router.get(`/trackdays/${td.id}`)
                    }}
                    hoverable
                    style={{ width: '100%', padding: 10 }}
                    cover={
                      <img
                        alt={td.track.name}
                        style={{ width: '100%', height: '70px' }}
                        src={`resources/images/tracks/logo/${slugify(td.track.name)}.png`}
                      />
                    }
                  >
                    <Meta title={td.track.name} description={dayjs(td.date).format('DD/MM/YYYY')} />
                  </Card>
                </Col>
              ))}
            </Row>
            {/* <Pagination
              align="center"
              total={trackdays.length}
              showSizeChanger
              showQuickJumper
              defaultPageSize={50}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            /> */}
          </>
        ) : (
          <NoDataFound />
        )}
      </Main>
    </>
  )
}
