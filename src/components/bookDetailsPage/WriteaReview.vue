<template>
  <div class="panel w-100">
    <div class="panel-heading text-center w-100">
      <h4>
        <strong>Write a Review</strong>
      </h4>
    </div>

    <div class="card mb-1" v-if="tokenControl">
      <div class="card-body">
        <div class="form-group">
          <label>Review Title</label>
          <input
            type="text"
            class="form-control"
            v-model="review.title"
            placeholder="Write a headline for your review."
          />
        </div>

        <div class="from-group">
          <label>Your Rating</label>
          <div class="input-lg p-0">
            <div class="rating" style="width: 260px">
              <ul class="list">
                <li
                  class="star"
                  @click="rate(star)"
                  v-for="star in maxStars"
                  :key="star"
                  :class="{ 'active':star<= review.rating, 'hover': review.rating <= star}"
                >
                  <i :class="star <= review.rating ? 'fas fa-star ' : 'far fa-star'"></i>
                </li>&nbsp;
                <span style="color: #35495e">{{review.rating}}/10</span>
              </ul>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Review</label>
          <textarea
            cols="30"
            rows="3"
            class="form-control"
            v-model="review.userreview"
            placeholder="Write your review here."
          />
        </div>

        <div class="btn btn-primary" @click="submitReview" v-if="!this.rewControl">Submit</div>
        <div class="btn btn-danger" @click="updateReview" v-if="this.rewControl">Update</div>
      </div>
    </div>
    <div class="card-body text-center" v-else>
      <p>Please sign in to post a review.</p>
      <router-link class="btn btn-warning" tag="button" to="/sign-in">Sign in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {
        title: null,
        rating: 0,
        userreview: null,
        bookId: null,
        userId: null,
        key: null
      },
      updateRating: {
        newrating: null,
        oldrating: null,
        updatebookId: null
      },
      maxStars: 10,
      rew: null,
      rewControl: false,
      tokenControl: false
    };
  },

  created() {
    if (localStorage.getItem("token")) {
      this.tokenControl = true;
    }

    this.$store.dispatch("userDetail", localStorage.getItem("email"));

    setTimeout(() => {
      if (this.$store.getters.getUser.length != 0) {
        this.review.userId = this.$store.getters.getUser[0].username;
      }
      this.review.bookId = this.$store.getters.getBookDetails.title;
      console.log(this.review);
      this.rew = this.$store.getters.getReview;
    }, 500);

    setTimeout(() => {
      for (let x in this.rew) {
        if (this.rew[x].userId === this.review.userId) {
          this.review = this.rew[x];
          this.updateRating.oldrating = this.rew[x].rating;
          this.updateRating.updatebookId = this.rew[x].bookId;
          this.rewControl = true;
          console.log(this.review);
          console.log(this.updateRating);
        }
      }
    }, 1000);
  },

  methods: {
    rate(star) {
      if (star <= this.maxStars && star >= 0) {
        this.review.rating = star;
        this.updateRating.newrating = star;
      }
    },
    submitReview() {
      this.$store.dispatch("sendRating", this.review);
      setTimeout(() => {
        this.$store.dispatch("sendReview", this.review);
      }, 500);
    },
    updateReview() {
      console.log(this.review);
      console.log(this.updateRating);
      if (this.updateRating.newrating === null) {
        this.updateRating.newrating = this.updateRating.oldrating;
      }

      this.$store.dispatch("updateReview", this.review);
      this.$store.dispatch("updateRating", this.updateRating);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/style.scss";
</style>