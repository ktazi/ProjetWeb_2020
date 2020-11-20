<template>
  <div>
    <form class="w-75" id="po" @submit="createUser">
      <div class="text-center">
        <h1 class="display-4 mt-5 mb-5">Inscription</h1></div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" v-model="user.email" id="inputEmail4" placeholder="Adresse mail">
        </div>
        <div class="form-group col-md-6">
          <label for="inputusername">Pseudo</label>
          <input type="text" class="form-control" v-model="user.name" id="inputusername" placeholder="Pseudo">
        </div>
      </div>
      <div class="form-group">
        <label for="pass1">Mot de passe</label>
        <input type="password" class="form-control" v-model="user.password" id="pass1" placeholder="Mot de passe">
      </div>
      <div class="form-group">
        <div class="rounded-circle text-center mb-3 border" :style="{
        backgroundImage: 'url(' +user.pic + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height:'10vw',
        width: '10vw',
        display: 'table-cell',
        verticalAlign: 'middle',
      }">
          <p id="pp"></p>
        </div>
        <label for="picpic"></label>
        <div class="input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">Url</div>
          </div>
          <input type="text" v-model="user.pic" class="form-control" id="picpic"
                 placeholder="Url de votre photo de Profil">
          <button class="btn btn-outline-secondary" @click="editpic">OK</button>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">A propos de vous </label>
        <textarea v-model="user.metier" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-primary col w-25" data-toggle="modal" data-target="#exampleModal">
          Inscription
        </button>
        <br>
        <router-link to="/SignIn" id="lien">Déjà inscrit ? Connectez-vous ici</router-link>
      </div>
    </form>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Inscription de l'utilisateur</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <div v-if="inscription">
              <router-link to='/SignIn' data-dismiss="modal" class="btn btn-info">OK</router-link>
            </div>
            <div v-else>
              <router-link to='/SignIn' data-dismiss="modal" class="btn btn-info">Ecran de connexion</router-link>
              <button data-dismiss="modal" class="btn btn-danger">Retour</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      user: {
        name: '',
        metier: '',
        email: '',
        password: '',
        pic: 'https://thumbs.dreamstime.com/b/ligne-mince-ic-ne-de-chef-96296803.jpg'
      },
      message: 'Mauvais remplissage de champs',
      inscription: false
    }
  },
  methods: {
    async createUser() {
      let mes = await axios.post('/api/SignUp', this.user);
      this.inscription = mes.data.success
      this.message = mes.data.message
    },
    editpic() {
      if (document.getElementById('picpic').value !== '') {
        this.user.pic = document.getElementById('picpic').value
      }
    }
  }
}
</script>

<style>
#po {
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
  border-radius: 5px;
  box-shadow: 1px 1px 12px black;
}

#pp {
  color: white;
  mix-blend-mode: difference;
}

#coco {
  margin-left: auto;
  margin-right: auto;
}

.btn-outline-primary {
  background-color: #424874;
  color: white;
  border: solid 1px #424874;
}
</style>