import React from 'react'
import { JsonElement } from '../utils/types.ts'
import { getLayerStyles, getTextStyles } from '../utils/helpers'

export default function LayerRenderer({ layer }: { layer: JsonElement }) {
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
    return properties.config.nodes.map((node, idx) => {
      if (node.type === 'paragraph') {
        return (
          <p key={idx}>
            {node.children.map((child, childIdx) => {
              // @ts-ignore - Can't type narrow here bc there's no Type on JsonTextSlateConfigChildren
              const text = child.text
              if (!text) {
                return null
              }

              return (
                <div
                  key={childIdx}
                  style={{ ...style, ...getTextStyles(properties) }}
                >
                  {text}
                </div>
              )
            })}
          </p>
        )
      }
      return null
    })
  }

  if (layerType === 'button') {
    return (
      <button className="layer" style={style}>
        {properties.html}
      </button>
    )
  }

  return null
}
