import React from 'react'
import { render, screen } from '@testing-library/react'
import Text from './Text'
import { JsonTextProperties } from '../utils/types'

// Mock styles
jest.mock('../utils/helpers', () => ({
  ...jest.requireActual('../utils/helpers'),
  getTextStyles: jest.fn(() => ({ fontSize: 20 })),
  getTextChildProperties: jest.fn(() => ({ color: 'blue', fontSize: 14 })),
}))

describe('Text component', () => {
  const props: JsonTextProperties = {
    x: 0,
    y: 0,
    width: 300,
    height: 100,
    fontSize: 16,
    verticalAlign: 'top',
    alignment: 'left',
    lineHeight: 1.5,
    config: {
      nodes: [
        {
          type: 'paragraph',
          children: [
            { text: 'Hello World', color: '#000', fontSize: 14 },
            { text: 'Another line', color: '#111', fontSize: 13 },
          ],
        },
      ],
    },
  } as any

  it('renders text inside paragraph nodes with correct styles', () => {
    render(<Text properties={props} />)

    const paragraphs = screen.getAllByText(/Hello World|Another line/)
    expect(paragraphs.length).toBe(2)

    paragraphs.forEach((p) => {
      expect(p.tagName).toBe('P')
      expect(p).toHaveStyle({ color: 'blue', fontSize: '14px' }) // based on mock
    })
  })

  it('renders wrapper div with styles from getTextStyles', () => {
    render(<Text properties={props} />)
    const div = screen.getByText('Hello World').parentElement

    expect(div?.tagName).toBe('DIV')
    expect(div).toHaveStyle({ fontSize: '20px' }) // based on mock
  })

  it('ignores children that are isSlateConfigNode', () => {
    jest
      .spyOn(require('../utils/types'), 'isSlateConfigNode')
      .mockImplementation((child: any) => child.text === undefined)

    const propsWithInvalidChild = {
      ...props,
      config: {
        nodes: [
          {
            type: 'paragraph',
            children: [
              { text: 'Valid text', color: '#000' },
              { invalid: true }, // will be filtered
            ],
          },
        ],
      },
    } as any

    render(<Text properties={propsWithInvalidChild} />)
    expect(screen.getByText('Valid text')).toBeInTheDocument()
    expect(screen.queryByText('invalid')).not.toBeInTheDocument()
  })
})
