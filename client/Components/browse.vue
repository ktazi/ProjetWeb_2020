<template>
  <div>
    <h1 class="display-4  mt-3 mb-5 text-center">Recettes populaires</h1>
    <div class="ml-auto mr-auto w-25 text-center mb-4 ">
      <nav class="container-fluid w-25 pl-0 mt-3">
        <ul class="pagination">
          <li class="page-item">
            <button class="btn btn-outline-secondary" @click="compute_pagination(true)">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item"><button class="btn btn-outline-secondary" disabled>{{pagination}}</button></li>
          <li class="page-item">
            <button class="btn btn-outline-secondary"  @click="compute_pagination(false)">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-filter" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <button class="btn btn-outline-secondary mb-3" @click="alpha">Ordre Alphabétique</button>
      <button class="btn btn-outline-secondary mb-3" @click="best">Mieux notees</button>
    </div>
    <div id="allrecettes" class="pl-5 pr-5">
      <ul v-for="recette in recettes" class="list-group-item" id="liste">
        <li class="media list-group-item-light flex-xl-row flex-lg-row flex-md-row flex-sm-column">
          <img :src='recette.picture' alt="image" width="200vw" height="200vw">
          <div class="media-body">
            <p class="mt-0 mb-1">{{recette.title}}</p>
            <br>
            <div class="row ml-2">
              <div v-for="tag in recette.tag">
                <p class="mr-1">{{tag}}</p>
              </div>
            </div>
          </div>
          <div class="flex-column">
            <stars :note="recette.note"></stars>
            <button class="btn btn-outline-secondary" @click="">Consulter la recette</button>
            <button class="btn btn-outline-secondary" @click="attributeRid(recette.rid)" data-toggle="modal" data-target="#exampleModal">Noter</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="ml-auto  mr-auto w-25 text-center mb-4 ">
      <nav class="container-fluid w-25 pl-0 mt-3">
        <ul class="pagination">
          <li class="page-item">
            <button class="btn btn-outline-secondary" @click="compute_pagination(true)">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item"><button class="btn btn-outline-secondary" disabled>{{pagination}}</button></li>
          <li class="page-item">
            <button class="btn btn-outline-secondary"  @click="compute_pagination(false)">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-filter" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <button class="btn btn-outline-secondary mb-3" @click="alpha">Ordre Alphabétique</button>
      <button class="btn btn-outline-secondary mb-3" @click="best">Mieux notees</button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Attribuer une note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Entrez la note que vous voulez attribuer a la recette selectionnee</p>
            <label for="customRange3">Note : </label>
            <p id="test">5</p>
            <input type="range" class="custom-range" min="0" max="5" step="1" id="customRange3" @change="onChange($event)">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-primary" @click="noter" data-dismiss="modal">Noter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
Vue.component('stars', {
  props : ['note'],
  mounted(){
    if(this.note !== undefined){
      for(let i = 1; i <= 5; i++)
      {
        this.stars.push(this.note >= i);
      }
    }
  },
  watch :{
    note : function (newval){
      this.stars = []
      if(newval !== undefined){
        for(let i = 1; i <= 5; i++)
        {
          this.stars.push(newval >= i);
        }
      }
    }
  },
  data: function () {
    return {
      stars : []
    }
  },
  template: `<div >
  <p>Moyenne : {{this.note}} </p>
  <div class="row" style="margin-left: auto; margin-right: auto">
    <div v-for="star in stars">
      <div v-if="star">
        <p class="fa fa-star " style="color:orange"></p>
      </div>
      <div v-else>
        <p class="fa fa-star"></p>
      </div>
    </div>
  </div>

  </div>`
})
module.exports = {
  data() {
    return {
      recettes :[],
      rid : 0,
      noteval : 5,
      nbrecette : 0,
      pagination : 1,
      alphab : true
    }
  },
  async mounted(){
    let recette = await axios.post('/api/alpha',{offs :0})
    this.recettes = recette.data
    this.nbrecette = await axios.get('/api/numberRecette')
    this.nbrecette = this.nbrecette.data
  },
  methods :{
    onChange(event){
      document.getElementById("test").innerText = event.target.value
      this.noteval = event.target.value
    },
    async noter(){
      let test = await axios.post('/api/review', {note : this.noteval.toString(), rid : this.rid.toString()})
      alert(test.data.message)
      location.reload()
    },
    attributeRid(rid){
      this.rid = rid
    },
    async compute_pagination(prec){
      if(prec && this.pagination !== 1){
        this.pagination -= 1
        let recette
        if (this.alphab)
          recette = await axios.post('/api/alpha',{offs :this.pagination - 1})
        else
          recette = await axios.post('/api/best',{offs :this.pagination - 1})
        this.recettes = recette.data
      }
      else if (!prec && (5 * this.pagination) < this.nbrecette){
        this.pagination += 1
        let recette
        if (this.alphab)
          recette = await axios.post('/api/alpha',{offs :this.pagination - 1})
        else
          recette = await axios.post('/api/best',{offs :this.pagination - 1})
        this.recettes = recette.data
      }
    },
    async alpha(){
      this.pagination = 1
      let recette = await axios.post('/api/alpha',{offs :this.pagination - 1})
      this.recettes = recette.data
      this.alphab = true
    },
    async best(){
      this.pagination = 1
      let recette = await axios.post('/api/best',{offs :this.pagination - 1})
      this.recettes = recette.data
      this.alphab = false
    }
  }
}
</script>
