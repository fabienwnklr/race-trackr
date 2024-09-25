import locale from '#config/i18n_react'

// Create constant for assign a default value if data is null
export const defaultData = 'N/R'

export function modalConfigDelete(i18n: typeof locale) {
  return {
    centered: true,
    title: i18n.t('deleteTrackday'),
    content: i18n.t('deleteTrackdayConfirm'),
    cancelText: i18n.t('cancel'),
    okButtonProps: {
      danger: true,
    },
    okText: i18n.t('delete'),
  }
}
