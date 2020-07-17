<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Log In</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="logIn">
              <div class="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Write here your E-mail."
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Write here your password."
                />
              </div>
              <button class="btn btn-primary">Log in</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("loginToken", {...this.user});
    }
  }
};
</script>

<style>
</style>