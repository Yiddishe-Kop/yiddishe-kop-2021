export default {
  methods: {
    getImgSrc(src) {
      return src[0] == '/' ? src : `https://source.unsplash.com/${src}`
    },
  },
}
