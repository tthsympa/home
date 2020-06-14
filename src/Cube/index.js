/** @jsx jsx */

import { useState, useEffect, useRef } from 'react'
import { jsx } from '@xstyled/emotion'
import Container, { ANIMATIONDURATION, animationsLastState } from './styles'
import { getDragDirection, getRotatingFromDirection } from './helpers'

let previousMousePosition = {
  x: 0,
  y: 0,
}

function Cube({ height, width, color, hint, coordinates, offset, cx }) {
  const [anim, setAnim] = useState()
  const [isDraggable, setDrag] = useState()
  const ref = useRef()
  const hasHint = Boolean(hint)

  useEffect(() => {
    if (anim === 'reveal') {
      setTimeout(() => {
        setAnim('')
      }, ANIMATIONDURATION)
    }
  }, [anim, setAnim])

  function onMouseDown(e) {
    if (isDraggable) {
      function moveAt(pageX, pageY) {
        cube.style.left = pageX + 'px'
        cube.style.top = pageY + 'px'
      }
      const { current: cube } = ref

      const initialX = cube.getBoundingClientRect().left
      const initialY = cube.getBoundingClientRect().top
      const shiftX = e.clientX - initialX
      const shiftY = e.clientY - initialY

      console.log('page', e.pageX, e.pageY)
      console.log('client', e.clientX, e.clientY)
      console.log('shifted', e.pageX - shiftX, e.pageY - shiftY)
      console.log('content', cx[0], cx[1])
      console.log('cube', cube.getBoundingClientRect())

      moveAt(e.pageX - shiftX - cx[0], e.pageY - shiftY - cx[1])

      const slotsCoords = Array.from(document.getElementsByName('slot')).map(
        (elem) => {
          const { x, y } = elem.getBoundingClientRect()
          return [x, y]
        }
      )

      console.log(slotsCoords)
      function onMouseMove(event) {
        // Move the cube
        const mousePos = { x: event.pageX, y: event.pageY }
        moveAt(mousePos.x - shiftX - cx[0], mousePos.y - shiftY - cx[1])

        // Apply some rotate to the cube
        const dir = getDragDirection(previousMousePosition, mousePos)
        const newRotating = getRotatingFromDirection(dir)
        cube.style.transform = `${animationsLastState.found} ${newRotating}`
        previousMousePosition = mousePos
      }
      document.addEventListener('mousemove', onMouseMove)

      cube.onmouseup = () => {
        cube.style.transform = `${animationsLastState.found}`
        document.removeEventListener('mousemove', onMouseMove)
        cube.onmouseup = null
      }
    }
  }

  return (
    <Container
      onMouseDown={onMouseDown}
      ref={ref}
      onClick={() => {
        if (!anim || !isDraggable) {
          if (hasHint) {
            setAnim('found')
          } else {
            setAnim('reveal')
          }
        }
      }}
      onAnimationEnd={() => {
        if (hasHint) setDrag(true)
      }}
      width={width}
      anim={anim}
      offset={offset}
      coordinates={coordinates}
      isDraggable={isDraggable}
    >
      <Container.Front
        width={width}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      <Container.Back
        width={width}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      >
        {hint}
      </Container.Back>
      <Container.Top
        width={width}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      <Container.Bottom
        height={height}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      <Container.Right
        width={width}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      <Container.Left
        width={width}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
    </Container>
  )
}

export default Cube
