import { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import clsx from 'clsx'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useSmallViewport from '../../../shared/useSmallViewport'
import { useFullscreen } from '../../../Fullscreen'
import { handleErrors } from '../../../shared/errorHandling'
import { useFetch } from '../../../useFetch'
import CONFIG from '../../../config'
import { VP_SOURCE } from '../../../shared/constants'
/* eslint-disable camelcase */
import vp10_0 from '../../../assets/victory-points-10/0.jpg'
import vp10_1 from '../../../assets/victory-points-10/1.jpg'
import vp10_2 from '../../../assets/victory-points-10/2.jpg'
import vp10_3 from '../../../assets/victory-points-10/3.jpg'
import vp10_4 from '../../../assets/victory-points-10/4.jpg'
import vp10_5 from '../../../assets/victory-points-10/5.jpg'
import vp10_6 from '../../../assets/victory-points-10/6.jpg'
import vp10_7 from '../../../assets/victory-points-10/7.jpg'
import vp10_8 from '../../../assets/victory-points-10/8.jpg'
import vp10_9 from '../../../assets/victory-points-10/9.jpg'
import vp10_10 from '../../../assets/victory-points-10/10.jpg'

import vp14_0 from '../../../assets/victory-points-14/0.jpg'
import vp14_1 from '../../../assets/victory-points-14/1.jpg'
import vp14_2 from '../../../assets/victory-points-14/2.jpg'
import vp14_3 from '../../../assets/victory-points-14/3.jpg'
import vp14_4 from '../../../assets/victory-points-14/4.jpg'
import vp14_5 from '../../../assets/victory-points-14/5.jpg'
import vp14_6 from '../../../assets/victory-points-14/6.jpg'
import vp14_7 from '../../../assets/victory-points-14/7.jpg'
import vp14_8 from '../../../assets/victory-points-14/8.jpg'
import vp14_9 from '../../../assets/victory-points-14/9.jpg'
import vp14_10 from '../../../assets/victory-points-14/10.jpg'
import vp14_11 from '../../../assets/victory-points-14/11.jpg'
import vp14_12 from '../../../assets/victory-points-14/12.jpg'
import vp14_13 from '../../../assets/victory-points-14/13.jpg'
import vp14_14 from '../../../assets/victory-points-14/14.jpg'

import { PointContainer, DraggableFlag } from './draggableIndicators'
import { PointsSourceHelper } from './PointsSourceHelper'

const vp10_images = [
  vp10_0,
  vp10_1,
  vp10_2,
  vp10_3,
  vp10_4,
  vp10_5,
  vp10_6,
  vp10_7,
  vp10_8,
  vp10_9,
  vp10_10,
]
const vp14_images = [
  vp14_0,
  vp14_1,
  vp14_2,
  vp14_3,
  vp14_4,
  vp14_5,
  vp14_6,
  vp14_7,
  vp14_8,
  vp14_9,
  vp14_10,
  vp14_11,
  vp14_12,
  vp14_13,
  vp14_14,
]

const useStyles = makeStyles({
  root: {
    width: '75%',
    margin: '0 auto',
    maxHeight: ({ fullscreen }) => (fullscreen ? '19vh' : 'auto'),
    marginBottom: ({ fullscreen }) => (fullscreen ? '1vh' : 0),
  },
  fullWidth: {
    width: '100%',
  },
  img: {
    minWidth: 50,
    position: 'relative',
    width: ({ inputWidth }) => `${inputWidth}%`,
    '&:first-child > img': {
      borderBottomLeftRadius: '45%',
    },
    '&:last-child > img': {
      borderTopRightRadius: '40%',
    },
    '& > img': {
      pointerEvents: 'none',
      width: '100%',
    },
  },
  dropContainerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropContainer: {
    height: '73%',
    width: '100%',
  },
})

function VictoryPoints({ editable, target, onChange, points, sessionId }) {
  const smallViewport = useSmallViewport()
  const { fullscreen } = useFullscreen()
  const inputWidth = 100 / (target + 1)
  const classes = useStyles({ inputWidth, fullscreen })
  const vpImages = target === 10 ? vp10_images : vp14_images

  const [pointChangesHistory, setPointChangeHistory] = useState([])
  const updatePoints = useCallback(
    async (faction, newPoints) => {
      const success = await onChange(faction, newPoints)
      if (success) {
        setPointChangeHistory((oldHistory) => [
          ...oldHistory,
          { faction, points: newPoints },
        ])
      }
    },
    [onChange],
  )

  const { fetch } = useFetch()
  const addSource = useCallback(
    async ({ index, faction, points: newFactionPoints, context }) => {
      try {
        await fetch(`${CONFIG.apiUrl}/api/sessions/${sessionId}/events`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'AddPointSource',
            serializedPayload: JSON.stringify({
              faction,
              points: newFactionPoints,
              source: VP_SOURCE.fromFrontendToBackend(context),
            }),
          }),
        }).then(handleErrors)
        setPointChangeHistory((oldHistory) =>
          oldHistory.map((historyPoint, historyIndex) =>
            historyPoint.faction === faction &&
            historyPoint.points === newFactionPoints &&
            index === historyIndex
              ? { ...historyPoint, context }
              : historyPoint,
          ),
        )
      } catch (e) {
        console.error(e)
      }
    },
    [fetch, sessionId],
  )

  return (
    <>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <Grid
          className={clsx(classes.root, {
            [classes.fullWidth]: smallViewport,
          })}
          container
          justifyContent="center"
        >
          {[...Array(target + 1).keys()].map((numberOfPoints) => {
            const factionsWithThisManyPoints = points.filter(
              ({ points: factionPoints }) => factionPoints === numberOfPoints,
            )

            return (
              <Grid key={numberOfPoints} className={classes.img} item>
                <img
                  alt={`${numberOfPoints} victory points background`}
                  src={vpImages[numberOfPoints]}
                />
                <Grid
                  alignItems="center"
                  className={classes.dropContainerWrapper}
                  container
                  direction="column"
                  justifyContent="center"
                >
                  <PointContainer
                    className={classes.dropContainer}
                    id={numberOfPoints}
                    points={numberOfPoints}
                  >
                    {factionsWithThisManyPoints.map(({ faction }) => (
                      <DraggableFlag
                        key={faction}
                        editable={editable}
                        factionKey={faction}
                        onClick={
                          editable
                            ? () => updatePoints(faction, numberOfPoints + 1)
                            : undefined
                        }
                        updatePoints={
                          editable
                            ? (factionPoints) =>
                                updatePoints(faction, factionPoints)
                            : undefined
                        }
                      />
                    ))}
                  </PointContainer>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </DndProvider>
      <Grid container justifyContent="center">
        <Grid item>
          <PointsSourceHelper
            addSource={addSource}
            history={pointChangesHistory}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default VictoryPoints
