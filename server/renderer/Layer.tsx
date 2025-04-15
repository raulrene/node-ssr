import React from 'react'
import { JsonElement } from '../utils/types.ts'
import { getButtonStyles, getLayerStyles } from '../utils/helpers'
import Text from './Text.tsx'

export default function Layer({ layer }: { layer: JsonElement }) {
  const { layerType, properties } = layer

  const style = getLayerStyles(properties)

  if (layerType === 'image') {
    return (
      <img
        className="layer"
        src={`${process.env.IMAGE_CDN}/${properties.url}`}
        alt={properties.originalName}
        style={style}
      />
    )
  }

  if (layerType === 'text') {
    return <Text properties={properties} />
  }

  if (layerType === 'button') {
    return (
      <button
        className="layer"
        style={{ ...style, ...getButtonStyles(properties) }}
      >
        {properties.html}
      </button>
    )
  }

  return null
}
