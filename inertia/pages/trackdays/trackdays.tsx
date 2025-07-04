import Main from '#components/layout/main'
import dayjs from 'dayjs'

import type { Trackday } from '#types/trackday'
import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
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
import { useTranslation } from 'react-i18next'

export default function Trackdays(props: { trackdays: Trackday[]; user: any }) {
  const { i18n } = useTranslation()
  const { trackdays } = props
  return (
    <Main title={i18n.t('trackdays')} {...props}>
      {trackdays.length ? (
        <>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {trackdays.map((td, i) => (
              <div key={i}>
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
