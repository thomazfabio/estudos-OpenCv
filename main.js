let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');


inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function () {
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    //let dst = mat;
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow('canvasOutput', dst);
    src.delete();
    dst.delete();
};

//Exibe status de carregamento do opencvJs
var Module = {
    onRuntimeInitialized() {
        document.getElementById('status').innerHTML = 'OpenCV.js pronto.';
    }
};



