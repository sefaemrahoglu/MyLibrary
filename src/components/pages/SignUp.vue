<template>
  <div class="container mt-2 mb-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Sign Up</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="signUp">
              <div class="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  v-model="userInfo.firstName"
                  class="form-control"
                  placeholder="Write here your first name."
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  v-model="userInfo.lastName"
                  class="form-control"
                  placeholder="Write here your last name."
                />
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  v-model="userInfo.username"
                  class="form-control"
                  placeholder="Write here your user name."
                />
              </div>
              <div class="form-group">
                <label>Birthday</label>
                <input
                  type="date"
                  v-model="userInfo.birthday"
                  class="form-control"
                  placeholder="Write here your name."
                />
    
              </div>
              <div class="form-group">
                <label>Gender</label>
                <br />
                <label>
                  <input type="radio" value="female" v-model="userInfo.gender" /> &nbsp; Female
                </label>
                &nbsp;
                <label>
                  <input type="radio" value="male" v-model="userInfo.gender" /> &nbsp; Male
                </label>
              </div>
              <div class="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Write here your e-mail adress."
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
              <button class="btn btn-primary">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import customaxios from "../../customaxios";
import { router } from "../../router";
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      userInfo : {
        firstName: null,
        lastName: null,
        username: null,
        birthday: null,
        gender: null,
        userEmail : null
      }
    };
  },
  methods: {
    signUp() {
      {
        axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5vGhLAqBRC9napyjSRwhYHRSf-0bFMiQ",
          {
            email: this.user.email,
            password:  this.user.password,
            returnSecureToken: true
          }
        ).then(response =>{
          this.userInfo.userEmail = response.data.email
          customaxios.post("/users.json" , this.userInfo)
          .then(response => {
            console.log(response)
            router.replace("/log-in")
          })
        })
      }
    }
  }
};
</script>

<style>
</style>