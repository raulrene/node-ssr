import React from 'react'
import { JsonDesign, JsonElement, JsonSlideOrElement } from '../utils/types'
import LayerRenderer from './LayerRenderer.tsx'

export default function Banner({ bannerData }: { bannerData: JsonDesign }) {
  const { width, height } = bannerData.properties

  const renderLayers = () =>
    bannerData.elements.map((slide: JsonSlideOrElement) => {
      // For slides we iterate on all child elements
      if (slide.type === 'slide') {
        return (
          <div key={slide.properties.bannersetElementId}>
            {slide.elements.map((layer: JsonElement) => (
              <LayerRenderer
                key={layer.properties.bannersetElementId}
                layer={layer}
              />
            ))}
          </div>
        )
      } else if (slide.type === 'layer') {
        return (
          <LayerRenderer
            key={slide.properties.bannersetElementId}
            layer={slide}
          />
        )
      }

      return null
    })

  return (
    <div className="banner" style={{ width, height }}>
      {renderLayers()}
    </div>
  )
}
