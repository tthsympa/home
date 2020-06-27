import React, { useState, useMemo, useEffect, useRef } from 'react'
import styled, { Box } from '@xstyled/styled-components'
import Cube from './Cube'
import Slot from './Slot'
import Works from './Works'
import * as colors from './colors'

const shades = [
  colors.bigStone,
  colors.pickledBluewood,
  colors.mulledWine,
  colors.trendyPink,
  colors.melanie,
  colors.brightSun,
]

const hints = ['🚪', '🗝', '🤏']

const CUBES_NUMBER = 10

function getRandomIndex(indexes = []) {
  if (indexes.length <= 2) {
    const row = Math.floor(Math.random() * CUBES_NUMBER)
    const column = Math.floor(Math.random() * CUBES_NUMBER)

    if (indexes.some(([r, c]) => r === row && c === column)) {
      return getRandomIndex(indexes)
    }
    indexes.push([row, column])
    return getRandomIndex(indexes)
  }
  return indexes
}

function valueFromPercentage(percent, value) {
  return (percent / 100) * value
}

function App() {
  const ref = useRef()

  const [ezMode, setEzMode] = useState(false)
  const [hintsFound, addFoundHint] = useState([])
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const indexes = useMemo(getRandomIndex, [getRandomIndex])

  useEffect(() => {
    if (ref.current) {
      setDimension({
        width: 300,
        height: 300,
      })
    }
  }, [])

  function determineColor(rIndex, sqrIndex) {
    if (rIndex === 0 || sqrIndex === 0) {
      return shades[0]
    }
    if (sqrIndex === 1 || rIndex === 1) {
      return shades[1]
    }
    if (sqrIndex === 2 || rIndex === 2) {
      return shades[2]
    }
    if (sqrIndex === 3 || rIndex === 3) {
      return shades[3]
    }
    if (sqrIndex === 4 || rIndex === 4) {
      return shades[4]
    }
    if (sqrIndex === 5 || rIndex === 5) {
      return shades[5]
    }
    if (sqrIndex === 6 || rIndex === 6) {
      return shades[0]
    }
    if (sqrIndex === 7 || rIndex === 7) {
      return shades[1]
    }
    if (sqrIndex === 8 || rIndex === 8) {
      return shades[2]
    }
    if (sqrIndex === 9 || rIndex === 9) {
      return shades[3]
    }
  }

  const shouldRevealWorks = hintsFound.length === 3

  return (
    <Container>
      <Content
        ref={ref}
        style={{ position: 'relative' }}
        shouldReveal={shouldRevealWorks}
      >
        {shouldRevealWorks ? (
          <Works />
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                top: '-115px',
                width: '200px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {Array.from({ length: hints.length }).map((_, index) => (
                <Slot
                  key={hints[index]}
                  hint={hints[index]}
                  hintsFound={hintsFound}
                  addFoundHint={addFoundHint}
                />
              ))}
            </div>
            <Box width={300} height={300} p={0}>
              {ref.current
                ? Array.from({ length: CUBES_NUMBER }).map((_, rowIndex) => {
                    const height = Math.round(
                      valueFromPercentage(10, dimension.height)
                    )
                    const width = Math.round(
                      valueFromPercentage(10, dimension.width)
                    )
                    return (
                      <div
                        key={rowIndex}
                        style={{
                          display: 'flex',
                          height: height,
                        }}
                      >
                        {Array.from({ length: CUBES_NUMBER }).map(
                          (_, index) => {
                            const hintIndex = indexes.findIndex(
                              ([r, c]) => r === rowIndex && c === index
                            )
                            const hint =
                              hintIndex > -1 ? hints[hintIndex] : undefined
                            const {
                              left,
                              top,
                            } = ref.current.getBoundingClientRect()
                            return (
                              <Cube
                                key={`${rowIndex}-${index}`}
                                width={width}
                                height={height}
                                color={determineColor(rowIndex, index)}
                                hint={hint}
                                coordinates={[rowIndex, index]}
                                offset={[100, 100]}
                                cx={[left, top]}
                                isEz={ezMode}
                              />
                            )
                          }
                        )}
                      </div>
                    )
                  })
                : null}
            </Box>
          </>
        )}
      </Content>
      {!shouldRevealWorks && (
        <Box position="absolute" bottom={30} left={30} display="flex">
          <input
            type="checkbox"
            value={ezMode}
            onChange={() => setEzMode(!ezMode)}
          />
          <Box as="span" ml={1}>
            ez
          </Box>
        </Box>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.dew};
`
const Content = styled.div.attrs(({ shouldReveal }) => ({
  style: {
    backgroundColor: shouldReveal ? colors.pastel : colors.indigo,
    height: shouldReveal ? '800px' : '500px',
    width: shouldReveal ? '800px' : '500px',
    justifyContent: shouldReveal ? 'flex-start' : 'center',
    alignItems: shouldReveal ? 'flex-start' : 'center',
  },
}))`
  display: flex;
  transition: height 500ms ease, width 500ms ease, background-color 500ms ease;
`

export default App
