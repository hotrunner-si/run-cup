<template>
  <div class="course-map">
    <div ref="mapEl" class="map"></div>

    <div class="profile" v-if="points.length">
      <svg
        ref="svgEl"
        :viewBox="`0 0 ${width} ${height}`"
        @mousemove="onProfileMove"
        @mouseleave="clearHover"
        @click="focusHover"
      >
        <path :d="areaPath" class="profile-area" />
        <path :d="linePath" class="profile-line" />

        <line
          v-if="hoverPoint"
          :x1="hoverX"
          :x2="hoverX"
          y1="10"
          :y2="height - 28"
          class="profile-cursor"
        />

        <circle
          v-if="hoverPoint"
          :cx="hoverX"
          :cy="hoverY"
          r="5"
          class="profile-dot"
        />

        <text x="10" y="20" class="profile-label">
          {{ minEle.toFixed(0) }}–{{ maxEle.toFixed(0) }} m
        </text>

        <text
          v-if="hoverPoint"
          :x="Math.min(hoverX + 10, width - 130)"
          :y="hoverY - 10"
          class="profile-tooltip"
        >
          {{ hoverPoint.distance.toFixed(1) }} km · {{ hoverPoint.ele.toFixed(0) }} m
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'

const props = defineProps({
  gpxFile: {
    type: String,
    required: true
  }
})

const mapEl = ref()
const svgEl = ref()

let map = null
let hoverMarker = null
let routeLine = null

const points = ref([])
const hoverIndex = ref(null)

const width = 900
const height = 220
const pad = {
  left: 24,
  right: 24,
  top: 18,
  bottom: 32
}

const hoverPoint = computed(() =>
  hoverIndex.value !== null ? points.value[hoverIndex.value] : null
)

const minEle = computed(() => Math.min(...points.value.map(p => p.ele)))
const maxEle = computed(() => Math.max(...points.value.map(p => p.ele)))
const totalDistance = computed(() => points.value.at(-1)?.distance || 0)

const xScale = distance =>
  pad.left +
  (distance / totalDistance.value) *
    (width - pad.left - pad.right)

const yScale = ele => {
  const range = maxEle.value - minEle.value || 1
  return (
    pad.top +
    (1 - (ele - minEle.value) / range) *
      (height - pad.top - pad.bottom)
  )
}

const linePath = computed(() => {
  if (!points.value.length) return ''

  return points.value
    .map((p, i) => {
      const x = xScale(p.distance)
      const y = yScale(p.ele)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
})

const areaPath = computed(() => {
  if (!points.value.length) return ''

  const bottom = height - pad.bottom
  const first = points.value[0]
  const last = points.value.at(-1)

  return `
    M ${xScale(first.distance)} ${bottom}
    ${linePath.value.replace(/^M/, 'L')}
    L ${xScale(last.distance)} ${bottom}
    Z
  `
})

const hoverX = computed(() =>
  hoverPoint.value ? xScale(hoverPoint.value.distance) : 0
)

const hoverY = computed(() =>
  hoverPoint.value ? yScale(hoverPoint.value.ele) : 0
)

onMounted(async () => {
  map = L.map(mapEl.value)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  const gpx = new L.GPX(props.gpxFile, {
    async: true,
    polyline_options: {
      color: '#e53935',
      weight: 5,
      opacity: 0.85
    },
    marker_options: {
      startIconUrl: null,
      endIconUrl: null,
      shadowUrl: null
    }
  })

  gpx.on('loaded', async e => {
    map.fitBounds(e.target.getBounds())

    await loadElevationProfile()

    routeLine = e.target
    map.on('mousemove', onMapMove)
    map.on('mouseleave', clearHover)
  })

  gpx.addTo(map)
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})

async function loadElevationProfile() {
  const res = await fetch(props.gpxFile)
  const gpxText = await res.text()
  const xml = new DOMParser().parseFromString(gpxText, 'application/xml')

  const trkpts = [...xml.querySelectorAll('trkpt')]

  let distance = 0
  let previous = null

  points.value = trkpts
    .map(node => {
      const lat = Number(node.getAttribute('lat'))
      const lng = Number(node.getAttribute('lon'))
      const ele = Number(node.querySelector('ele')?.textContent || 0)

      const current = { lat, lng, ele }

      if (previous) {
        distance += haversine(previous, current)
      }

      previous = current

      return {
        lat,
        lng,
        ele,
        distance: distance / 1000
      }
    })
    .filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng))
}

function onProfileMove(event) {
  const rect = svgEl.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * width

  const ratio =
    (x - pad.left) /
    (width - pad.left - pad.right)

  const distance = Math.max(
    0,
    Math.min(totalDistance.value, ratio * totalDistance.value)
  )

  const index = nearestByDistance(distance)
  setHover(index)
}

function onMapMove(event) {
  if (!points.value.length || !map) return

  let bestIndex = 0
  let bestDistance = Infinity

  points.value.forEach((p, index) => {
    const screenPoint = map.latLngToLayerPoint([p.lat, p.lng])
    const distance = screenPoint.distanceTo(event.layerPoint)

    if (distance < bestDistance) {
      bestDistance = distance
      bestIndex = index
    }
  })

  if (bestDistance < 35) {
    setHover(bestIndex)
  }
}

function setHover(index) {
  hoverIndex.value = index

  const point = points.value[index]
  if (!point || !map) return

  const latLng = [point.lat, point.lng]

  if (!hoverMarker) {
    hoverMarker = L.circleMarker(latLng, {
      radius: 7,
      color: '#ffffff',
      weight: 3,
      fillColor: '#e53935',
      fillOpacity: 1
    }).addTo(map)
  } else {
    hoverMarker.setLatLng(latLng)
  }
}

function clearHover() {
  hoverIndex.value = null

  if (hoverMarker) {
    hoverMarker.remove()
    hoverMarker = null
  }
}

function focusHover() {
  if (!hoverPoint.value || !map) return

  map.flyTo([hoverPoint.value.lat, hoverPoint.value.lng], 15, {
    duration: 0.6
  })
}

function nearestByDistance(distance) {
  let bestIndex = 0
  let bestDiff = Infinity

  points.value.forEach((p, index) => {
    const diff = Math.abs(p.distance - distance)

    if (diff < bestDiff) {
      bestDiff = diff
      bestIndex = index
    }
  })

  return bestIndex
}

function haversine(a, b) {
  const R = 6371000
  const toRad = deg => (deg * Math.PI) / 180

  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)

  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2

  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}
</script>

<style scoped>
.course-map {
  display: grid;
  gap: 1rem;
}

.map {
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
}

.profile {
  background: linear-gradient(180deg, var(--bg-card), rgba(255,255,255,0.03));
  border-radius: 12px;
  padding: 0.75rem;
  overflow: hidden;
}

.profile svg {
  width: 100%;
  height: auto;
  display: block;
  cursor: crosshair;
}

.profile-area {
  fill: rgba(229, 57, 53, 0.16);
}

.profile-line {
  fill: none;
  stroke: #e53935;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.profile-cursor {
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.profile-dot {
  fill: #e53935;
  stroke: #fff;
  stroke-width: 2;
}

.profile-label,
.profile-tooltip {
  fill: currentColor;
  font-size: 13px;
  font-weight: 600;
}

.profile-tooltip {
  paint-order: stroke;
  stroke: var(--bg-card);
  stroke-width: 5px;
}

@media (max-width: 768px) {
  .map {
    height: 320px;
  }
}
</style>