import React from 'react'
import { Composition } from 'remotion'
import { HeroBg } from './HeroBg'

const FPS = 30
const DURATION_S = 12

export const Root: React.FC = () => {
  return (
    <Composition
      id="HeroBg"
      component={HeroBg}
      durationInFrames={FPS * DURATION_S}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  )
}
