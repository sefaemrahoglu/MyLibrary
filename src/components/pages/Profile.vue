<template>
  <div class="container mt-2 mb-5 animate__animated animate__jackInTheBox">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="panel border" style="border-radius:25px;" v-if="getUser.length!=0">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Your Profile Details</h3>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <p>
                <strong>Username</strong>
                <br />{{getUser[0].username}}
              </p>
              <p>
                <strong>First Name</strong>
                <br />{{getUser[0].firstName}}
              </p>
              <p>
                <strong>Last Name</strong>
                <br />{{getUser[0].lastName}}
              </p>
              <p>
                <strong>E-mail</strong>
                <br />{{getUser[0].userEmail}}
              </p>
              <p>
                <strong>Birthday</strong>
                <br />{{getUser[0].birthday}}
              </p>
              <p>
                <strong>Gender</strong>
                <br />{{getUser[0].gender}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  
  created(){
    this.$store.dispatch("userDetail", localStorage.getItem("email") );
    
    
  },
  computed: {
    ...mapGetters(["getUser"]),
    
  },
};
</script>

<style>
</style>