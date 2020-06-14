/** @jsx jsx */

// import { useState, useMemo, useEffect, useRef } from 'react'
import { jsx } from '@xstyled/emotion'
import styled from '@xstyled/styled-components'
import { bigStone } from './colors'

const S = styled.div`
  width: 40px;
  height: 40px;
  border: 2px dashed ${bigStone};
  border-radius: 3px;
`

function Slot() {
  return <S name="slot" />
}

export default Slot
