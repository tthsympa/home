import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled, { css, keyframes } from '@xstyled/styled-components'
import {
  brightSun,
  bigStone,
  lightGreen,
  grannyApple,
  roseMader,
  pastel,
} from './colors'

const Container = styled.div`
  width: 40px;
  height: 40px;
  border: 2px dashed ${bigStone};
  border-radius: 3px;

  transition: height 300ms ease-out, width 300ms ease-out,
    background-color 300ms ease-out, border-color 300ms ease-out,
    border-style 300ms ease-out;
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const dynamicStyleAnimation = (props) =>
  css`
    animation: ${fadeIn} 1000ms ease forwards;
  `
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  height: 100%;
  width: 100%;
  font-size: 30px;
  ${(props) => dynamicStyleAnimation(props)}
`

const styles = {
  default: {
    height: '40px',
    width: '40px',
    borderColor: bigStone,
    backgroundColor: 'inherit',
  },
  'hover-success': {
    height: '55px',
    width: '55px',
    borderColor: lightGreen,
    backgroundColor: grannyApple,
  },
  'hover-error': {
    height: '50px',
    width: '50px',
    borderColor: roseMader,
    backgroundColor: pastel,
  },
  match: {
    height: '60px',
    width: '60px',
    borderColor: brightSun,
    backgroundColor: 'inherit',
    borderStyle: 'solid',
  },
}
function Slot({ hint, hintsFound, addFoundHint }) {
  const ref = useRef()
  const [match, setMatch] = useState()

  const applyStyle = useCallback((type = 'default') => {
    const { style } = ref.current
    const { height, width, borderColor, backgroundColor, borderStyle } =
      styles[type] || {}
    style.height = height
    style.width = width
    style.borderColor = borderColor
    style.backgroundColor = backgroundColor
    style.borderStyle = borderStyle
  }, [])

  useEffect(() => {
    applyStyle(match ? 'match' : 'default')

    ref.current.addEventListener('hovering', (e) => {
      const { detail } = e
      if (ref.current.match) return

      applyStyle(
        typeof detail === 'undefined'
          ? 'default'
          : detail === hint
          ? 'hover-success'
          : 'hover-error'
      )
    })

    ref.current.addEventListener('dropping', (e) => {
      const { detail } = e

      if (detail === hint) {
        applyStyle('match')
        setMatch(true)
        ref.current.match = true
        addFoundHint([...hintsFound, hint])
      }
    })
  }, [hint, match, applyStyle, addFoundHint, hintsFound])

  return (
    <Container ref={ref} name="slot" id={hint}>
      {match ? <Content>{hint}</Content> : null}
    </Container>
  )
}

export default Slot
