<template>
  <div class="container mt-2 mb-5">
    <div class="row mt-2 mb-2 ">
      <div v-if="getBooks.length>0">
        <div class="col-sm-4  p-1 animate__animated animate__shakeX" v-for="(book, index) in getBooks" :key="index">
          <div class="card " >
            <div class="row " >
              <div class="col-6" style="height:250px">
                <div class="card-body" >
                  <h5 >
                    <strong>Title:</strong>
                    {{book.title}}
                  </h5>
                  <h5>
                    <strong>Author:</strong>
                    {{book.author}}
                  </h5>
                  <h5>
                    <strong>Rating:</strong>
                    {{book.rating}}
                  </h5>
                  <p class="card-text">
                    <strong>Genre:</strong>
                    {{book.genre}}
                  </p>

                </div>
              </div>
              <div class="col-6 m-0">
                <div class="card-body">
                  <img
                    class="card-img-top" style="height:250px"
                    :src="book.img"
                    alt="Card image cap"
                  />
                </div>
              </div>
              
            </div>
            <button class="btn btn-primary " @click="sendDetails(book)">Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("getBooksFromDatabase");
    console.log();
    
  },
  computed: {
    ...mapGetters(["getBooks"])
  },
  methods : {
    sendDetails(book) {
      this.$store.commit("setDetailBook", book );
      this.$router.push("book-details/"+ book.key + "/" + book.title);
    }

  }
};
</script>

<style>
</style>