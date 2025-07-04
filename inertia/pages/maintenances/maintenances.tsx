import Main from '#components/layout/main'

import { router } from '@inertiajs/react'
import NoDataFound from '#components/no_data_found'
import dayjs from 'dayjs'

import type { Maintenance } from '#types/maintenance'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardTitle } from '#components/ui/card'

export default function Maintenances(props: { user: any; maintenances: Maintenance[] }) {
  const { i18n } = useTranslation()
  const { maintenances } = props

  return (
    <Main title={i18n.t('maintenances')} {...props}>
      {maintenances.length ? (
        <div className="grid">
          {maintenances.map((maintenance, i) => (
            <Card>
              <CardHeader>
                <CardTitle title={i18n.t('vehicle') + ' : ' + maintenance.vehicle.name} />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </Main>
  )
}
