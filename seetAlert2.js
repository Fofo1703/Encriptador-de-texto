function successfulCopying() {
    Swal.fire({
        icon: "success",
        title: "¡Contenido copiado!",
        showConfirmButton: false,
        timer: 1500
    });

}

function documentError() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Formato de archivo no compatible!",

    });

}