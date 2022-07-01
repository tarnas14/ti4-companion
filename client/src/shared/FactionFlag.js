import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import { usePlasticColors } from './plasticColors'
import { FactionImage } from './FactionImage'

const useFlagStyles = makeStyles({
  root: {
    width: ({ width }) => `calc(${width} - 2px)`,
    height: ({ height }) => `calc(${height} - 2px)`,
    backgroundColor: ({ selected }) =>
      `rgba(255, 255, 255, ${selected ? '0.9' : '0.3'})`,
    borderRadius: '7%',
    cursor: ({ disabled }) => (disabled ? 'default' : 'pointer'),
    display: 'flex',
    justifyContent: 'center',
    border: ({ plasticColor }) =>
      plasticColor ? `2px solid ${plasticColor}` : '',
    margin: '1px 1px',
  },
  factionImage: {
    opacity: ({ selected }) => (selected ? 1 : 0.6),
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain',
    backgroundRepeat: 'none',
  },
})

function FactionFlag(
  { disabled, factionKey, selected, onClick, width, height, className },
  ref,
) {
  const { t } = useTranslation()
  const getPlasticColor = usePlasticColors()
  const plasticColor = getPlasticColor(factionKey)
  const classes = useFlagStyles({
    selected,
    width,
    height,
    disabled,
    plasticColor: plasticColor?.hex,
  })

  return (
    <div
      ref={ref}
      className={clsx(classes.root, className)}
      onClick={disabled ? undefined : onClick}
    >
      <FactionImage
        className={classes.factionImage}
        factionKey={factionKey}
        title={`${t(`factions.${factionKey}.name`)} ${
          plasticColor
            ? `(${t(`general.labels.colors.${plasticColor.color}`)})`
            : ''
        }`}
      />
    </div>
  )
}

export default React.forwardRef(FactionFlag)
