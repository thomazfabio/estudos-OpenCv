var input_file_img = document.getElementById('imput-img');
var btn_upload = document.getElementById('btn-upload');
var img_input = document.getElementById('img-input');

// abre o input file ao clicar no botão carrergar imagem
btn_upload.addEventListener('click', () => {
   input_file_img.click();
});

// pega imagem do imput e colocar no src da tag img de entrada
input_file_img.addEventListener('change',  (e) => {
  img_input.src = URL.createObjectURL(e.target.files[0]);
}, false);