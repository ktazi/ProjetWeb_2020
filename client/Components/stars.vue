<template>
  <span class="fa fa-star"></span>
  <span class="fa fa-star"></span>
  <span class="fa fa-star"></span>
  <span class="fa fa-star"></span>
  <span class="fa fa-star"></span>
</template>
<script>
module.exports = {
  props : ['note'],
  data() {
    return {}
  },
  mounted()
  {
    console.log(this.note);
  }
}
</script>
<style>
</style>