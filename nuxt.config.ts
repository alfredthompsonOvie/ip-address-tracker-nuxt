// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		apiSecret: "123",
	},
	css: ["@/assets/main.css"],
	app: {
		head: {
			charset: "utf-8",
			title: "Ip Address Tracker | Alfred Thompson Ovie",
			meta: [
				{
					name: "description",
					content:
						"Frontend Mentor - IP address tracker coded by Alfred Thompson Ovie. This application helps you search for any IP addresses or domains and see the key information and location.",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
			],
			link: [
				{
					rel: "stylesheet",
					href: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css",
					integrity: "sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=",
					crossorigin: "",
				},
			],
		},
	},
});
