<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L, {LayerGroup} from 'leaflet'
import {onBeforeUnmount, onMounted, type Ref, ref, watch} from "vue";
import {useMbTilesStore} from "@/stores/layers";
import {layerCenter} from "@/models/mbtiles";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";


const store = useMbTilesStore();

const map: Ref<L.Map | LayerGroup<any> | null> = ref(null);
const mapRef = ref(null);


onMounted(() => {
  // fixing leaflet markdown path bug in production deployment
  L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
  L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
  L.Icon.Default.imagePath = ""; // necessary to avoid Leaflet adds some prefix to image path.


  map.value = L.map(mapRef.value!).setView([37.4202126, 23.2205106], 11);
  map.value.setMaxZoom(22);

  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
  });
  baseLayer.addTo(map.value);

  watch(
      () => store.layers, (undefined, ls) => {
        const allLayers: { [key: string]: L.Layer[] } = {}
        store.layers.forEach(layer => {
              const ml = L.tileLayer(layer.url, {minZoom: layer.minZoom, maxZoom: layer.maxZoom})
              allLayers[layer.name] = ml
              ml.addTo(map.value)
              const mid = layerCenter(layer)
              L.marker([mid.lat, mid.lon]).bindPopup(layer.name).addTo(map.value)
            }
        )
        L.control.layers([baseLayer], allLayers).addTo(map.value)
      }
  )
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove();
  }
});


</script>

<template>
  <div ref="mapRef" class="full-map">
    asdfsfdSDSFDSF
  </div>
</template>

<style>
.full-map {
  width: 100%;
  height: 100%;
}
</style>
