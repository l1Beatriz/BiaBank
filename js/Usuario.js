export class Usuario {
    
    constructor() {
        this.formulario = document.querySelector(".formulario");
        this.cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    }
    
    cadastrarUsuario() {
        this.formulario.addEventListener("submit", (event) => {
            event.preventDefault();
        
            const new_cadastro = {
                "nome_completo" : this.formulario.nome_completo.value,
                "nome_mae" : this.formulario.nome_mae.value,
                "data_nascimento" : this.formulario.data_nascimento.value,
                "cpf" : this.formulario.cpf.value,
                "email" : this.formulario.email.value,
                "numero_telefone" : this.formulario.numero_telefone.value
            };
        
            this.cadastros.push(new_cadastro);
        
            localStorage.setItem("cadastros", JSON.stringify(this.cadastros));
        
            window.location.href = "/leituraForm.html"
        
        })

        
    }

    listarUsuarios() {
        let tbody = document.querySelector(".tbody");
        for(let i = 0; i < this.cadastros.length; i++) {
            
            let tr = document.createElement("tr");
            
            let td = this.criar_td(this.cadastros[i], i);
            tr.innerHTML = td;
            tbody.appendChild(tr);
        }

    }

    deletarUsuario() {
        let id;

        document.querySelectorAll(".button_deletar").forEach((element) => {
            element.addEventListener("click", (event) => {
                
                id = event.target.parentElement.parentElement.querySelector(".table_td").textContent
                event.target.parentElement.parentElement.remove()

                this.cadastros.forEach((cadastro, index) => {
                    if (index == parseInt(id)) {
                        this.cadastros.splice(index, 1)
                        this.reordenarIds()
                        localStorage.setItem("cadastros", JSON.stringify(this.cadastros))
                    }
                });
            })

        })

        
        
    }

    pegarIdUsuarioParaAtualizar() {
        let id;

        document.querySelectorAll(".button_editar").forEach(element => {
            element.addEventListener("click", event => {
                id = event.target.parentElement.parentElement.querySelector(".table_td").textContent
                localStorage.setItem("userIdToUpdate", id)
                window.location.href = "/atualizaCadastro.html"
            });
        });
        
        this.atualizarUsuario()
        
    }

    atualizarUsuario() {
        let id = localStorage.getItem("userIdToUpdate");
        let cadastro;

        this.cadastros.forEach((cadastro_find, index) => {
            if (index == parseInt(id)) {
                cadastro = cadastro_find
            }
        });

        document.querySelectorAll(".form_input_edit").forEach(element => {
            element.value = cadastro[element.id]
        });


        document.querySelector("#botao-de-atualizar").addEventListener("click", (event) => {
            event.preventDefault();
        
            const new_cadastro = {
                "nome_completo" : this.formulario.nome_completo.value,
                "nome_mae" : this.formulario.nome_mae.value,
                "data_nascimento" : this.formulario.data_nascimento.value,
                "cpf" : this.formulario.cpf.value,
                "email" : this.formulario.email.value,
                "numero_telefone" : this.formulario.numero_telefone.value
            };

            this.cadastros.splice(id, 1)

            this.cadastros.push(new_cadastro);
        
            localStorage.setItem("cadastros", JSON.stringify(this.cadastros));
        
            window.location.href = "/leituraForm.html";
        
        })

    }

    reordenarIds() {
        let id = 0

        document.querySelectorAll(".tbody > tr").forEach(element => {
            element.querySelector(".table_td").textContent = id++;
        })

    }

    criar_td(cadastro, id) {
        return `
            <td class="table_td">${id}</td>
            <td class="table_td">${cadastro["nome_completo"]}</td>
            <td class="table_td">${cadastro["nome_mae"]}</td>
            <td class="table_td">${cadastro["data_nascimento"]}</td>
            <td class="table_td">${cadastro["cpf"]}</td>
            <td class="table_td">${cadastro["email"]}</td>
            <td class="table_td">${cadastro["numero_telefone"]}</td>
            <td class="table_td">
                <button class="button_action button_editar">editar</button>
                <button class="button_action button_deletar">deletar</button>
            </td>
        `
    }

}
