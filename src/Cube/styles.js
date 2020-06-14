import styled, { keyframes, css } from '@xstyled/styled-components'
import { roundWidth, roundWidthBottomFace } from './helpers'

export const ANIMATIONDURATION = 2000
export const animationsLastState = {
  found: `perspective(250px) rotateX(0deg) rotateY(180deg) translateY(0px) translateX(-5px) scale(1.6)`,
}
const animations = {
  reveal: keyframes`
    0% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translate3d(-5px, -2px, 0);
    }
    25% {
      z-index: 0;
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px);
    }
    26% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px) scale(1);
      z-index: 1000;
    }
    40% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px) scale(1.5);
    }
    65% {
      transform: perspective(250px) rotateX(0deg) rotateY(180deg) translateY(0px) translateX(-5px) scale(1.5);
    }
    75% {
      transform: perspective(250px) rotateX(0deg) rotateY(180deg) translateY(0px) translateX(-5px) scale(1.5);
      z-index: 1000;
    }
    96% {
      z-index: 0;
      transform: perspective(250px) rotateX(0deg) rotateY(90deg) translateY(0px) translateX(0px) scale(1);
    }
    100% {
      transform: perspective(250px) rotateX(0deg) rotateY(90deg) translateY(0px) translateX(0px) scale(1);
    }
  `,
  found: keyframes`
    0% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(3px) translateX(0px) scale(0.98);
    }
    25% {
      z-index: 0;
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px);
    }
    26% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px) scale(1);
      z-index: 1000;
    }
    40% {
      transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(-5px) scale(1.5);
    }
    65% {
      transform: perspective(250px) rotateX(0deg) rotateY(180deg) translateY(0px) translateX(-5px) scale(1.5);
    }
    100% {
      transform: ${animationsLastState.found};
      z-index: 1000;
    }
  `,
  destroyed: keyframes`
  0% {
    transform: ${animationsLastState.found};
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
  90% {
    opacity: 0;
    display: none;
    visibility: hidden;
    pointer-events: none;
  }
`,
}

const Front = styled.div`
  transform: ${(p) => `translateZ(${roundWidth(p.width)}px)`};
`
const Back = styled.div`
  transform: ${(p) => `rotateY(-180deg) translateZ(${roundWidth(p.width)}px)`};
`
const Left = styled.div`
  transform: ${(p) => `rotateY(-90deg) translateZ(${roundWidth(p.width)}px)`};
`
const Right = styled.div`
  transform: ${(p) => `rotateY(90deg) translateZ(${roundWidth(p.width)}px)`};
`
const Top = styled.div`
  transform: ${(p) => `rotateX(90deg) translateZ(${roundWidth(p.width)}px)`};
`
const Bottom = styled.div`
  transform: ${(p) =>
    `rotateX(-90deg) translateZ(${roundWidthBottomFace(p.width)}px)`};
`

const dynamicStyleAnimation = (props) =>
  css`
    animation: ${animations[props.anim]} ${ANIMATIONDURATION}ms ease forwards;
  `
const Container = styled.div`
  position: absolute;
  left: ${(props) => props.offset[0] + 30 * props.coordinates[1]}px;
  top: ${(props) => props.offset[1] + 30 * props.coordinates[0]}px;
  width: ${(props) => props.width}px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transition: transform 550ms ease, opacity 1000ms ease-out;
  transform: perspective(250px) rotateX(0deg) rotateY(0deg) translateY(0px);
  opacity: 1;
  user-select: none;
  ${(props) => props.anim && !props.isDraggable && dynamicStyleAnimation(props)}
  ${(props) =>
    props.isDraggable &&
    css`
      transform: ${animationsLastState.found};
      z-index: 1000;
    `}

  div {
    position: absolute;
    color: white;
    text-align: center;
    line-height: 2em;
  }
  ${(props) =>
    !props.isDraggable &&
    css`
      :hover,
      :focus {
        transform: translate3d(-4px, -2px, 0);
      }
    `}
  ${(props) =>
    props.destroyed &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`

Container.Front = Front
Container.Back = Back
Container.Top = Top
Container.Bottom = Bottom
Container.Left = Left
Container.Right = Right

export default Container
