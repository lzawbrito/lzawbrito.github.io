<script>
</script>

<template>

	<div class="title">
		<RouterLink to="/" class="title-content">lzawbrito</RouterLink>
		<div class="subtitle">(Lucas Z. Brito)</div>
	</div>
</template>

<style scoped>
/* .title span, span:after {
  font-family: 'Computer Modern Sans', sans-serif;
  font-weight: bold;
  font-size: 40px;
	white-space: nowrap;
} */
.title-content {
	display: block;
	color: inherit;
	font-family: var(--serif-font), Garamond, serif;
	font-weight: bold;
	font-size: 40px;
	white-space: nowrap;
	margin-bottom: -10px;
}

.subtitle {
  font-family: var(--serif-font), Garamond, serif;
  font-style: italic;
  font-size: 16px;
}

.title{
  margin-bottom: 5px;
}
.title-content:hover {
	text-decoration: none;
}
</style>