import { adicionarTarefa, getTarefas } from "../../../script/constantes.js";

// Selecionar elementos do DOM
const form = document.querySelector(".form");
const tituloInput = document.querySelector(".form__box--um--input");
const descricaoTextarea = document.querySelector(".form__box--um--textarea");
const prioridadeSelect = document.querySelector(".form__box--dois--input");
const dataInput = document.querySelector(
  ".form__box--dois--input[type='date']"
);
const responsaveisCheckboxes = document.querySelectorAll(
  ".form__box--dois--responsavel--input"
);
const btnAdicionar = document.querySelector(".form__box--btn--adcionar");
const tarefasContainer = document.querySelector(".container__tarefas");

// Função para adicionar tarefa (manipulação do DOM)
function handleAdicionarTarefa(event) {
  event.preventDefault();

  // Capturar valores
  const novaTarefa = {
    titulo: tituloInput.value.trim(),
    descricao: descricaoTextarea.value.trim(),
    prioridade:
      prioridadeSelect.value.charAt(0).toUpperCase() +
      prioridadeSelect.value.slice(1),
    data: new Date(dataInput.value).toLocaleDateString("pt-BR"),
    responsavel: Array.from(responsaveisCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.nextElementSibling.textContent),
  };

  // Validação
  if (
    !novaTarefa.titulo ||
    !novaTarefa.descricao ||
    !novaTarefa.prioridade ||
    !novaTarefa.data ||
    novaTarefa.responsavel.length === 0
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  // Usar função do módulo
  adicionarTarefa(novaTarefa);
  atualizarDOM();
  form.reset();
}

function atualizarDOM() {
    // Obter tarefas e garantir que seja um array
    const tarefas = getTarefas() || [];

    // Verificar se tarefas é um array válido
    if (!Array.isArray(tarefas)) {
        console.error("Erro: Dados de tarefas não são um array.");
        tarefasContainer.innerHTML = "<p>Erro ao carregar tarefas.</p>";
        return;
    }

    // Gerar conteúdo dinâmico
    const tasksHTML = tarefas.map(tarefa => {
        try {
            // Validação rigorosa da estrutura da tarefa
            if (
                !tarefa || 
                typeof tarefa.titulo !== "string" ||
                typeof tarefa.descricao !== "string" ||
                !["Alta", "Média", "Baixa"].includes(tarefa.prioridade) ||
                !tarefa.data ||
                !Array.isArray(tarefa.responsavel) // Garante que é array
            ) {
                console.warn("Tarefa com estrutura inválida:", tarefa);
                return '';
            }

            // Formatação segura
            const prioridadeClass = `prioridade-${tarefa.prioridade.toLowerCase()}`;
            const responsaveis = tarefa.responsavel.length > 0 
                ? tarefa.responsavel 
                : ["Não atribuído"];

            return `
                <div class="tasks ${prioridadeClass}">
                    <div class="task-categorias--container">
                        <div class="prioridade">${tarefa.prioridade}</div>
                        <div class="task-categorias--opcao--data">${tarefa.data}</div>
                        ${responsaveis.map(resp => `
                            <div class="task-categorias--opcao--pessoa">${resp}</div>
                        `).join('')}
                    </div>
                    <div class="task-categoria--text">
                        <p class="task-categoria--text--p">${tarefa.titulo}</p>
                        <span class="task-categoria--text--spam">${tarefa.descricao}</span>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Erro ao processar tarefa:", tarefa, error);
            return '';
        }
    }).join('');

}

// Evento
btnAdicionar.addEventListener("click", handleAdicionarTarefa);

// Carregar inicial
atualizarDOM();
