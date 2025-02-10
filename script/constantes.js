// Lista de Tarefas
let vTarefas = JSON.parse(localStorage.getItem('tarefas')) || [
    {
        "titulo": "Implementar nova funcionalidade",
        "descricao": "Adicionar a nova funcionalidade ao sistema conforme especificações",
        "prioridade": "Média",
        "data": "15/03/2013",
        "responsavel": ["Carlos", "Beatriz"]
    }
];

// Função para obter tarefas
export function getTarefas() {
    return vTarefas; // Garanta que isso sempre retorne um array
}

// Função para adicionar tarefas
export function adicionarTarefa(novaTarefa) {
    // Garantir estrutura correta antes de adicionar
    const tarefaValidada = {
        titulo: novaTarefa.titulo || "Sem título",
        descricao: novaTarefa.descricao || "Sem descrição",
        prioridade: ["Alta", "Média", "Baixa"].includes(novaTarefa.prioridade) 
            ? novaTarefa.prioridade 
            : "Média",
        data: novaTarefa.data || new Date().toLocaleDateString("pt-BR"),
        responsavel: Array.isArray(novaTarefa.responsavel) 
            ? novaTarefa.responsavel 
            : []
    };
    
    vTarefas.push(tarefaValidada);
    localStorage.setItem('tarefas', JSON.stringify(vTarefas));
}

// Exportação padrão
export default vTarefas;