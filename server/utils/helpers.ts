import React from 'react'
import {
  isJsonBackgroundSolid,
  JsonButtonProperties,
  JsonDesignProperties,
  JsonElementProperties,
  JsonTextProperties,
  JsonTextSlateConfigChildren,
} from './types.ts'

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

export function getTextStyles(
  properties: JsonTextProperties
): React.CSSProperties {
  return {
    width: properties.width,
    height: properties.height,
    left: properties.x,
    top: properties.y,
    lineHeight: properties.lineHeight,
    verticalAlign: properties.verticalAlign,
    fontSize: properties.fontSize,
    textAlign: properties.alignment,
    position: 'absolute',
  }
}

export function getTextChildProperties(
  properties: JsonTextSlateConfigChildren
) {
  return {
    color: properties.color,
    textDecoration: properties.textDecoration,
    textTransform: properties.textTransform,
    fontSize: properties.fontSize,
    ...properties.fontSettings,
  }
}

export function getBannerStyles(properties: JsonDesignProperties) {
  return {
    width: properties.width,
    height: properties.height,
    backgroundColor: isJsonBackgroundSolid(properties.backgroundColor)
      ? properties.backgroundColor.scolor
      : undefined,
    borderColor: properties.backgroundColor?.borderColor,
  }
}

export function getButtonStyles(properties: JsonButtonProperties) {
  return {
    borderColor: properties.border?.color,
    backgroundColor: isJsonBackgroundSolid(properties.backgroundColor)
      ? properties.backgroundColor.scolor
      : undefined,
    color: properties.labelStyle.color,
    fontFamily: properties.labelStyle.fontFamily,
    fontWeight: properties.labelStyle.fontWeight,
    fontStyle: properties.labelStyle.fontStyle,
    fontSize: properties.labelStyle.fontSize,
  }
}
