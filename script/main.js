const dadosTarefas = require("./constantes");

// Selecionar todos os elementos com a classe categoria_task
const vCategoria_array = Array.from(document.querySelectorAll('#prioridade'));


// Ordenar os elementos com base no conteúdo de texto
vCategoria_array.sort((a, b) => {
    const vPrioridade = ["Alta", "Media", "Baixa"];
    return vPrioridade.indexOf(a.textContent) - vPrioridade.indexOf(b.textContent);
});

// Aplicar o estilo e adicionar os elementos ordenados de volta ao container
vCategoria_array.forEach((pText) => {
    let vColor;
    vColor = pText.textContent === "Alta" ? "#e62c2c" :
        pText.textContent === "Média" ? "#f5f50e" :
            pText.textContent === "Baixa" ? "#56ec28" : "#000000";

    pText.style.background = vColor;

});

const tarefasContainer = document.querySelector(".container__tarefas");
tarefasContainer.innerHTML = `
    <div class="tasks">
        <div class="task-categorias--container">
          <div id="prioridade" class="task-categorias--opcao--prioridade--alta">Alta</div>
          <div class="task-categorias--opcao--data">12/12/2012</div>
          <div class="task-categorias--opcao--pessoa">Luisa</div>
          <div class="task-categorias--opcao--pessoa">Fabiana</div>
        </div>
        <div class="task-categoria--text">
          <p class="task-categoria--text--p">Revisar código crítico</p>
          <span class="task-categoria--text--spam"
            >Revisar bugs criticos no módulo principal</span
          >
        </div>
    </div>

`



