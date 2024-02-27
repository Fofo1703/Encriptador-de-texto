const textarea = document.getElementById('message');

textarea.addEventListener('input', function () {
	this.style.height = 'auto'; // Restaura la altura a la altura automática predeterminada
	this.style.height = this.scrollHeight + 'px'; // Establece la altura según el contenido

});



function elementView() {//oculta o muestra los elementos
	document.getElementById('copy-button').style.display = "block";
	document.getElementById('dowland-button').style.display = "block";
	document.getElementById('result').style.display = "block";
	document.getElementById('image-doll').style.display = "none";
	document.getElementById('message1').style.display = "none";
	document.getElementById('message2').style.display = "none";
}



function encryptText() {
	let text = document.getElementById(`message`).value;

	if (text.trim() !== "") {

		let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
		for (let i = 0; i < matrixCode.length; i++) {
			if (text.includes(matrixCode[i][0])) {
				text = text.replaceAll(matrixCode[i][0], matrixCode[i][1])//sustituye el valor original por uno nuevo 
			}
		}

		var mediaQuery = window.matchMedia("(max-width: 1300px)");

		document.getElementById(`result`).value = text;

		document.getElementById(`message`).value = null;

		document.getElementById(`message`).dispatchEvent(new Event('input'));

		///////
		var right = document.querySelector(".right");
		var elementsRight = document.querySelector(".elements-right");
		var mediaQuery = window.matchMedia("(max-width: 1300px)");

		// Verifica si la media query se cumple
		if (mediaQuery.matches) {
			// Ajusta la altura solo si la media query se cumple
			right.classList.add("right-expanded");
			elementsRight.classList.add("elements-right-expanded");
		}

		/////

		elementView();


	} else {
		documentError(`No has ingresado ningun texto`);
	}

} 


function decryptText() {
	let text = document.getElementById(`message`).value;

	if (text.trim() !== "") {

		let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
		for (let i = 0; i < matrixCode.length; i++) {
			if (text.includes(matrixCode[i][1])) {
				text = text.replaceAll(matrixCode[i][1], matrixCode[i][0]); //sustituye el valor nuevo por el original
			}

		}
		document.getElementById(`result`).value = text;

		document.getElementById(`message`).value = null;

		document.getElementById(`message`).dispatchEvent(new Event('input'));

		elementView();

	} else {
		documentError(`No has ingresado ningun texto`);
	}

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
		documentError(`Formato de archivo no compatible!`);

	}
}

document.addEventListener('DOMContentLoaded', function () {
	var copiarBtn = document.getElementById('copy-button');

	copiarBtn.addEventListener('click', function () {
		copyContent();
	});

	function copyContent() {
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

		successfulCopying()
	}
});

function downloadDocument() {
	const content = document.getElementById('result').value;
	const documentName = 'documento.txt'; // Puedes cambiar el nombre del archivo según tu preferencia

	// Crea un objeto Blob con el contenido del textarea
	const blob = new Blob([content], { type: 'text/plain' });

	// Crea un enlace para descargar el archivo
	const downloaLink = document.createElement('a');
	downloaLink.href = URL.createObjectURL(blob);
	downloaLink.download = documentName;

	// Simula un clic en el enlace de descarga
	document.body.appendChild(downloaLink);
	downloaLink.click();

	// Elimina el enlace de descarga
	document.body.removeChild(downloaLink);
}
