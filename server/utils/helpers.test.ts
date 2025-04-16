import {
  getJSON,
  getLayerStyles,
  getTextStyles,
  getTextChildProperties,
  getBannerStyles,
  getButtonStyles,
} from './helpers'
import {
  JsonButtonProperties,
  JsonDesignProperties,
  JsonElementProperties,
  JsonTextProperties,
  JsonTextSlateConfigChildren,
} from './types'

jest.mock('./types', () => ({
  isJsonBackgroundSolid: (val: any) => !!val?.scolor,
}))

describe('getJSON', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('should fetch JSON data from correct URL', async () => {
    const mockJson = { some: 'data' }
    const hash = 'abc123'
    const expectedUrl = `${process.env.JSON_CDN}/${hash}/json`

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJson),
    })

    const result = await getJSON(hash)
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl)
    expect(result).toEqual(mockJson)
  })

  it('should throw on fetch error', async () => {
    const hash = 'bad123'
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Fetch failed')
    )

    await expect(getJSON(hash)).rejects.toEqual(
      `Failed to get JSON for hash ${hash}`
    )
  })
})

describe('getLayerStyles', () => {
  it('should return correct styles', () => {
    const props = {
      x: 10,
      y: 20,
      width: 200,
      height: 100,
      opacity: 50,
      rotation: 45,
    } as unknown as JsonElementProperties

    expect(getLayerStyles(props)).toEqual({
      left: 10,
      top: 20,
      width: 200,
      height: 100,
      opacity: 0.5,
      transform: 'rotate(45deg)',
    })
  })
})

describe('getTextStyles', () => {
  it('should return text styles', () => {
    const props = {
      width: 300,
      height: 80,
      x: 15,
      y: 25,
      lineHeight: 1.5,
      verticalAlign: 'middle',
      fontSize: 16,
      alignment: 'center',
    } as unknown as JsonTextProperties

    expect(getTextStyles(props)).toEqual({
      width: 300,
      height: 80,
      left: 15,
      top: 25,
      lineHeight: 1.5,
      verticalAlign: 'middle',
      fontSize: 16,
      textAlign: 'center',
      position: 'absolute',
    })
  })
})

describe('getTextChildProperties', () => {
  it('should return merged child properties', () => {
    const props = {
      color: '#000',
      textDecoration: 'underline',
      textTransform: 'uppercase',
      fontSize: 14,
      fontSettings: {
        fontFamily: 'Arial',
        fontWeight: 700,
      },
    } as unknown as JsonTextSlateConfigChildren

    expect(getTextChildProperties(props)).toEqual({
      color: '#000',
      textDecoration: 'underline',
      textTransform: 'uppercase',
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 700,
    })
  })
})

describe('getBannerStyles', () => {
  it('should return banner styles with solid background', () => {
    const props = {
      width: 600,
      height: 300,
      backgroundColor: {
        scolor: '#f00',
        borderColor: '#0f0',
      },
    } as unknown as JsonDesignProperties

    expect(getBannerStyles(props)).toEqual({
      width: 600,
      height: 300,
      backgroundColor: '#f00',
      borderColor: '#0f0',
    })
  })

  it('should return undefined background if not solid', () => {
    const props = {
      width: 600,
      height: 300,
      backgroundColor: {
        borderColor: '#0f0',
      },
    } as unknown as JsonDesignProperties

    expect(getBannerStyles(props)).toEqual({
      width: 600,
      height: 300,
      backgroundColor: undefined,
      borderColor: '#0f0',
    })
  })
})

describe('getButtonStyles', () => {
  it('should return button styles with solid background', () => {
    const props = {
      border: { color: '#ccc' },
      backgroundColor: { scolor: '#fff' },
      labelStyle: {
        color: '#000',
        fontFamily: 'Verdana',
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 18,
      },
    } as unknown as JsonButtonProperties

    expect(getButtonStyles(props)).toEqual({
      borderColor: '#ccc',
      backgroundColor: '#fff',
      color: '#000',
      fontFamily: 'Verdana',
      fontWeight: '600',
      fontStyle: 'italic',
      fontSize: 18,
    })
  })

  it('should handle missing background scolor', () => {
    const props = {
      border: { color: '#ccc' },
      backgroundColor: {}, // no scolor
      labelStyle: {
        color: '#000',
        fontFamily: 'Verdana',
        fontWeight: '600',
        fontStyle: 'italic',
        fontSize: 18,
      },
    } as unknown as JsonButtonProperties

    expect(getButtonStyles(props)).toEqual({
      borderColor: '#ccc',
      backgroundColor: undefined,
      color: '#000',
      fontFamily: 'Verdana',
      fontWeight: '600',
      fontStyle: 'italic',
      fontSize: 18,
    })
  })
})
