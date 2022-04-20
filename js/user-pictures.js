const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const image = document.querySelector('img');
const imageInput = document.querySelector ('.img-upload__input');

// Выбор фотографии пользователя
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);
  }
});
