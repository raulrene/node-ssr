import { JsonElementProperties, JsonTextProperties } from './types.ts'

export function getJSON(hash: string) {
  return fetch(`${process.env.JSON_CDN}/${hash}/json`)
    .then((res) => res.json())
    .catch((err) => {
      console.error('getJSON', err)
      throw `Failed to get JSON for hash ${hash}`
    })
}

export function getLayerStyles(properties: JsonElementProperties) {
  return {
    left: properties.x,
    top: properties.y,
    width: properties.width,
    height: properties.height,
    opacity: properties.opacity / 100,
    transform: `rotate(${properties.rotation}deg)`,
  }
}

export function getTextStyles(properties: JsonTextProperties) {
  return {
    lineHeight: properties.lineHeight,
    verticalAlign: properties.verticalAlign,
    fontSize: properties.fontSize,
    textAlign: properties.alignment,
  }
}

// export function getSlideStyles(properties: JsonSlideProperties) {
//   return {
//     backgroundColor: properties.backgroundColor
//   }
// }
