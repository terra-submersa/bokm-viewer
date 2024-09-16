import { expect, test } from 'vitest'
import MbtilesService from "@/services/mbtiles-service";

test('extractHost with no port', () => {
    const service = new MbtilesService()

    const got = service.extractHost('http://www.example.com/paf/thedog.html?ouch=true')
    expect(got).toBe('http://www.example.com')
})
test('extractHost with port', () => {
    const service = new MbtilesService()

    const got = service.extractHost('http://www.example.com:123/paf/thedog.html?ouch=true')
    expect(got).toBe('http://www.example.com:123')
})

test('reverseProxy with same host', ()=>{
    const service = new MbtilesService('http://example.com')

    const got = service.reverseProxyUrl('http://example.com/paf/thedog.html?ouch=true')

    expect(got).toBe('http://example.com/paf/thedog.html?ouch=true')
})

test('reverseProxy with difference host', ()=>{
    const service = new MbtilesService('https://example.com:8080')

    const got = service.reverseProxyUrl('http://localhost/paf/thedog.html?ouch=true')

    expect(got).toBe('https://example.com:8080/paf/thedog.html?ouch=true')
})

test('reverseProxy no hostnme for service', ()=>{
    const service = new MbtilesService('')

    const got = service.reverseProxyUrl('http://localhost/services/paf/thedog.html?ouch=true')

    expect(got).toBe('/services/paf/thedog.html?ouch=true')
})
