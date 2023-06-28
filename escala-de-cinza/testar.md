// Carregar a imagem
let src = cv.imread('imagem.jpg');

// Converter para escala de cinza
let srcGray = new cv.Mat();
cv.cvtColor(src, srcGray, cv.COLOR_RGBA2GRAY);

// Binarizar a imagem (opcional, dependendo da imagem)
let threshold = 128;
let maxValue = 255;
cv.threshold(srcGray, srcGray, threshold, maxValue, cv.THRESH_BINARY);

// Realizar operações morfológicas para limpar o ruído e completar o fechamento dos contornos
let kernel = cv.Mat.ones(3, 3, cv.CV_8U);
cv.morphologyEx(srcGray, srcGray, cv.MORPH_CLOSE, kernel);
cv.morphologyEx(srcGray, srcGray, cv.MORPH_OPEN, kernel);

// Encontrar os contornos na imagem
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
cv.findContours(srcGray, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

// Desenhar os contornos na imagem original
for (let i = 0; i < contours.size(); i++) {
  cv.drawContours(src, contours, i, [0, 255, 0, 255], 2, cv.LINE_8, hierarchy, 0);
}

// Exibir a imagem resultante
cv.imshow('resultado', src);
cv.waitKey();

// Liberar memória
src.delete();
srcGray.delete();
contours.delete();
hierarchy.delete();
cv.destroyAllWindows();
