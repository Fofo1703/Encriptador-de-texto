const textarea = document.getElementById('message');

textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Restaura la altura a la altura automática predeterminada
  this.style.height = this.scrollHeight + 'px'; // Establece la altura según el contenido
});



function elementView() {
	document.getElementById('copy').style.display = "block";
	document.getElementById('result').style.display = "block";
	document.getElementById('dowland-button').style.display = "block";
	document.getElementById('image-doll').style.display = "none";
	document.getElementById('message1').style.display = "none";
	document.getElementById('message2').style.display = "none";


}



function encryptText() {
	let text = document.getElementById(`message`).value;

	let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
	for (let i = 0; i < matrizCodigo.length; i++) {
		if (text.includes(matrizCodigo[i][0])) {
			text = text.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
		}
	}
	document.getElementById(`result`).value = text;

	document.getElementById(`message`).value = null;

	elementView();
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

	document.getElementById(`message`).value = null;

	elementView();
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

				    // Dispara el evento input para ajustar el tamaño del textarea
					document.getElementById(`message`).dispatchEvent(new Event('input'));
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

function descargarDocumento() {
	const contenido = document.getElementById('result').value;
	const nombreArchivo = 'documento.txt'; // Puedes cambiar el nombre del archivo según tu preferencia

	// Crea un objeto Blob con el contenido del textarea
	const blob = new Blob([contenido], { type: 'text/plain' });
  
	// Crea un enlace para descargar el archivo
	const enlaceDescarga = document.createElement('a');
	enlaceDescarga.href = URL.createObjectURL(blob);
	enlaceDescarga.download = nombreArchivo;
  
	// Simula un clic en el enlace de descarga
	document.body.appendChild(enlaceDescarga);
	enlaceDescarga.click();
  
	// Elimina el enlace de descarga
	document.body.removeChild(enlaceDescarga);
  }
