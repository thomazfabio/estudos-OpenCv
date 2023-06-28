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
    imgCez.src = '/escala-de-cinza/img/no-image.png';
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
    imgOutCez.src = '/escala-de-cinza/img/no-image.png';
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

//aplicação avançada do processamento 

//Aplicação avançada do processamento de imagem
var imgImputFilepa = document.getElementById('file-input-pa');
var imgpa = document.getElementById('imput-img-pa');
var imgOutpa = document.getElementById('output-img-pa-pos');
var btnResetImgpa = document.getElementById('btn-resetar-img-pa');
var btnResetpaPos = document.getElementById('btn-resetar-img-pa-pos');
var btnprocessarImgpa = document.getElementById('btn-processar-img-pa');
var btnprocessarImgpaad = document.getElementById('btn-processar-img-pa-ad');
var canvasOutputpa = document.getElementById('canvas-output-pa');
//...

// pega imagem do imput e colocar no src da tag img de entrada
imgImputFilepa.addEventListener('change', (e) => {
    imgpa.src = URL.createObjectURL(e.target.files[0]);
    imgpa.style.border = '1px solid #fff';
}, false);

// reseta imagem pa
btnResetImgpa.addEventListener('click', function () {
    imgpa.src = '/escala-de-cinza/img/no-image.png';
    imgpa.style.border = "none";
});

// processa imagem pa e exibe no canvas de saida (escala de cinza)
btnprocessarImgpa.addEventListener('click', function () {
    let source = cv2.imread(imgpa);
    let dest = new cv2.Mat();
    cv.cvtColor(source, dest, cv2.COLOR_RGBA2GRAY, 0);
    imgOutpa.style.display = 'none';
    canvasOutputpa.style.display = 'block';
    canvasOutputpa.style.border = '1px solid #fff';
    cv.imshow(canvasOutputpa, dest);
    source.delete();
    dest.delete();
});

// ações do card output, resetar a imagem de saida
btnResetpaPos.addEventListener('click', function () {
    canvasOutput.style.display = 'none';
    imgOutpa.style.display = 'block';
    imgOutpa.src = '/escala-de-cinza/img/no-image.png';
    imgOutpa.style.border = "none";
});

//testes -----------------------------------------------------------------------------------------------

let limiar_inferior = 120;
let limiar_superior = 200;
btnprocessarImgpaad.addEventListener('click', function () {
  // Carregar a imagem
let image = cv2.imread(imgpa);

// Converter a imagem para escala de cinza
let gray = new cv.Mat();
cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY);

// Aplicar o desfoque gaussiano
let imgGauus = new cv.Mat();
cv.GaussianBlur(gray, imgGauus, new cv.Size(5, 5), 0);

// Binarizar a imagem
let thresholdedImage = new cv.Mat();
let thresholdValue = 50; // Valor de limiar
let maxBinaryValue = 255; // Valor máximo para os pixels binarizados
cv.threshold(imgGauus, thresholdedImage, thresholdValue, maxBinaryValue, cv.THRESH_BINARY);






let kernel = cv.Mat.ones(3, 3, cv.CV_8U);
let morphResult = new cv.Mat();
cv.morphologyEx(gray, morphResult, cv.MORPH_CLOSE, kernel);
cv.morphologyEx(morphResult, morphResult, cv.MORPH_OPEN, kernel);

// Aplicar o operador Canny para detecção de bordas
let edges = new cv.Mat();
cv.Canny(morphResult, edges, limiar_inferior, limiar_superior,3, false);


// Encontrar os contornos na imagem
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);


// Desenhar os contornos encontrados na imagem original
let contourImage = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC3);
for (let i = 0; i < contours.size(); i++) {
  cv.drawContours(contourImage, contours, i, new cv.Scalar(-1, 255, -1), 1, cv.LINE_8, hierarchy, 0);
}

// Exibir a imagem com os contornos

cv.imshow(canvasOutputpa, contourImage);


// Liberar memória
gray.delete();
edges.delete();
contours.delete();
hierarchy.delete();
contourImage.delete();
image.delete();


//..
});

//-------------------------------------------------------------------------------------------------------


// abre o input file ao clicar no botão carrergar imagem
document.getElementById('btn-upload-img-pa').addEventListener('click', function () {
    document.getElementById('file-input-pa').click();
});

//...