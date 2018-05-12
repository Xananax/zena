export const handleSubmit = (cb) => (evt) => {
  evt.preventDefault();
  evt.stopPropagation(); 
  const form = evt.target;
  cb(form)
}