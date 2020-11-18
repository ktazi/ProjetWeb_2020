<template>
  <div class="mb-0" id="image">
    <div class="row">
      <div class="col-xl-9 col-lg-10 mx-auto text-center">
        <div class="bg-faded p-5">
          <h1 class="section-heading mb-4">
            <span class="section-heading-upper">Ma recette</span>
          </h1>
          <p> Et la Kenza on peut mettre le texte :)</p>
        </div>
      </div>
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
    background-image: url("fofo.png");
    height: 1000px;

  }
  .bg-faded {
    background-color: rgba(255,255,255,.95);
    display: block;
    margin-top: 100px;
  }
  <img src="fofo.png" height="1125" width="1932"/><img src="fofo.png" height="1125" width="1932"/></style>