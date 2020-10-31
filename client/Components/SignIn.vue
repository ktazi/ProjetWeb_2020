<template>
  <div>
    <form @submit="connectUser">
      <h2>Se connecter</h2>
      <div>
        <label>
          <input type="email" v-model="user.email" placeholder="email" required>
        </label>
      </div>
      <div>
        <label>
          <input type="password" v-model="user.password" placeholder="mot de passe" required>
        </label>
      </div>
      <div>
        <button type="submit">Connexion</button>
      </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  data(){
    return{
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    connectUser(){
      console.log(this.user)
      this.$emit('connect-user', this.user)
    }
  }

}
</script>