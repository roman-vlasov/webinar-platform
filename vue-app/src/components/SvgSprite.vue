<template>
  <svg :viewBox="icon.viewBox" :width="width" :height="width">
    <use :xlink:href="icon.url"></use>
  </svg>
</template>

<script>
  export default {
    name: "SvgSprite",
    props: ['icon', 'width', 'height']
  }
</script>

