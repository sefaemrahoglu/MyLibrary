<template>
  <div class="panel w-100">
    <div class="panel-heading text-center w-100" v-if="tokenControl">
      <button class="btn btn-danger" @click="removeAtReadList" v-if="this.x>0">Remove at Read List</button>&nbsp;
      <button class="btn btn-success" @click="addReadList" v-else>Add Read List</button>
      &nbsp;
      <button
        class="btn btn-danger"
        @click="removeAtReadLaterList"
        v-if="this.y>0"
      >Remove at Read Later List</button>&nbsp;
      <button class="btn btn-success" @click="addReadLaterList" v-else>Add Read Later List</button>
    </div>

    <div class="panel-heading text-center w-100" v-else>
      <p>Please sign in to add this book to a list.</p>
      <router-link class="btn btn-warning" tag="button" to="/sign-in">Sign in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listInfo: {
        userId: null,
        bookId: null
      },
      tokenControl: false,
      readList: null,
      x: null,
      readLaterList: null,
      y: null
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.tokenControl = true;
    }

    this.$store.dispatch("userDetail", localStorage.getItem("email"));
    

    setTimeout(() => {
      if (this.$store.getters.getUser.length!= 0) {
        this.listInfo.userId = this.$store.getters.getUser[0].username;
        this.listInfo.bookId = this.$store.getters.getBookDetails.title;
      }
    }, 300);
    setTimeout(() => {
      this.$store.dispatch("getReadInfoFromDatabase", this.listInfo);
      this.$store.dispatch("getReadLaterInfoFromDatabase", this.listInfo);
    }, 500);
    setTimeout(() => {
      this.readList = this.$store.getters.getReadList;
      this.readLaterList = this.$store.getters.getReadLaterList;

      this.x = this.readList.length;
      this.y = this.readLaterList.length;
    }, 700);
  },
  methods: {
    addReadList() {
      console.log(this.listInfo);
      this.x = this.x + 1;
      this.$store.dispatch("addReadList", this.listInfo);
    },
    addReadLaterList() {
      console.log(this.listInfo);
      this.y = this.y + 1;
      this.$store.dispatch("addReadLaterList", this.listInfo);
    },
    removeAtReadList() {
      console.log(this.listInfo);
      this.x = this.x - 1;
      this.$store.dispatch("deleteAtReadList", this.readList[0].key);
    },
    removeAtReadLaterList() {
      console.log(this.listInfo);
      this.y = this.y - 1;
      this.$store.dispatch("deleteAtReadLaterList", this.readLaterList[0].key);
    }
  }
};
</script>

<style>
</style>