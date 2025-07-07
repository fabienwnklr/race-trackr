import Main from '#components/layout/main'
import NoDataFound from '#components/no_data_found'
import { Card, CardContent } from '#components/ui/card'
import type { UserVehicle } from '#types/user_vehicle'
import { router } from '@inertiajs/react'
import { Delete, Edit, Eye, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function UserVehicles(props: { user: any; userVehicles: UserVehicle[] }) {
  const { i18n } = useTranslation()
  const { userVehicles } = props

  // const deleteUserVehicle = (userVehicle: UserVehicle) => {
  //   Modal.confirm({
  //     ...modalConfigDelete(i18n, userVehicle.name),
  //     onOk: () => {
  //       router.delete('/user-vehicles/' + userVehicle.id)
  //     },
  //   })
  // }

  return (
    <Main create title={i18n.t('userVehicles')} {...props}>
      {userVehicles.length ? (
        <div className="grid">
          {userVehicles.map((userVehicle, i) => (
            <Card>
              <CardContent>
                {userVehicle.name}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </Main>
  )
}
