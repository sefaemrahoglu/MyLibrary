<template>
  <div class="container animate__animated animate__zoomIn ">
    <div class="row">
      <div class="col-12">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Read List</h3>
          </div>
          <div class="panel-body m-0 p-0" >
            <div class="col-sm-3 m-0 p-0" v-for="(book,index) in readList" :key="index" >
              <div class="card-body text-center" >
                <img
                  class="card-img-top"
                  style="width:100px; height:175px; "
                  :src="book.img"
                  alt="x"
                />
                <br>
                <br>
                <button class="btn btn-primary w-100" @click="sendDetails(book)">{{book.title}}</button>
              </div>
            </div>
          </div>
        </div>

        <!-------------------------------------------------------------------------------------------->
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Read Later List</h3>
          </div>
          <div class="panel-body m-0 p-0">
            <div class="col-sm-3 m-0 p-0" v-for="(book,index) in readLaterList" :key="index" >
              <div class="card-body text-center" >
                <img
                  class="card-img-top"
                  style="width:100px; height:175px;"
                  :src="book.img"
                  alt="x"
                  
                />
                <br>
                <br>
                <button class="btn btn-primary w-100" @click="sendDetails(book)">{{book.title}}</button>
              </div>
            </div>
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
      userId: null,
      books: null,
      readList: [],
      readLaterList: [],
      readListFromDatabase: null,
      readLaterListFromDatabase: null
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.tokenControl = true;
    }
    this.$store.dispatch("userDetail", localStorage.getItem("email"));
    setTimeout(() => {
      this.userId = this.$store.getters.getUser[0].username;
    }, 500);
    setTimeout(() => {
      this.$store.dispatch("getBooksFromDatabase");
      this.$store.dispatch("getReadListFromDatabase", this.userId);
      this.$store.dispatch("getReadLaterListFromDatabase", this.userId);
    }, 700);
    setTimeout(() => {
      this.books = this.$store.getters.getBooks;
      this.readListFromDatabase = this.$store.getters.getReadList;
      this.readLaterListFromDatabase = this.$store.getters.getReadLaterList;
    }, 900);
    setTimeout(() => {
      for (let x = 0; x < this.readListFromDatabase.length; x++) {
        for (let y = 0; y < this.books.length; y++) {
          if (this.readListFromDatabase[x].bookId === this.books[y].title) {
            this.readList.push(this.books[y])
            
          }
        }
      }
      for (let x = 0; x < this.readLaterListFromDatabase.length; x++) {
        for (let y = 0; y < this.books.length; y++) {
          if (this.readLaterListFromDatabase[x].bookId === this.books[y].title) {
            this.readLaterList.push(this.books[y])
            
          }
        }
      }

    }, 1200);
  },
  methods : {
    sendDetails(book) {
      this.$store.commit("setDetailBook", book );
      this.$router.push("book-details/"+ book.title);
    }

  }
};
</script>

<style>
</style>