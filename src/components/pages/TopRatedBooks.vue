<template>
  <div class="container animate__animated animate__rubberBand">
    <div class="row">
      <div class="col-12">
        <div class="panel border" style="border-radius:25px;">
          <div
            class="panel-heading border text-center"
            style="background-color: #35495e; color:white; border-radius:25px 25px 0px 0px;"
          >
            <h3>Top Rated Books</h3>
          </div>
          <div class="panel-body" style="width: 100%; border:1px solid red">
            <div class="">
              <table class="table table-hover table-responsive-sm table-bordered text-center" >
              <thead>
                <tr>
                  <th scope="col" class="text-center">#</th>
                  <th scope="col" class="text-center"></th>
                  <th scope="col" class="text-center">Book Title</th>
                  <th scope="col" class="text-center">Author</th>
                  <th scope="col" class="text-center">Rating</th>
                  <th scope="col" class="text-center">Vote Count</th>
                </tr>
              </thead>
              <tbody v-for="(book, index) in books" :key="index">
                <tr>
                  <th class="text-center">{{index+1}}</th>
                  <td>
                    <img :src="book.img" height="60" />
                  </td>
                  <td>{{book.title}}</td>
                  <td>{{book.author}}</td>
                  <td>{{book.rating}}</td>
                  <td>{{book.votecounter}}</td>
                </tr>
              </tbody>
            </table>
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
      books: null,

    };
  },
  methods:{
    compare(a,b){
      const x = Number(a.rating);
      const y = Number(b.rating);

      let comp = 0
      if(x > y){
        comp = 1
      }
      else if(x < y){
        comp = -1
      }
      return comp
    }
  },

  created() {
    this.$store.dispatch("getBooksFromDatabase");
    setTimeout(() => {
      this.books = this.$store.getters.getBooks;
      this.books.sort(this.compare)
      this.books.reverse()
    }, 500);
    
  },

};
</script>

<style>
</style>