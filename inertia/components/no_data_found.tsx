import { useTranslation } from "react-i18next"

export default function NoDataFound() {
  const { i18n } = useTranslation()
  return (
    <div className="w-full flex items-center flex-wrap justify-center gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {i18n.t("error:noDataFound")}
        </h1>
        <p className="text-gray-600">
          {i18n.t("error:noDataFoundDescription")}
        </p>
      </div>
    </div>
  )
}
