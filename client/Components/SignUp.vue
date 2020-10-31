<template>
  <div>
    <form @submit.prevent="createUser">
      <h2>S'inscrire</h2>
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
        <button type="submit">Inscription</button>
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
  methods: {
    createUser(){
      console.log(this.user)
      this.$emit('create-user', this.user)
    }
  }
}
</script>