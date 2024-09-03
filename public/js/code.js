
const modalLibro = new bootstrap.Modal(document.getElementById('modalLibro'))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

// Seleccionar los campos del modal
const id_editar = document.getElementById('id_editar');
const titulo_editar = document.getElementById('titulo_editar');
const autor_editar = document.getElementById('autor_editar');
const precio_editar = document.getElementById('precio_editar');
const imagen_actual = document.getElementById('imagen_actual');


on(document, 'click', '.btnEditar', e => {
    const fila = e.target.closest('tr');
    id_editar.value = fila.children[0].innerHTML
    titulo_editar.value = fila.children[1].innerHTML
    autor_editar.value = fila.children[2].innerHTML
    precio_editar.value = fila.children[3].innerHTML
    modalLibro.show()
})