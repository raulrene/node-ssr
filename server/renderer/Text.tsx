import React from 'react'
import { isSlateConfigNode, JsonTextProperties } from '../utils/types'
import { getTextChildProperties, getTextStyles } from '../utils/helpers'

export default function Text({
  properties,
}: {
  properties: JsonTextProperties
}) {
  return properties.config.nodes.map((node, idx) => {
    if (node.type === 'paragraph') {
      return (
        <div key={idx} style={{ ...getTextStyles(properties) }}>
          {node.children.map((child, childIdx) => {
            if (isSlateConfigNode(child)) {
              return null
            }
            return (
              <p
                key={childIdx}
                style={{
                  ...getTextChildProperties(child),
                }}
              >
                {child.text}
              </p>
            )
          })}
        </div>
      )
    }

    // TBD: Implement the rest of the text types
    return null
  })
}
