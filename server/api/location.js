export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  console.log("Runtime config:", config);

	if (process.server) {
		console.log("from locationJs API secret:", config.apiSecret);
  }
  // handle query params
  // const { search } = useQuery(event)
  // console.log("event",event);
  
	// let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${config.apiKey}&ipAddress=${search}`
	// if (search.startsWith('www')) {
	// 	console.log('its a domain');
	// 	url = `https://geo.ipify.org/api/v2/country,city?apiKey=${config.apiKey}&domain=${search}`
	// }

  // const res = $fetch(url);
  
  return {
    name: search
  }
})

/*
<script setup>
const count = ref(1)
const { data } = await useFetch(() => `/api/hello/${count.value}`, { params: { token: 123 } })
</script>
*/