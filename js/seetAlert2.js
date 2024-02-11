function successfulCopying() {
    Swal.fire({
        icon: "success",
        title: "¡Contenido copiado!",
        showConfirmButton: false,
        timer: 1500
    });

}

function documentError(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,

    });

}