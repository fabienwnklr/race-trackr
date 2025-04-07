import Main from '#components/layout/main'
import dayjs from 'dayjs'

import type { Trackday } from '#types/trackday'
import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import i18n from '#config/i18n_react'
import { slugify } from '#utils/index'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card'
import { Button } from '#components/ui/button'

export default function Trackdays(props: { trackdays: Trackday[]; user: any }) {
  const { trackdays } = props
  const items = [
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
    <Main title={i18n.t('trackdays')} {...props}>
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
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {trackdays.map((td, _i) => (
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{td.track.name}</CardTitle>
                    <CardDescription>{dayjs(td.date).format('DD/MM/YYYY')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt={td.track.name}
                      style={{ width: '100%', height: '70px' }}
                      src={`resources/images/tracks/logo/${slugify(td.track.name)}.png`}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        router.get(`/trackdays/${td.id}`)
                      }}
                    >
                      {i18n.t('view')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
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
  )
}
