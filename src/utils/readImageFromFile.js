window.URL = window.URL || window.webkitURL;

export const readImageFromFile = (file) => new Promise(( resolve, reject )=>{
  
  if(!file) { return reject(new Error('no file provided'))}

  const extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
  if(!(extension === "gif" || extension === "png" || extension === "jpeg" || extension === "jpg")){
    return resolve({ file, extension })
  }

  const image = new Image();
  
  image.onload = () => {
      const { naturalHeight:height, naturalWidth:width } = image
      window.URL.revokeObjectURL( image.src );
      return resolve({ file, image, width, height, extension })
  };

  image.onerror = reject
    
  image.src = window.URL.createObjectURL(file);
})

export default readImageFromFile