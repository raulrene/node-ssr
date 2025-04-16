import React from 'react'
import { render, screen } from '@testing-library/react'
import Layer from './Layer'
import * as helpers from '../utils/helpers'
import { JsonElement } from '../utils/types'

// Optional: Mock child components if needed
jest.mock('./Text', () => jest.fn(() => <div data-testid="text-component" />))

describe('Layer component', () => {
  beforeEach(() => {
    process.env.IMAGE_CDN = 'https://cdn.example.com'
  })

  it('renders image layer', () => {
    const layer: JsonElement = {
      layerType: 'image',
      properties: {
        x: 10,
        y: 20,
        width: 100,
        height: 50,
        opacity: 100,
        rotation: 0,
        url: 'image.jpg',
        originalName: 'Alt Text',
      },
    } as any

    jest
      .spyOn(helpers, 'getLayerStyles')
      .mockReturnValue({ top: 20, left: 10 } as any)

    render(<Layer layer={layer} />)

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/image.jpg')
    expect(img).toHaveAttribute('alt', 'Alt Text')
    expect(img).toHaveClass('layer')
  })

  it('renders text layer', () => {
    const layer: JsonElement = {
      layerType: 'text',
      properties: {
        x: 0,
        y: 0,
        width: 100,
        height: 20,
        fontSize: 14,
        lineHeight: 1.5,
        alignment: 'left',
        verticalAlign: 'top',
      },
    } as any

    render(<Layer layer={layer} />)

    expect(screen.getByTestId('text-component')).toBeInTheDocument()
  })

  it('renders button layer', () => {
    const layer: JsonElement = {
      layerType: 'button',
      properties: {
        x: 5,
        y: 10,
        width: 200,
        height: 60,
        opacity: 90,
        rotation: 5,
        html: 'Click me',
        backgroundColor: { scolor: '#fff' },
        labelStyle: {
          color: '#000',
          fontSize: 14,
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontWeight: 'bold',
        },
        border: { color: '#333' },
      },
    } as any

    jest
      .spyOn(helpers, 'getLayerStyles')
      .mockReturnValue({ left: 5, top: 10 } as any)
    jest.spyOn(helpers, 'getButtonStyles').mockReturnValue({
      color: '#000',
      backgroundColor: '#fff',
    } as any)

    render(<Layer layer={layer} />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveClass('layer')
  })

  it('returns null for unsupported layerType', () => {
    const layer: JsonElement = {
      layerType: 'unknown',
      properties: {},
    } as any

    const { container } = render(<Layer layer={layer} />)
    expect(container.firstChild).toBeNull()
  })
})
