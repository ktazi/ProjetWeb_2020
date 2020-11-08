<template>
  <div class="mb-0">
    <div id="recette" class="w-75 bg-white text-center">
      <h1 class="display-2 mt-5">Test</h1>
      <div class="row">
        <div class="col-4 ">
          <div class="row">
            <div class="col list-group-flush">
              <h3 class="text-center w-50 mb-4">Ingrédients</h3>
              <ul  class="list-group-item w-50" v-for="item in recette.ing" style="list-style: none">
                <li >{{item}}</li>
              </ul>
            </div>
            <div class="col list-group-flush">
              <h3 class="text-center w-50 mb-4">Matériel</h3>
              <ul  class="list-group-item w-50" v-for="mat in recette.mat" style="list-style: none">
                <li >{{mat}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col border">
          2 of 2
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
        titre : "Titre",
        ing : ['wfwefwefwefwef',2,3,4,3,2,1,2,21,2,2],
        mat : [1,2,3,1,2,21,2,1,2,1,2],

      }
    }
  }
}
</script>
<style>
  #recette{
    margin-right: auto;
    margin-left: auto;
  }
</style>