import locale from '#config/i18n_react'
import type { ModalFuncProps } from 'antd'

// Create constant for assign a default value if data is null
export const defaultData = 'N/R'

export function modalConfigDelete(i18n: typeof locale): Partial<ModalFuncProps> {
  return {
    ...modalConfig(i18n),
    title: i18n.t('deleteTrackday'),
    content: i18n.t('deleteTrackdayConfirm'),
    okText: i18n.t('delete'),
    okButtonProps: {
      danger: true,
    },
  }
}

export function modalConfig(i18n: typeof locale): Partial<ModalFuncProps> {
  return {
    centered: true,
    closable: true,
    okText: i18n.t('ok'),
    cancelText: i18n.t('cancel'),
  }
}
