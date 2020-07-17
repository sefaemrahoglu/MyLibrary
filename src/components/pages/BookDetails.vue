<template>
  <div class="container mt-2 mb-5 animate__animated animate__fadeInDownBig">
    <div class="row">
      <div class="panel w-100">
        <div class="panel-heading text-center w-100">
          <h4>
            <strong>Book Information</strong>
          </h4>
        </div>

        <div class="panel-body">
          <div class="col-sm-12 col-lg-6 form-group">
            <p>
              <strong>Book Title :</strong>
              {{getBookDetails.title}}
            </p>
            <p>
              <strong>Author :</strong>
              {{getBookDetails.author}}
            </p>
            <p>
              <strong>Total Page :</strong>
              {{getBookDetails.pages}}
            </p>
            <p>
              <strong>Genre :</strong>
              {{getBookDetails.genre}}
            </p>
            <p>
              <strong>Rating :</strong>
              {{getBookDetails.rating}}
              &nbsp;
              <i class="fas fa-star"></i>
            </p>
            <p>
              <strong>Vote Count :</strong>
              {{getBookDetails.votecounter}}
            </p>
            <p>
              <strong>Summary :</strong>
              {{getBookDetails.summary}}
            </p>
            <button class="btn btn-primary" @click="edit(getBookDetails)">Edit</button>
            &nbsp;
          </div>
          <div class="col-sm-12 col-lg-6 text-center">
            <img :src="getBookDetails.img" width="150px" />
          </div>
        </div>
      </div>
      
      <app-ListButtons></app-ListButtons>
      <app-WriteaReview></app-WriteaReview>
      <app-Reviews></app-Reviews>
    </div>
  </div>
</template>

<script>
import WriteaReview from "../bookDetailsPage/WriteaReview";
import Reviews from "../bookDetailsPage/Reviews";
import ListButtons from "../bookDetailsPage/ListButtons";
import { mapGetters } from "vuex";

export default {
  components: {
    appWriteaReview: WriteaReview,
    appReviews: Reviews,
    appListButtons: ListButtons
  },
  computed: {
    ...mapGetters(["getBookDetails"])
  },
  methods: {
    edit(value) {
      this.$router.push("/edit-book/" + value.key + "/" + value.title);
    }
  },
  created () {
    if (this.getBookDetails.length == 0) {
      this.$store.dispatch("getBookWithKey", this.$route.fullPath.split('/')[2])
    }
    
  }

};
</script>

<style scoped lang="scss">
@import "../../scss/style.scss";
</style>