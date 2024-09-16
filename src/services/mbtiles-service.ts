import type {AxiosInstance} from "axios";
import axios from "axios";
import type {MbTilesLayer} from "@/models/mbtiles";

const MBTILES_SERVER_ROOT = import.meta.env.VITE_MBTILES_SERVER_ROOT
export default class MbtilesService {
    axiosInstance: AxiosInstance
    mbtilesServerRoot: string | undefined

    constructor(mbtilesServerRoot: string | undefined = undefined) {
        if (mbtilesServerRoot === undefined) {
            mbtilesServerRoot = MBTILES_SERVER_ROOT
            if (!mbtilesServerRoot) {
                mbtilesServerRoot = window.location.origin
            }
        }
        this.mbtilesServerRoot = mbtilesServerRoot
        this.axiosInstance = axios.create({
            baseURL: mbtilesServerRoot
        })
    }

    extractHost(url: string): string {
        const reqUrl = new URL(url);
        const reqUrlHost = `${reqUrl.protocol}//${reqUrl.hostname}`
        if (reqUrl.port) {
            return reqUrlHost + `:${reqUrl.port}`
        }
        return reqUrlHost
    }

    reverseProxyUrl(url: string): string {
        const reqUrlHost = this.extractHost(url)
        if (!this.mbtilesServerRoot?.startsWith('http')) {
            return url.replace(reqUrlHost, '')
        }
        const serviceHost = this.extractHost(this.mbtilesServerRoot || '')
        if (reqUrlHost === serviceHost) {
            return url
        }
        return url.replace(reqUrlHost, serviceHost)
    }

    async listLayers(): Promise<MbTilesLayer[]> {
        const urls: string[] = await this.axiosInstance.get('/services')
            .then(r => r.data.map((d: any) => this.reverseProxyUrl(d['url'])))
        return Promise.all(urls.map(url => this.axiosInstance.get(url)
                .then(r => r.data)
                .then(
                    (d: any) => {
                        const tilesUrl = d['tiles'][0]
                        const url = this.reverseProxyUrl(tilesUrl)
                        return {
                            name: d['name'],
                            bounds: d['bounds'],
                            minZoom: d['minzoom'],
                            maxZoom: d['maxzoom'],
                            url: url,
                        } as MbTilesLayer
                    }
                )
            )
        )
    }
}