var imgImputFileCez = document.getElementById('file-input-cez');
var imgCez = document.getElementById('imput-img-cez');
var imgOutCez = document.getElementById('output-img-cez-pos');
var btnResetImgCez = document.getElementById('btn-resetar-img-cez');
var btnResetCezPos = document.getElementById('btn-resetar-img-cez-pos');
var btnprocessarImgCez = document.getElementById('btn-processar-img-cez');
var canvasOutput = document.getElementById('canvas-output-cez');
var cv2 = null; // variavel global para trabalhar com opencvJs

// trabalharemos com opencvJs aqui
window.onload = async function () {
    cv2 = cv; //carrega opencvJs
};

// pega imagem do imput e colocar no src da tag img de entrada
imgImputFileCez.addEventListener('change', (e) => {
    imgCez.src = URL.createObjectURL(e.target.files[0]);
    imgCez.style.border = '1px solid #fff';
}, false);

// reseta imagem CEZ
btnResetImgCez.addEventListener('click', function () {
    imgCez.src = '/img/no-image.png';
    imgCez.style.border = "none";
});

// processa imagem CEZ e exibe no canvas de saida (escala de cinza)
btnprocessarImgCez.addEventListener('click', function () {
    let source = cv2.imread(imgCez);
    let dest = new cv2.Mat();
    cv.cvtColor(source, dest, cv2.COLOR_RGBA2GRAY, 0);
    imgOutCez.style.display = 'none';
    canvasOutput.style.display = 'block';
    canvasOutput.style.border = '1px solid #fff';
    cv.imshow(canvasOutput, dest);
    source.delete();
    dest.delete();
});

// ações do card output, resetar a imagem de saida
btnResetCezPos.addEventListener('click', function () {
    canvasOutput.style.display = 'none';
    imgOutCez.style.display = 'block';
    imgOutCez.src = '/img/no-image.png';
    imgOutCez.style.border = "none";
});


// abre o input file ao clicar no botão carrergar imagem
document.getElementById('btn-upload-img-cez').addEventListener('click', function () {
    document.getElementById('file-input-cez').click();
});


//Exibe status de carregamento do opencvJs
var Module = {
    onRuntimeInitialized() {
        document.getElementById('status').innerHTML = 'OpenCV.js pronto.';
    }
};



