import dadosTarefas from "./constantes.js";

// Selecionar elementos pela classe
const tarefasContainer = document.querySelector(".container__tarefas");

// Verificar se dadosTarefas é um array válido
if (!Array.isArray(dadosTarefas)) {
    console.error("dadosTarefas não é um array válido. Verifique o arquivo constantes.js.");
    dadosTarefas = []; 
}

// Função para aplicar classes de estilo com base na prioridade
function aplicarEstilosPrioridade() {
    const prioridadesElements = document.querySelectorAll('.prioridade');
    prioridadesElements.forEach(elemento => {
        if (elemento.textContent.trim() === 'Alta') {
            elemento.style.backgroundColor = "#e62c2c";
        } else if (elemento.textContent.trim() === "Média") {
            elemento.style.backgroundColor = "#f5f50e";
        } else if (elemento.textContent.trim() === "Baixa") {
            elemento.style.backgroundColor = "#56ec28";
        }
    });
}

// Função para gerar conteúdo dinâmico
function gerarConteudoDinamico(tarefas) {
    return tarefas.map(tarefa => {
        // Verificar se a tarefa tem a estrutura esperada
        if (!tarefa || !tarefa.prioridade || !tarefa.data || !tarefa.responsavel || !tarefa.titulo || !tarefa.descricao) {
            console.warn("Tarefa com estrutura inválida:", tarefa);
            return ''; 
        }

        // Verificar se responsavel é um array
        if (!Array.isArray(tarefa.responsavel)) {
            console.warn("A propriedade 'responsavel' não é um array na tarefa:", tarefa);
            return ''; 
        }

        // Determinar a classe de cor de fundo com base na prioridade
        const prioridadeClass = `prioridade-${tarefa.prioridade.toLowerCase()}`;

        return `
            <div class="tasks ${prioridadeClass}">
                <div class="task-categorias--container">
                    <div class="prioridade">${tarefa.prioridade}</div>
                    <div class="task-categorias--opcao--data">${tarefa.data}</div>
                    ${tarefa.responsavel.map(resp => `
                        <div class="task-categorias--opcao--pessoa">${resp}</div>
                    `).join('')}
                </div>
                <div class="task-categoria--text">
                    <p class="task-categoria--text--p">${tarefa.titulo}</p>
                    <span class="task-categoria--text--spam">${tarefa.descricao}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Gerar conteúdo dinâmico
const tasksHTML = gerarConteudoDinamico(dadosTarefas);

// Inserir o conteúdo gerado no container
if (tarefasContainer) {
    tarefasContainer.innerHTML = tasksHTML;

    // Aplicar estilos de prioridade após inserir o conteúdo no DOM
    aplicarEstilosPrioridade();
} else {
    console.error("Elemento .container__tarefas não encontrado.");
}