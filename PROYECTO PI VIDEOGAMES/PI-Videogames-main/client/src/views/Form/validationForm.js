const validationForm = (form) => {
  const errors = {};

  if (form.name.length < 4 || form.name.length > 20) {
    errors.name = "Debe tener mas de 4 caracteres y menos de 20";
  }
  if (form.description.length < 4 || form.description.length > 250) {
    errors.description = "Debe tener mas de 4 caracteres y menos de 250";
  }
  if (form.rating < 1 || form.rating > 5) {
    errors.rating = "La calificacion debe ir entre 1 y 5";
  }
  if (!isValidDate(form.released)) {
    errors.released = "*Formato invalido. Ejemplo aaaa-mm-dd";
  }
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(form.background_image)) {
    errors.background_image = "Debe ser un link";
  }

  return errors;
};
const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export default validationForm;
