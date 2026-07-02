<template>
  <div class="course-map">
    <div ref="mapEl" class="map"></div>

    <div class="elevation-wrap">
      <canvas ref="chartEl"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

const props = defineProps({
  gpxFile: {
    type: String,
    required: true
  }
})

const mapEl = ref(null)
const chartEl = ref(null)

let map = null
let routeLayer = null
let marker = null
let chart = null

onMounted(async () => {
  await nextTick()
  initMap()
  loadGpx(props.gpxFile)
})

watch(
  () => props.gpxFile,
  file => {
    if (file) loadGpx(file)
  }
)

onBeforeUnmount(() => {
  if (chart) chart.destroy()
  if (map) map.remove()
})

function initMap() {
  map = L.map(mapEl.value, {
    scrollWheelZoom: false
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map)
}

async function loadGpx(file) {
  try {
    const response = await fetch(file)
    const gpxText = await response.text()

    const points = parseGpx(gpxText)

    if (!points.length) return

    drawMap(points)
    drawElevationChart(points)
  } catch (error) {
    console.error('Napaka pri nalaganju GPX datoteke:', error)
  }
}

function parseGpx(gpxText) {
  const xml = new DOMParser().parseFromString(gpxText, 'application/xml')
  const trkpts = [...xml.querySelectorAll('trkpt')]

  let totalDistance = 0
  let previous = null

  return trkpts.map(point => {
    const lat = Number(point.getAttribute('lat'))
    const lng = Number(point.getAttribute('lon'))
    const ele = Number(point.querySelector('ele')?.textContent || 0)

    if (previous) {
      totalDistance += distanceBetween(previous.lat, previous.lng, lat, lng)
    }

    previous = { lat, lng }

    return {
      lat,
      lng,
      ele,
      distance: totalDistance
    }
  })
}

function drawMap(points) {
  if (routeLayer) routeLayer.remove()
  if (marker) marker.remove()

  const latLngs = points.map(p => [p.lat, p.lng])

  routeLayer = L.polyline(latLngs, {
    weight: 6,
    opacity: 0.9
  }).addTo(map)

  marker = L.circleMarker(latLngs[0], {
    radius: 6,
    weight: 2,
    fillOpacity: 1
  }).addTo(map)

  routeLayer.on('mousemove', event => {
    const index = findClosestPointIndex(event.latlng, points)
    const point = points[index]

    marker.setLatLng([point.lat, point.lng])
    setChartHover(index)
  })

  routeLayer.on('mouseout', () => {
    if (!chart) return
    chart.setActiveElements([])
    chart.tooltip.setActiveElements([], { x: 0, y: 0 })
    chart.update()
  })

  map.fitBounds(routeLayer.getBounds(), {
    padding: [24, 24]
  })
}

function findClosestPointIndex(latlng, points) {
  let closestIndex = 0
  let closestDistance = Infinity

  points.forEach((point, index) => {
    const distance = map.distance(
      latlng,
      L.latLng(point.lat, point.lng)
    )

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

function setChartHover(index) {
  if (!chart) return

  const meta = chart.getDatasetMeta(0)
  const pointElement = meta.data[index]

  if (!pointElement) return

  chart.setActiveElements([
    {
      datasetIndex: 0,
      index
    }
  ])

  chart.tooltip.setActiveElements(
    [
      {
        datasetIndex: 0,
        index
      }
    ],
    {
      x: pointElement.x,
      y: pointElement.y
    }
  )

  chart.update()
}

function drawElevationChart(points) {
  if (chart) chart.destroy()

  chart = new Chart(chartEl.value, {
    type: 'line',
    data: {
      labels: points.map(p => p.distance.toFixed(1)),
      datasets: [
        {
          data: points.map(p => p.ele),
          fill: true,
          tension: 0.25,
          pointRadius: context => {
            return context.active ? 4 : 0
          },
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: items => `${items[0].label} km`,
            label: item => `${Math.round(item.raw)} m`
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Razdalja (km)'
          },
          ticks: {
            maxTicksLimit: 8
          }
        },
        y: {
          title: {
            display: true,
            text: 'Višina (m)'
          }
        }
      },
      onHover: (_, elements) => {
        if (!elements.length || !marker) return

        const index = elements[0].index
        const point = points[index]

        marker.setLatLng([point.lat, point.lng])
      }
    }
  })
}

function distanceBetween(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function toRad(value) {
  return (value * Math.PI) / 180
}
</script>

<style scoped>
.course-map {
  width: 100%;
}

.map {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}

.elevation-wrap {
  width: 100%;
  height: 220px;
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 10px;
}

@media (max-width: 768px) {
  .map {
    height: 320px;
  }

  .elevation-wrap {
    height: 180px;
  }
}
</style>