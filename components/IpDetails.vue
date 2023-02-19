<template>
	<section class="ip__details">
		<section class="data">
			<small>IP ADDRESS</small>
			<p class="result__data ip__address">{{ ip }}</p>
		</section>
		<section class="data">
			<small>LOCATION</small>
			<p class="result__data location">
				<span class="blockText location__code"
					>
          {{ location }} - {{ city }}
        </span>
			</p>
		</section>
		<section class="data">
			<small>TIMEZONE</small>
			<p class="result__data timezone">
				UTC
				<span class="time">{{ timezone }}</span>
			</p>
		</section>
		<section class="data">
			<small>ISP</small>
			<p class="result__data isp">
				<span class="blockText isp__block1">{{ isp }}</span>
				<span class="blockText isp__block2"></span>
			</p>
		</section>
	</section>
</template>

<script setup>
defineProps({
  ip: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  isp: {
    type: String,
    required: true
  },
})
</script>

<style lang="scss" scoped></style>
