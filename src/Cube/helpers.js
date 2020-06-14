export const roundWidth = (value) => Math.round(value / 2)
export const roundWidthBottomFace = (value) => Math.round(value / 2) - 1

export function getDragDirection(
  { x: prevX, y: prevY },
  { x: currX, y: currY }
) {
  if (currX > prevX && currY < prevY) return 'right up'
  if (currX < prevX && currY < prevY) return 'left up'
  if (currX > prevX && currY > prevY) return 'right down'
  if (currX < prevX && currY > prevY) return 'left down'
  if (currX > prevX) return 'right'
  if (currX < prevX) return 'left'
  if (currY < prevY) return 'up'
  if (currY > prevY) return 'down'
  if (currX === prevX && currY === prevY) return 'idle'
}

export function getRotatingFromDirection(direction) {
  let rotate = ``
  if (direction.includes('idle')) {
    return rotate
  }
  if (direction.includes('up')) {
    rotate = `${rotate} rotateX(-20deg)`
  }
  if (direction.includes('down')) {
    rotate = `${rotate} rotateX(20deg)`
  }
  if (direction.includes('left')) {
    rotate = `${rotate} rotateY(-25deg)`
  }
  if (direction.includes('right')) {
    rotate = `${rotate} rotateY(25deg)`
  }
  return rotate
}
