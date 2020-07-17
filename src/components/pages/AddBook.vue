<template>
  <div class="container mt-2 mb-5 animate__animated animate__bounce">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Add New Book</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label>Book Title</label>
                <input
                  type="text"
                  v-model="book.title"
                  class="form-control"
                  placeholder="Write here book's title."
                />
              </div>
              <div class="form-group">
                <label>Author</label>
                <input
                  type="text"
                  v-model="book.author"
                  class="form-control"
                  placeholder="Write here author's name."
                />
              </div>
              <div class="form-group">
                <label>Total Pages</label>
                <input
                  type="number"
                  v-model="book.pages"
                  class="form-control"
                  placeholder="Write here book's total page."
                />
              </div>
              <div class="form-group">
                <label>Genre</label>
                <select class="form-control" v-model="book.genre">
                  <option value disabled selected>Select Book Genre</option>
                  <option v-for="(genre,index) in genres" :key="index">{{genre}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Summary</label>
                <textarea
                  v-model="book.summary"
                  cols="30"
                  rows="3"
                  class="form-control"
                  placeholder="Write here book's summary."
                />
              </div>
              <div class="form-group">
                <label>Picture Url</label>
                <input
                  type="text"
                  v-model="book.img"
                  class="form-control"
                  placeholder="Write here book's picture url."
                />
              </div>
              <button class="btn btn-primary">Add Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customaxios from "../../customaxios";
import { mixin } from "../../mixins/genres";
export default {
  mixins: [mixin],
  data() {
    return {
      book: {
        title: "",
        author: "",
        pages: "",
        genre: "",
        summary: "",
        rating: 0,
        votecounter: 0,
        img: ""
      },
      key: null
    };
  },
  methods: {
    onSubmit() {
      console.log(this.book);
      customaxios
        .post("/books.json", this.book)
        .then(response => {
          console.log(response);
          setTimeout(() => {
                    customaxios.patch("/books/" + response.data.name + ".json", { key: response.data.name })
                }, 1000)
          this.$router.push("/");
        })
    }
  }
};
</script>

<style>
</style>