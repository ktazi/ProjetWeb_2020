<script>
Vue.component('stars', {
  props: ['note'],
  mounted() {
    if (this.note !== undefined) {
      for (let i = 1; i <= 5; i++) {
        this.stars.push(this.note >= i);
      }
    }
  },
  data: function () {
    return {
      stars: []
    }
  },
  template: `
    <div>
    <p>Moyenne : {{ this.note }} </p>
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
      recettes: [],
      user: {
        pic: 'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
        name: '',
        met: '',
        email: '',
      },
      sup: 0
    };
  },
  methods: {
    supprimer(rid) {
      this.sup = rid;
    },
    async delete_recette() {
      await axios.delete('/api/recette', {data: {rid: this.sup.toString()}})
      location.reload();
    },
    async logout() {
      await axios.post('/api/logout');
      location.replace('http://localhost:3000/#/SignIn')
    }
  },
  async mounted() {
    let userId = await axios.get('/api/me');
    if (userId.data.length === 0) {
      alert("Veuillez vous connecter")
      location.replace('http://localhost:3000/?#/SignIn')
    }
    this.user.name = userId.data[0].nam
    this.user.pic = userId.data[0].pic
    this.user.email = userId.data[0].email
    this.user.met = userId.data[0].mett
    this.recettes = await axios.get('/api/myrecettes')
    this.recettes = this.recettes.data
  }
}
</script>

<template>
  <div>
    <div>
      <div class="jumbotron text-center text-dark pb-2 pt-5" id="user">
        <img :src="user.pic" class="mb-2 rounded-circle" height="200vw" width="200vw">
        <h1 class="display-4">{{ user.name }}</h1>
        <p class="lead">{{ user.email }}</p>
        <p class="blockquote">{{ user.met }}</p>
        <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal2">Logout</button>
      </div>
    </div>
    <h2 class="display-4 text-center" style="color:#424874">Mes recettes</h2>
    <div class="text-center mt-5 mb-5">
      <router-link :to="{ path : '/recette-create/'+ '-1' }" tag="button" class="btn btn-outline-secondary">Créer une
        nouvelle recette
      </router-link>
    </div>
    <div class="jumbotron mb-0" id="groupe">
      <ul v-for="recette in recettes" class="list-group-item w-75" id="liste">
        <li class="media list-group-item-light flex-xl-row flex-lg-row flex-md-row flex-sm-column">
          <img :src='recette.picture' alt="image" width="200vw" height="200vw">
          <div class="media-body">
            <h5 class="mt-0 mb-1">{{ recette.title }}</h5>
            <br>
            <div class="row ml-2">
              <div v-for="tag in recette.tag">
                <p class="mr-1">{{ tag }}</p>
              </div>
            </div>
          </div>
          <div class="flex-column">
            <stars :note="recette.note"></stars>
            <router-link :to="{ path : '/recette-create/'+ recette.rid }" tag="button"
                         class="btn btn-outline-secondary">Editer
            </router-link>
            <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal"
                    @click="supprimer(recette.rid)">Supprimer
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Suppression de la recette</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Vous êtes sur le point de supprimer la recette. Voulez-vous continuer ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="delete_recette">Supprimer la
              recette
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Deconnexion de l'utilisateur</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Voulez-vous vraiment vous déconnecter ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="logout">Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
#user {
  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/bright-squares.png");
}

#liste {
  margin-left: auto;
  margin-right: auto;
}

#groupe {
  background-color: #424874;
  background-image: url("https://www.transparenttextures.com/patterns/3px-tile.png");
}
</style>