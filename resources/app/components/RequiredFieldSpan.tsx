import { useTranslation } from 'react-i18next'

const RequiredFieldSpan: React.FC = () => {
  const { t } = useTranslation()
  return (
    <span className={'text-xs'}>
      (<span className={'text-red-700'}> *</span> {t('common:required_fields_to_be_filled')} )
    </span>
  )
}
export default RequiredFieldSpan
