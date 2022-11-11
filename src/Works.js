import React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { bigStone, indigo, pickledBluewood, trendyPink } from './colors'

const works = [
  {
    name: 'Home',
    descriptions: [
      'Just a funny home page',
      'Find the keys to open the cube!',
      "(don't cheat)",
    ],
    technos: 'React, Styled-Components',
    links: [{ link: 'https://github.com/tthsympa/home', label: 'github' }],
    misc: '🏠',
  },
  {
    name: 'Seeblock',
    descriptions: [
      'Ethereum blockchain visualisator',
      'Display transactions of inputted address/block',
      'Point transactions to have more infos on it',
    ],
    technos: 'React, THREE, Blockchain',
    links: [
      { link: 'https://seeblock.tthsympa.com', label: 'demo' },
      { link: 'https://github.com/tthsympa/seeblock', label: 'github' },
    ],
    misc: '🔗 💰',
  },
  {
    name: 'Mimique',
    descriptions: [
      '--- OUTDATED',
      'Events aggregator with personalised proposal',
      'End-of-studies mobile app (© friends & me)',
      'Not working anymore, only nostalgia',
    ],
    technos: 'React Native, Redux & co, Flow',
    links: [{ link: 'https://github.com/tthsympa/mimique', label: 'github' }],
    misc: '🎓',
  },
  {
    name: 'Slot',
    descriptions: [
      '--- OUTDATED',
      'Book a slot and be organized!',
      'Just a simple calendar app',
      'WIP, must be connected to API',
    ],
    technos: 'React, Chakra UI, BigCalendar',
    links: [
      { link: 'https://github.com/tthsympa/slot', label: 'github' },
    ],
    misc: '🗓 🏗',
  },
  // To complete
]

function Work({ name, descriptions, technos, links, misc }) {
  return (
    <Content>
      {misc && <Misc>{misc}</Misc>}
      <Box display="flex" alignItems="center">
        <Name>{name}</Name>
        <Technos>{technos}</Technos>
      </Box>
      {descriptions.map((description, index) => (
        <Description key={`work-desc-${index}`}>- {description}</Description>
      ))}
      <Box ml={3}>
        {links.map(({ label, link }, index) => (
          <React.Fragment key={`work-link-${index}`}>
            <Box
              as="a"
              href={link}
              color={pickledBluewood}
              target="__blank"
              rel="noopener noreferrer"
            >
              {label}
            </Box>
            {index !== links.length - 1 && ` - `}
          </React.Fragment>
        ))}
      </Box>
    </Content>
  )
}

function Works() {
  return (
    <Container>
      {works.map((work, index) => (
        <Box key={work.name}>
          <Work {...work} />
          {index !== works.length - 1 && <Separator />}
        </Box>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 50px 50px 0px;
  width: 100%;
`

const Content = styled.div`
  width: 100%;
  position: relative;
`

const Name = styled.h4`
  font-size: 22px;
  color: ${bigStone};
  margin: 0;
  width: 150px;
  transition: font-size 200ms ease;
`
const Description = styled.p`
  font-size: 16px;
  color: ${pickledBluewood};
  margin-top: 4px;
  margin: 0;
`
const Technos = styled.p`
  font-size: 16px;
  color: ${indigo};
  margin-left: 32px;
  margin: 0;
`
const Misc = styled.div`
  position: absolute;
  width: 50px;
  text-align: center;
  top: 0;
  left: -50px;
`

const Separator = styled.div`
  height: 1px;
  width: 24px;
  border-bottom: 1px dashed ${trendyPink};
  margin-bottom: 24px;
  margin-top: 8px;
`

export default Works
