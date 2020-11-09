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
                <form class="w-75" @submit="connectUser">
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Adresse email" required autofocus>
                    <label for="inputEmail">Adresse email</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Mot de Passe" required>
                    <label for="inputPassword">Mot de Passe</label>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" @click="Message">Se connecter</button>
                </form>
              </div>
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
      user: { // utilsateur
        email: '',
        password: ''
      }
    }
  },
  props:{
    users: {type: Array, default: []} //bdd permettant de récuérer le valeurs de ma base de données
  },
  methods: {
    connectUser(){
      for(let i=0; i< this.users.length; i++){
        console.log(this.users[i].email, this.user.email)
        if(this.users[i].email === this.user.email){
          console.log(this.users[i].password, this.user.password)
          console.log(this.users[i].password===this.user.password)
          return this.users[i].password === this.user.password
        }
      }
      this.$emit('connect-user')
    },
    Message(){
      var msg="Connexion établie";
      console.log(msg)
      alert(msg);
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
</style>