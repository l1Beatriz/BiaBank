formulario = document.querySelector(".formulario")

formulario.addEventListener("submit", (event) => {

    event.preventDefault()

    const new_cadastro = [{
        "nome_completo" : formulario.querySelector("#nome_completo").value,
        "nome_da_mae" : formulario.querySelector("#nome_mae").value,
        "data_de_nascimento" : formulario.querySelector("#data_nascimento").value,
        "cpf" : formulario.querySelector("#cpf").value,
        "email" : formulario.querySelector("#email").value,
        "numero_de_telefone" : formulario.querySelector("#numero_telefone").value
    }]

    if(localStorage.getItem("usuarios")) {
        let old_object = localStorage.getItem('usuarios');
        new_cadastro.push(JSON.parse(old_object))
    }

    localStorage.setItem("usuarios", JSON.stringify(new_cadastro))
})
