import Swal from 'sweetalert2';
import axios from 'axios';


const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: 'Un proyecto eliminado no puede recuperarse',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {

                const url = `${location.origin}/proyectos/${urlProyecto}`;
                //enviar petición a axios
                axios.delete(url, { params: { urlProyecto } }).then(function (resp) {
                    //console.log(resp);
                    Swal.fire(
                        'Eliminado',
                        resp.data,
                        'success'
                    )
                    //redireccionar al inicio
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000);
                })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })
            }
        })
    })
}
export default btnEliminar;