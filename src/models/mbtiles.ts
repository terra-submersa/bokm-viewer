export interface MbTilesLayer {
    name: string
    minZoom: number
    maxZoom: number
    url: string
    bounds: number[]
}

export interface Coords {
    lat: number
    lon: number
}

export function layerCenter(l: MbTilesLayer): Coords {
    return {
        lat: (l.bounds[1] + l.bounds[3]) / 2,
        lon: (l.bounds[0] + l.bounds[2]) / 2
    }
}