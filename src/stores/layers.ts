import {defineStore} from 'pinia'
import MbtilesService from "@/services/mbtiles-service";
import type {MbTilesLayer} from "@/models/mbtiles";

const mbTilesService = new MbtilesService();
export const useMbTilesStore = defineStore('layers', {
    state: () => ({
        layers: [] as MbTilesLayer[]
    }),
    actions: {
        init: async function () {
            this.layers = await mbTilesService.listLayers()
        }
    }
})
