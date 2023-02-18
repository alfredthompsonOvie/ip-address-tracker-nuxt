<template>
	<section id="container__map">
		<section id="mapContainer" ref="map" v-if="!error"></section>
	</section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
export default {
	name: "BaseMap",
	props: {
		lat: {
			type: Number,
			required: true,
		},
		lng: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const map = ref(null);

		const setupLeafletMap = () => {
			map.value = L.map("mapContainer").setView([51.513, -0.09], 13);
			L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map.value);
		};

		onMounted(() => {
			setupLeafletMap();
		});
		onBeforeUnmount(() => {
			if (map.value) {
				map.value.remove();
			}
		});
		watch(props, () => {
			map.value.panTo(L.latLng(props.lat, props.lng));
			L.marker([props.lat, props.lng]).addTo(map.value);
		})

		return {
			map,
		};
	},
};
</script>

<style scoped>
#container__map {
	width: 100%;
	height: 100%;
}
#mapContainer {
	width: 100%;
	height: 100%;
}
/* .errorContainer {
	height: inherit;
	width: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
}
.error {
	font-style: italic;
	color: red;
	font-size: 1.2rem;
} */
</style>
