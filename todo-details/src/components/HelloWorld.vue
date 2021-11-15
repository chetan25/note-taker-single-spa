<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button
      class="LoginButton"
      @click="loginUser"
    >
      Login
    </button>
  </div>
</template>

<script>
import { login } from '@todos/shared-state';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    async loginUser() {
      await login('test', 'pass');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
