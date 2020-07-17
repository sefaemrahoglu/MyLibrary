<template>
  <div class="panel w-100">
    <div class="panel-heading text-center w-100" style="border-bottom: 1px solid">
      <h4>
        <strong>Reviews</strong>
      </h4>
    </div>

    <div v-for="(review,index) in getReview"
        :key="index">
      <div
        class="card mb-1"
        style="border-bottom: 1px solid"
        
       >
        <div class="card-body" >
          <h4 class="card-title">
            <strong>Review Title :</strong>
            {{review.title}}
          </h4>
          <p>
            <strong>Username :</strong>
            {{review.userId}}
          </p>
          <p>
            <strong>Rating :</strong>
            {{review.rating}}
            &nbsp;
            <i
              style="color:#35495e;"
              :class="'fas fa-star'"
            ></i>
          </p>
          <p>
            <strong>Review :</strong>
            {{review.userreview}}
          </p>
        </div>

      </div>
      
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      book: null,
      counter: 0
    };
  },
  computed: {
    ...mapGetters(["getReview"])
  },
  created() {
    setTimeout(() => {
      this.book = this.$store.getters.getBookDetails.title;

    }, 300);
    setTimeout(() => {
      this.$store.dispatch("getReviewsFromDatabase", this.book);
      console.log(this.getReview);
    }, 350);
  },

};
</script>

<style>
</style>