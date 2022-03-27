
const Storege = {
    get(){
        return JSON.parse(localStorage.getItem("contatos-app"))
    },
    set(contatos) {
        localStorage.setItem('contatos-app', JSON.stringify(contatos))
    }
}

const pessoas = Storege.get() || []


const DOM = {
    pessoaContaine: document.querySelector('#data-table tbody'),
  
    addPessoa(pessoa, index) {
        const newPeaple = {
            ...pessoa,
            id: index,
        }
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLPessoa(newPeaple)
        DOM.pessoaContaine.appendChild(tr)
    },

    innerHTMLPessoa(pessoa) {
      const html = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.email}</td>
            <td class="column-actions">
                <button onclick="FORM.delete(${pessoa.id})">
                    <img src="./images/icon-delete.png" alt="botão deletar contato">
                </button>
            </td>
      `
      return html
    },

    cleanContainerPessoa() {
        DOM.pessoaContaine.innerHTML = ""
    },

    reloadContainer() {
        this.cleanContainerPessoa()
        pessoas.forEach((pessoa, index) => {
            DOM.addPessoa(pessoa, index)
        })
        Storege.set(pessoas)
    },

}

const FORM = {
    nome: document.querySelector('#nome'),
    email: document.querySelector('#email'),

    getValues() {  
        return {
           nome: nome.value,
           email: email.value
        }
    },

    cleanFields() {
        FORM.nome.value = ""
        FORM.email.value = ""
    },

    isFieldsValid() {
        const { nome, email }  = this.getValues()
        if (nome.trim() === "" || email.trim() === "") {
            return false
        }
        return true
    },
    
    addContato() {

        if(!this.isFieldsValid()) {
            alert('Os campos devem ser preenchidos!')
            return
        }

        const newPeaple = this.getValues()
    
        pessoas.push(newPeaple)
        this.cleanFields()
        App.reload()
    },
    delete(id) {
        pessoas.splice(id, 1)
        DOM.reloadContainer()
        App.reload()
    }
}


const App = {
    init() {
        pessoas.forEach((pessoa,index) =>  DOM.addPessoa(pessoa,index))
        Storege.set(pessoas)
    },
    reload() {
        DOM.reloadContainer()
        FORM.cleanFields()
    }
}

App.init()