import Vue from "vue";

Vue.prototype.$lightbox = Vue.observable({
  open: false,
  originalPosition: {
    top: null,
    left: null,
    width: null,
    height: null,
  },
  imageSrc: null
})
