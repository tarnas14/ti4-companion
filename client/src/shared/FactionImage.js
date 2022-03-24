import { useTranslation } from 'react-i18next'

import * as factions from '../gameInfo/factions'

export function FactionImage({ factionKey, ...props }) {
  const factionData = factions.getData(factionKey)
  const { t } = useTranslation()

  return (
    <img
      alt={factionKey}
      src={factionData.image}
      title={t(`factions.${factionKey}.name`)}
      {...props}
    />
  )
}