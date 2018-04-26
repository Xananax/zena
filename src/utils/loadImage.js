const cache = {}

export const loadFreshImage = (src) => new Promise((ok, no) => {

  const image = document.createElement('img')
  const resolve = () => {
    image.onerror = null
    image.onload = null
    ok(image)
    // setTimeout(() => ok(image), 100000)
  }
  image.onload = resolve
  image.onerror = no
  image.src = src;
  if (image.complete) {
    resolve()
  }
})

export const loadImage = (src, invalidate=false) => {
  if(invalidate){ cache[src]=false }
  if(!cache[src]){
    cache[src] = loadFreshImage(src)
  }
  return cache[src]
}

export const loadImages = (images, callback) =>
  Promise.all(images.map(
    src => loadImage(src)
      .then(image => {
        callback && callback(null, image);
        return image
      })
      .catch(err => {
        callback && callback(err);
      })
  ))