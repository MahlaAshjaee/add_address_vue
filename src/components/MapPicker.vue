<template>
  <div class="relative">
    <LMap :zoom="15" :center="mapCenter" style="height: 350px; width: 100%">
      <LTileLayer :url="url" />
      <LMarker :lat-lng="marker" draggable @update:lat-lng="updateMarker" />
    </LMap>
    <button
      type="button"
      @click="locateUser"
      class="absolute bottom-3 right-3 bg-white border border-gray-300 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition focus:outline-none"
      :title="'مکان فعلی من'"
      style="z-index: 1001"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="7.25" stroke="#0075FF" stroke-width="1.5" />
        <circle cx="10" cy="10" r="2.25" fill="#0075FF" />
        <path stroke="#0075FF" stroke-width="1.2" d="M10 2.5v2M17.5 10h-2M10 17.5v-2M2.5 10h2" />
      </svg>
    </button>
    <div
      v-if="error"
      class="absolute top-3 right-3 bg-red-100 text-xs text-red-600 px-3 py-1 rounded shadow"
      style="z-index: 1100"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const props = defineProps(["defaultLatLng"]);
const emit = defineEmits(["selected"]);

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const mapCenter = ref(props.defaultLatLng || [35.715298, 51.404343]);
const marker = ref([...mapCenter.value]);
const error = ref("");
const mapKey = ref(0);

function updateMarker(val) {
  marker.value = val;
}

function submitMap() {
  emit("selected", { lat: marker.value[0], lng: marker.value[1] });
}
defineExpose({ submitMap });


function locateUser() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapCenter.value = [latitude, longitude];
        marker.value = [latitude, longitude];
        error.value = "";
        mapKey.value = Math.random();
      },
      (err) => {
        error.value = err?.message || "اجازه دسترسی به موقعیت یا گرفتن لوکیشن ناموفق بود.";
        setTimeout(() => (error.value = ""), 3500);
      },
    );
  } else {
    error.value = "مرورگر شما موقعیت مکانی را پشتیبانی نمی‌کند.";
    setTimeout(() => (error.value = ""), 3500);
  }
}
</script>
