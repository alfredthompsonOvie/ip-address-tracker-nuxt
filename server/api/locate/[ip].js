const { apiSecret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const { ip } = event.context.params;

	let uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiSecret}&ipAddress=${ip}`;
	
  if (ip.startsWith("www")) {
		uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiSecret}&domain=${ip}`;
  }
  // console.log("uri =>", uri);
  
  const res = await $fetch(uri);
  //  console.log('from server', res);

  return res;
});
