<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <h3 class="login-heading mb-4 display-4">Connexion</h3>
                <form class="w-75 text-center">
                  <div class="form-label-group">
                    <input type="email" v-model="user.email" id="inputEmail" class="form-control" placeholder="Adresse email">
                    <label for="inputEmail">Adresse email</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password" v-model="user.password" id="inputPassword" class="form-control" placeholder="Mot de Passe">
                    <label for="inputPassword">Mot de Passe</label>
                  </div>
                  <button type="submit" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" data-toggle="modal" data-target="#exampleModal" @click="connectUser">Se connecter</button>
                  <router-link to="/SignUp" id="lien">Pas encore inscrit ? Faites le ici !</router-link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" >Connexion de l'utilisateur</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{message}}
          </div>
          <div class="modal-footer">
            <div v-if="connect">
              <router-link to='/profile' data-dismiss="modal" class="btn btn-info">OK</router-link>
            </div>
            <div v-else>
              <button data-dismiss="modal" class="btn btn-danger">Réessayer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data(){
    return{
      user: {
        email: '',
        password: ''
      },
      message : '',
      connect : false
    }
  },
   async mounted(){
     let u = await axios.get('/api/me')
     if(u.data.length !== 0){
       alert('Veuillez vous déconnecter')
       location.replace('http://localhost:3000/?#/profile')
     }
   }
  ,
  methods: {
    async connectUser(){
      const res = await axios.post('/api/SignIn', this.user);
      console.log(res.data);
      this.message = res.data.message;
      this.connect = res.data.connect;
    }
  }
}
</script>
<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url('https://p0.storage.canalblog.com/05/69/149189/95538870.jpg');
  background-size: cover;
  background-position: center;
}
.login-heading {
  font-weight: 300;
}
.btn-login {
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  background-color: #424874;
  color: white;
  border: solid 1px #424874;
}
/* style champ à remplir*/
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}
.form-label-group>label {
  position: absolute;
  top: 0;
  display: block;
  margin-bottom: 0;
  cursor: text;
  border: 1px solid transparent;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}
.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #424874;
}
#lien{
  margin-left: auto;
  margin-right: auto;
}
</style>