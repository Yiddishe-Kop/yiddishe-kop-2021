export const useLightbox = () => {
  return useState('lightbox', () => ({
    open: false,
    originalPosition: {
      top: null,
      left: null,
      width: null,
      height: null,
    },
    imageSrc: null,
  }))
}
