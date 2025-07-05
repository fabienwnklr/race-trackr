import Main from '#components/layout/main'
import NoDataFound from '#components/no_data_found'

import type { Maintenance } from '#types/maintenance'
import { useTranslation } from 'react-i18next'
import { Card, CardDescription, CardHeader, CardTitle } from '#components/ui/card'

export default function Maintenances(props: { user: any; maintenances: Maintenance[] }) {
  const { i18n } = useTranslation()
  const { maintenances } = props

  return (
    <Main title={i18n.t('maintenances')} {...props}>
      {maintenances.length ? (
        <div className="grid">
          {maintenances.map((maintenance, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle title={i18n.t('vehicle') + ' : ' + maintenance.vehicle.name} />
              </CardHeader>
              <CardDescription>
                {i18n.t('date') + ' : ' + new Date(maintenance.date).toLocaleDateString()}
              </CardDescription>
            </Card>
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </Main>
  )
}
