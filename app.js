
function encrypt() {
	document.getElementById('copy').style.display = "block";
	document.getElementById('result').style.display = "block";
	document.getElementById('image-doll').style.display = "none";
	document.getElementById('message1').style.display = "none";
	document.getElementById('message2').style.display = "none";

	let originaltext = document.getElementById(`message`).value;
	encryptText(originaltext);
}



function encryptText(text) {
	let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][0])) {
			text = text.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
		}
	}
	document.getElementById(`result`).value = text;
}


function decryptText() {
	let text = document.getElementById(`message`).value;
	let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][1])) {
			text = text.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
		}

	}
	document.getElementById(`result`).value = text;

}

function handleFile() {
	const input = document.getElementById('fileInput');
	const file = input.files[0];

	if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
		const reader = new FileReader();
		reader.onload = function (e) {
			const arrayBuffer = e.target.result;

			// Convierte el array buffer a una cadena
			const arrayBufferView = new Uint8Array(arrayBuffer);
			const blob = new Blob([arrayBufferView], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

			// Usa mammoth.js para extraer el texto
			mammoth.extractRawText({ arrayBuffer: arrayBufferView }).then(result => {
				const textoExtraido = result.value;

				document.getElementById(`message`).value = textoExtraido;
			});
		};

		reader.readAsArrayBuffer(file);
	} else {
		console.log("Formato de archivo no compatible");
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var copiarBtn = document.getElementById('copy');

	copiarBtn.addEventListener('click', function () {
		copiarContenido();
	});

	function copiarContenido() {
		var textarea = document.getElementById('result');

		// Crear un área de transferencia temporal
		var aux = document.createElement('textarea');
		aux.value = textarea.value;

		// Añadir el área de transferencia temporal al DOM
		document.body.appendChild(aux);

		// Seleccionar y copiar el texto
		aux.select();
		document.execCommand('copy');

		// Eliminar el área de transferencia temporal
		document.body.removeChild(aux);

		console.log('¡Contenido copiado!');
	}
});



