<template>
  <div class="mb-0" id="image">
      <div class="container bg-light w-75" id="r">
        <h1 class="text-center">Test</h1>
      </div>
    </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      recette : {
        title : "Sans Titre",
        picture : "https://www.wallpaperflare.com/static/363/962/392/minimalism-low-poly-white-gray-wallpaper.jpg",
        mat : ["Listez le matériel ici"],
        ing : ["Listez vos ingredients ici"],
        tag : ["#vos tags ici"],
        steps : ["Listez les étapes de la recette ici."],
        rid : 0
      }
    }
  }
}
</script>
<style>
  #image{
    background-image : url("https://www.wallpapertip.com/wmimgs/77-776716_high-resolution-pizza-background.jpg");
    background-repeat: no-repeat;
    height: 1080px;
    border : 1px solid black;
  }
</style>