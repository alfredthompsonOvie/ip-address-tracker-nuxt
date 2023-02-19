<template>
	<section id="container__map">
		<section id="mapID" class="mapContainer"></section>
	</section>
</template>

<script setup>
import L from "leaflet";
const props = defineProps({
	lat: {
		type: Number,
		required: true,
	},
	lng: {
		type: Number,
		required: true,
	},
});

let map;
onMounted(() => {
	map = L.map("mapID").setView([51.513, -0.09], 13);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	map.panTo(L.latLng(props.lat, props.lng));
	L.marker([props.lat, props.lng]).addTo(map);
});
watch(props, () => {
	map.panTo(L.latLng(props.lat, props.lng));
	L.marker([props.lat, props.lng]).addTo(map);
});
</script>

<style scoped>
#container__map {
	width: 100%;
	height: 100%;
	background-color: blue;
}
.mapContainer {
	/* background-color: red; */
	width: 100%;
	/* width: inherit; */
	height: 100%;
}
</style>
