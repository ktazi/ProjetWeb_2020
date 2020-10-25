<template>
  <div id="main">
    <div>
        <div class="jumbotron mb-0" :style="{ backgroundImage: 'url(' + recipe.picture + ')', backgroundSize: 'cover' }">
          <div v-if="display_title">
            <div class="row justify-content-center">
              <h1 class="mr-5 display-3">{{recipe.title}}</h1>
              <button @click="title" class="btn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
          </div>
          <div v-else>
            <div>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Titre" id="titre">
              </div>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="URL de la photo ici" id="url">
                <div class="input-group-append">
                  <button class="btn btn-secondary" type="button" @click="update_title">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="row justify-content-center border-bottom pt-2 " >
        <h2>Tags : </h2>
        <div v-if="display_tag" class="row justify-content-center pt-2 ">
          <ul class="" v-for="tag in recipe.tag" style="list-style: none">
            <li class="">{{tag}}</li>
          </ul>
          <button @click="tag" class="btn">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>
        <div v-else class="row justify-content-center pt-2 ">
          <ul v-for="(tag,index) in recipe.tag" style="list-style: none; padding-left: 0.5vw">
            <li class="ml-2"><div class="input-group"><input type="text" class="form-control" :value="tag" :id="'tag'+index">
              <button class="btn input-group-append btn-secondary" @click="rem_tag(index)">-</button></div></li>
          </ul>
          <button class="btn btn-secondary ml-2 " @click="add_tag">+</button>
          <button class="btn btn-secondary ml-2" @click="update_tag(true)">OK</button>
        </div>
      </div>
        <div class="row">
          <div class="col-3 text-center border-right bg-light pt-5 pb-5" >
            <div class="mb-5">
              <h3 class="mb-5">Ingrédients</h3>
              <div v-if="display_ing">
                <ul class="list-group list-group-flush " v-for="ing in recipe.ing">
                  <li class="mb list-group-item bg-light">
                    <p class="lead">{{ing}}</p>
                  </li>
                </ul>
                <button @click="ing" class="btn">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </button>
              </div>
              <div v-else>
                <ul v-for="(ing,index) in recipe.ing" style="list-style: none; padding-left: 0.5vw">
                  <li><div class="input-group"><input type="text" class="form-control" :value="ing" :id="'ing'+index">
                    <button class="btn input-group-append btn-secondary" @click="rem_ing(index)">-</button></div></li>
                </ul>
                <button class="btn btn-secondary" @click="add_ing">+</button>
                <button class="btn btn-secondary" @click="update_ing(true)">OK</button>
              </div>

            </div>
            <div>
              <h3 class="mb-5">Materiel</h3>
              <div v-if="display_mat">
                <ul class="list-group list-group-flush" v-for="mat in recipe.mat">
                  <li class="mb list-group-item bg-light">
                    <p class="lead">{{mat}}</p>
                  </li>
                </ul>
                <button @click="mat" class="btn">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </button>
              </div>
              <div v-else>
                <ul v-for="(mat,index) in recipe.mat" style="list-style: none; padding-left: 0.5vw">
                  <li><div class="input-group"><input type="text" class="form-control" :value="mat" :id="'mat'+index">
                    <button class="btn input-group-append btn-secondary" @click="remMat(index)">-</button></div></li>
                </ul>
                <button class="btn btn-secondary" @click="addMat">+</button>
                <button class="btn btn-secondary" @click="update_mat(true)">OK</button>
              </div>
            </div>
          </div>
          <div class="col-9  border-right pt-5 pb-5 pl-5 pr-5" >
            <h1 class="mb-5">Étapes : </h1>
            <div v-if="display_steps">
              <ul v-for="step in recipe.steps">
                <li>
                  <p class="font-weight-light mb-5">{{step}}</p>
                </li>
              </ul>
              <button @click="steps" class="btn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
            <div v-else>
              <ul v-for="(steps,index) in recipe.steps" style="list-style: none; padding-left: 0.5vw">
                <li><div class="input-group"><textarea type="text" class="form-control" :value="steps" :id="'step'+index"></textarea>
                  <button class="btn input-group-append btn-secondary" @click="remStep(index)">-</button></div></li>
              </ul>
              <button class="btn btn-secondary" @click="addStep">+</button>
              <button class="btn btn-secondary" @click="update_step(true)">OK</button>
            </div>
          </div>
        </div>
    </div>


  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      display_title : true,
      display_ing : true,
      display_mat : true,
      display_steps : true,
      display_tag : true,
      recipe : {
        title : "Sans Titre",
        picture : "https://static.vecteezy.com/system/resources/previews/001/183/293/non_2x/neutral-low-poly-abstract-banner-vector.jpg",
        mat : ["Listez le matériel ici"],
        ing : ["ingredient 1", "ingredient 2"],
        tag : ["tag 1", "tag 2"],
        steps : ["Listez les étapes de la recette ici."]
      }
    }
  },
  methods : {
    update_title(){
      let titre = document.getElementById("titre").value;
      if(titre !== "")
        this.recipe.title = titre;
      let url = document.getElementById("url").value;
      if(url !== "")
        this.recipe.picture = url;
      this.title();
    },

    title(){
      this.display_title = ! this.display_title;
    },
    mat(){
      this.display_mat = ! this.display_mat;
    },
    addMat(){
      this.update_mat(false);
      this.recipe.mat.push("...")
    },
    remMat(index){
      this.update_mat(false);
      this.recipe.mat.splice(index,1)
    },
    update_mat(display){
      let mat = []
      let i = 0
      let el = document.getElementById('mat'+i);
      while (el !== null) {
        mat.push(el.value)
        i++
        el = document.getElementById('mat'+ i)
      }
      this.recipe.mat = mat;
      this.display_mat = display;
    },

    steps(){
      this.display_steps = ! this.display_steps;
    },
    addStep(){
      this.update_step(false);
      this.recipe.steps.push("...")
    },
    remStep(index){
      this.update_step(false);
      this.recipe.steps.splice(index,1)
    },
    update_step(display){
      let steps = []
      let i = 0
      let el = document.getElementById('step'+i);
      while (el !== null) {
        steps.push(el.value)
        i++
        el = document.getElementById('step'+ i)
      }
      this.recipe.steps = steps;
      this.display_steps = display;
    },
    ing(){
      this.display_ing = ! this.display_ing;
    },
    add_ing(){
      this.update_ing(false);
      this.recipe.ing.push("...")
    },
    rem_ing(index){
      this.update_ing(false);
      this.recipe.ing.splice(index,1)
    },
    update_ing(display){
      let ing = []
      let i = 0
      let el = document.getElementById('ing'+i);
      while (el !== null) {
        ing.push(el.value)
        i++
        el = document.getElementById('ing'+ i)
      }
      this.recipe.ing = ing;
      this.display_ing = display;
    },
    tag(){
      this.display_tag = ! this.display_tag;
    },
    add_tag(){
      this.update_tag(false);
      this.recipe.tag.push("...")
    },
    rem_tag(index){
      this.update_tag(false);
      this.recipe.tag.splice(index,1)
    },
    update_tag(display){
      let tag = []
      let i = 0
      let el = document.getElementById('tag'+i);
      while (el !== null) {
        tag.push(el.value)
        i++
        el = document.getElementById('tag'+ i)
      }
      this.recipe.tag = tag;
      this.display_tag = display;
    }




  }


}
</script>
<style>
 p{
   font-size: 1.5rem;
 }
</style>