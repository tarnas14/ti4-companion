import { useState } from 'react'
import { Button } from '@material-ui/core'
import { Trans } from '../i18n'

import { DiceRoller } from './DiceRoller'

export function LetsFight() {
  const [player1Rolled, setPlayer1Rolled] = useState(false)
  const [showOpponentRoller, setShowOpponentRoller] = useState(false)

  return (
    <>
      <DiceRoller
        onCleared={() => setPlayer1Rolled(false)}
        onRolled={() => setPlayer1Rolled(true)}
      />
      {player1Rolled && (
        <Button
          color="primary"
          onClick={() => setShowOpponentRoller((a) => !a)}
          style={{
            marginBottom: '1em',
            width: '50vw',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
            height: '6vh',
          }}
          variant="contained"
        >
          <Trans
            i18nKey={
              showOpponentRoller
                ? 'letsFight.hideOpponentRoller'
                : 'letsFight.showOpponentRoller'
            }
          />
        </Button>
      )}
      <DiceRoller
        hide={!showOpponentRoller}
        onCleared={() => setShowOpponentRoller(false)}
      />
    </>
  )
}
