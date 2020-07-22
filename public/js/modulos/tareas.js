import Axios from "axios";
import Swal from 'sweetalert2';

const tareas = document.querySelector('.listado-pendientes');
if (tareas) {
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            //hacer request a /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            Axios.patch(url, { idTarea })
                .then(function (resp) {
                    if (resp.status === 200) {
                        icono.classList.toggle('completo');
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: 'Una tarea eliminada no puede recuperarse',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.value) {
                    //enviar delete por Axios
                    Axios.delete(url, { params: { idTarea } })
                        .then(function (resp) {
                            console.log(resp);
                        })
                }
            })
        }
    })
}
export default tareas;