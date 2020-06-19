import React, { useState, useEffect, useRef } from 'react'
import { throttle } from 'throttle-debounce'
import Container, { ANIMATIONDURATION, animationsLastState } from './styles'
import { getDragDirection, getRotatingFromDirection } from './helpers'

let previousMousePosition = {
  x: 0,
  y: 0,
}

function Cube({
  height,
  width,
  color,
  hint,
  coordinates = [],
  offset = [],
  cx = [],
}) {
  const [anim, setAnim] = useState()
  const [isDraggable, setDrag] = useState()
  const [destroyed, destroy] = useState()
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

      function getClosestSlot(mousePos) {
        if (isFarFromSlot(mousePos)) {
          indexOfClosestSlot = undefined
          return
        }
        throttle(
          200,
          slotsCoords.forEach((coords, index) => {
            const limit = 30
            const negLimit = -70
            const [x, y] = coords
            const diffX = x - mousePos.x
            const diffY = y - mousePos.y

            if (
              diffX <= limit &&
              diffX >= negLimit &&
              diffY <= limit &&
              diffY >= negLimit
            ) {
              indexOfClosestSlot = index
            }
          })
        )
      }

      function isFarFromSlot(mousePos) {
        return slotsCoords.every((coords, index) => {
          const limit = 30
          const negLimit = -70
          const [x, y] = coords
          const diffX = x - mousePos.x
          const diffY = y - mousePos.y

          if (
            diffX <= limit &&
            diffX >= negLimit &&
            diffY <= limit &&
            diffY >= negLimit
          ) {
            return false
          }
          return true
        })
      }

      function applyStyleToSlot() {
        throttle(
          200,
          slots.forEach((slot, index) => {
            if (indexOfClosestSlot === index) {
              slot.dispatchEvent(new CustomEvent('hovering', { detail: hint }))
              return
            }
            slot.dispatchEvent(new Event('hovering'))
          })
        )
      }

      const initialX = cube.getBoundingClientRect().left
      const initialY = cube.getBoundingClientRect().top
      const shiftX = e.clientX - initialX
      const shiftY = e.clientY - initialY
      let indexOfClosestSlot = undefined

      moveAt(e.pageX - shiftX - cx[0], e.pageY - shiftY - cx[1])
      const slots = document.getElementsByName('slot')
      const slotsCoords = Array.from(slots).map((elem) => {
        const { x, y } = elem.getBoundingClientRect()
        return [x, y]
      })

      getClosestSlot({ x: e.pageX, y: e.pageY })
      applyStyleToSlot()

      function onMouseMove(event) {
        // Move the cube
        const mousePos = { x: event.pageX, y: event.pageY }
        moveAt(mousePos.x - shiftX - cx[0], mousePos.y - shiftY - cx[1])

        // Apply some rotate to the cube based on mouse direction
        const dir = getDragDirection(previousMousePosition, mousePos)
        const newRotating = getRotatingFromDirection(dir)
        cube.style.transform = `${animationsLastState.found} ${newRotating}`
        previousMousePosition = mousePos

        // Get closest slot and dispatch event to apply style to it
        getClosestSlot(mousePos)
        applyStyleToSlot()
      }

      document.addEventListener('mousemove', onMouseMove)

      cube.onmouseup = () => {
        if (indexOfClosestSlot !== undefined) {
          const slot = slots[indexOfClosestSlot]
          if (slot.id === hint) {
            destroy(true)
            setTimeout(() => {
              slot.dispatchEvent(new CustomEvent('dropping', { detail: hint }))
              cube.style.display = 'none'
            }, 1000)
          }
        }
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
        if (hasHint && !destroyed) setDrag(true)
      }}
      width={width}
      anim={anim}
      offset={offset}
      coordinates={coordinates}
      isDraggable={isDraggable}
      destroyed={destroyed}
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
