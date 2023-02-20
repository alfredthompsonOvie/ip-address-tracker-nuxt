<template>
	<section class="container">
		<section class="ip__contents">
			<header>
				<h1 class="heading">IP Address Tracker</h1>
			</header>
			<!-- form -->
			<form @submit="onSubmit" :class="{ formErr: errors.search }">
				<label for="search"></label>
				<input
					type="search"
					id="search"
					name="search"
					placeholder="Search for any IP address or domain"
					class="search"
					:class="{ error: errors.search }"
					v-model.lazy="search"
				/>
				<p class="errMsg">{{ errors.search }}</p>

				<button type="submit" class="submitBtn">
					<img src="@/assets/icon-arrow.svg" alt="search button" />
				</button>
			</form>
			<!-- details -->
			<Transition name="slideDown" appear>
				<IpDetails 
				:ip="ip"
				:location="location"
				:isp="isp"
				:timezone="timezone"
				:city="city"
				v-if="results"
				/>
			</Transition>
		</section>
		<section class="map">
			<ClientOnly>
				<BaseMap :lat="lat" :lng="lng" />
			</ClientOnly>
		</section>

		<!--  -->
	</section>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";
import BaseMap from "@/components/BaseMap.vue";
import IpDetails from "~~/components/IpDetails.vue";

const ip = ref("");
const location = ref("");
const city = ref("");
const timezone = ref("");
const isp = ref("");
const lat = ref(0);
const lng = ref(0);

const results = ref(null);

onBeforeMount(async () => {
	try {
		// get device ip
		const res = await fetch('https://api.ipify.org?format=json')
		const d = await res.json()
		console.log(d);
		const { data } = await useFetch(`/api/locate/${d.ip}`)
		console.log("data.value",data.value);
		console.log("data",data);

		
		ip.value = data.value.ip;
		location.value = data.value.location.region;
		city.value = data.value.location.city;
		timezone.value = data.value.location.timezone;
		isp.value = data.value.isp;
		lat.value = data.value.location.lat;
		lng.value = data.value.location.lng;
		results.value = true;
	} catch (err) {
		console.log(err);
	}
})

function isDomain(str) {
	// www.example.com
	let re = /^(www)[\.](\w+[\.]?)+\w+[\.][a-z]{2,3}$/;
	return re.test(str);
}
function checkIp(str) {
	// both ipv4 and ipv6
	let ip =
		/^([0-1]?\d{2}?|2?\d?[0-5]?)((\.[0-1]?\d{2}?)|(\.2?\d?[0-5]?)){3}$|^[0-9a-f]{4}?(:[0-9a-f]{4}?){7}$/g;
	return ip.test(str);
}

const schema = object({
	search: string().test(
		"isValidIPorDomain",
		"must be a valid ip address or a domain www.example.com",
		(value, context) => checkIp(value) || isDomain(value)
	),
});

const { handleSubmit, errors, resetForm } = useForm({
	validationSchema: schema,
});
const { value: search } = useField("search");



const onSubmit = handleSubmit(async (values) => {
	results.value = false;
	const search = values.search;
	const { data } = await useFetch(`/api/locate/${search}`)

	ip.value = data.value.ip;
	location.value = data.value.location.region;
	city.value = data.value.location.city;
	timezone.value = data.value.location.timezone;
	isp.value = data.value.isp;
	lat.value = data.value.location.lat;
	lng.value = data.value.location.lng;

	results.value = true;
	resetForm();
});
</script>

<style scoped>
form {
	position: relative;
}
.formErr {
	margin-bottom: 4em;
}
input.error {
	border: 2px solid red;
}
.errMsg {
	position: absolute;
	top: 3.8em;
	left: 1em;
	z-index: 99;
	color: maroon;
	font-style: italic;
}

.slideDown-enter-from, .slideDown-leave-to {
	transform: translateY(-10px);
}
.slideDown-enter-active, .slideDown-leave-active {
	transition: all .3s linear;
}
</style>
