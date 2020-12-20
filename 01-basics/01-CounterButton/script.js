import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  template: '<button @click="addCount">{{ count }}</button>',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addCount() {
      this.count += 1;
    }
  }
})
