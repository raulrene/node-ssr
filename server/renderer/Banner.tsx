import React from 'react'
import { JsonDesign, JsonElement, JsonSlideOrElement } from '../utils/types'
import Layer from './Layer.tsx'
import { getBannerStyles } from '../utils/helpers'

export default function Banner({ bannerData }: { bannerData: JsonDesign }) {
  const renderLayers = () =>
    bannerData.elements.map((slide: JsonSlideOrElement) => {
      // For slides we iterate on all child elements
      if (slide.type === 'slide') {
        return (
          <div key={slide.properties.bannersetElementId}>
            {slide.elements.map((layer: JsonElement) => (
              <Layer key={layer.properties.bannersetElementId} layer={layer} />
            ))}
          </div>
        )
      } else if (slide.type === 'layer') {
        return <Layer key={slide.properties.bannersetElementId} layer={slide} />
      }

      return null
    })

  const { bannerUrl } = bannerData.properties
  return (
    <div
      className="banner"
      style={{ ...getBannerStyles(bannerData.properties) }}
    >
      {bannerUrl ? <a href={bannerUrl}>{renderLayers()}</a> : renderLayers()}
    </div>
  )
}
