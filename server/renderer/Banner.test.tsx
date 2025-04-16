import React from 'react'
import { render, screen } from '@testing-library/react'
import Banner from './Banner'
import { JsonDesign } from '../utils/types'

// Mock the Layer component
jest.mock('./Layer', () => ({
  __esModule: true,
  default: jest.fn(({ layer }) => (
    <div data-testid={`layer-${layer.properties.bannersetElementId}`} />
  )),
}))

// Mock styles
jest.mock('../utils/helpers', () => ({
  ...jest.requireActual('../utils/helpers'),
  getBannerStyles: jest.fn(() => ({ backgroundColor: 'red' })),
}))

describe('Banner component', () => {
  const layer1 = {
    type: 'layer',
    properties: {
      bannersetElementId: 'layer1',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      opacity: 100,
      rotation: 0,
    },
  }

  const slide1 = {
    type: 'slide',
    properties: {
      bannersetElementId: 'slide1',
    },
    elements: [
      {
        type: 'layer',
        properties: {
          bannersetElementId: 'slide1-layer1',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          opacity: 100,
          rotation: 0,
        },
      },
    ],
  }

  const baseProps: JsonDesign = {
    properties: {
      width: 300,
      height: 250,
      backgroundColor: { scolor: '#fff' },
    },
    elements: [],
  } as any

  it('renders layers from single layer elements', () => {
    const bannerData: JsonDesign = {
      ...baseProps,
      elements: [layer1 as any],
    }

    render(<Banner bannerData={bannerData} />)

    expect(screen.getByTestId('layer-layer1')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders layers from slide elements', () => {
    const bannerData: JsonDesign = {
      ...baseProps,
      elements: [slide1 as any],
    }

    render(<Banner bannerData={bannerData} />)

    expect(screen.getByTestId('layer-slide1-layer1')).toBeInTheDocument()
  })

  it('wraps content in an anchor tag if bannerUrl is present', () => {
    const bannerData: JsonDesign = {
      ...baseProps,
      properties: {
        ...baseProps.properties,
        bannerUrl: 'https://example.com',
      },
      elements: [layer1 as any],
    }

    render(<Banner bannerData={bannerData} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(screen.getByTestId('layer-layer1')).toBeInTheDocument()
  })

  it('applies styles from getBannerStyles', () => {
    const bannerData: JsonDesign = {
      ...baseProps,
      elements: [layer1 as any],
    }

    render(<Banner bannerData={bannerData} />)

    const banner = screen.getByTestId('banner')
    expect(banner).toHaveStyle({ backgroundColor: 'red' })
  })
})
