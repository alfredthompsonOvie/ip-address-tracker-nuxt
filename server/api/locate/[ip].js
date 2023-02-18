const { apiSecret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const { ip } = event.context.params;
	// console.log("ip => ent params",ip);
  // console.log("apiKey =>", apiSecret);


	let uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiSecret}&ipAddress=${ip}`;
	
  if (ip.startsWith("www")) {
		// console.log("its a domain", ip);
		uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiSecret}&domain=${ip}`;
  }
  // console.log("uri =>", uri);
  
  const res = await $fetch(uri);
  //  console.log('from server', res);

  return res;
});
