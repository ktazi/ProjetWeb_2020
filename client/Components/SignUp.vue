<template>
  <form class="w-75" id="po">
    <div class="text-center">
      <h1 class="display-4 mt-5 mb-5 text-center">Connexion</h1>
        <div class="form-group col-md-6" id="pi">
          <label for="inputEmail4"></label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Adresse mail">
        </div>
        <div class="form-group col-md-6" id="pi">
          <label for="pass1"></label>
          <input type="password" class="form-control" id="pass1" placeholder="Mot de passe">
        </div>
      <button type="submit" class="btn btn-outline-primary mt-5">Se connecter</button>
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
    users: {type: Array, default: []} //bdd
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
      this.$emit('connect-user', this.user)
    }
  }
}
</script>
<style>
#pi{
  margin-right: auto;
  margin-left: auto ;
}
#po{
  margin-right: auto;
  margin-left: auto ;
  box-shadow: 1px 1px 12px black;
  padding: 1em;
}
.btn-outline-primary{
  background-color: #424874;
  color: white;
  border: solid 1px #424874;
}
footer{
  border: aqua;
}
</style>