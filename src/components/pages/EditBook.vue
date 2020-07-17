<template>
  <div class="container mt-2 mb-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Edit Book</h3>
          </div>
          <div class="panel-body">
            <form>
              <div class="form-group">
                <label>Book Title</label>
                <input type="text" class="form-control" v-model="getBookDetails.title" />
              </div>
              <div class="form-group">
                <label>Author</label>
                <input type="text" class="form-control" v-model="getBookDetails.author" />
              </div>
              <div class="form-group">
                <label>Total Pages</label>
                <input type="text" class="form-control" v-model="getBookDetails.pages" />
              </div>
              <div class="form-group">
                <label>Genre</label>
                <select class="form-control" v-model="getBookDetails.genre">
                  <option
                    :selected="genre==getBookDetails.genre"
                    v-for="(genre,index) in genres"
                    :key="index"
                  >{{genre}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Summary</label>
                <textarea cols="30" rows="3" class="form-control" v-model="getBookDetails.summary" />
              </div>
              <div class="form-group">
                <label>Picture Url</label>
                <input type="text" v-model="getBookDetails.img" class="form-control" />
              </div>
              <button class="btn btn-primary" @click.prevent="updateBook">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../mixins/genres";
import { mapGetters } from "vuex";
import customaxios from "../../customaxios";
export default {
  mixins: [mixin],
  data() {
    return {
      book: null
    };
  },

  computed: {
    ...mapGetters(["getBookDetails"])
  },
  mounted() {
    this.book = this.$store.getters.getBookDetails;
    this.book2 = this.$store.getters.getBookDetails;
    
  },
  created(){
    if (this.getBookDetails.length == 0) {
      this.$store.dispatch("getBookWithKey", this.$route.fullPath.split('/')[2])
    }
  },
  methods: {
    updateBook() {

        customaxios
          .put("/books/" + this.$route.fullPath.split('/')[2] + ".json", this.book)
          .catch(e => console.log(e));
      
      this.$router.push("/");
    }
  },

};
</script>

<style>
</style>