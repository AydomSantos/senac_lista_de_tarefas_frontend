
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
