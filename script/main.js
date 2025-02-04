
// Selecionar todos os elementos com a classe categoria_task
const vCategoria_array = Array.from(document.querySelectorAll('#prioridade'));
console.log(vCategoria_array);

// Ordenar os elementos com base no conteúdo de texto
vCategoria_array.sort((a, b) => {
    const vPrioridade = ["Alta", "Media", "Baixa"];
    return vPrioridade.indexOf(a.textContent) - vPrioridade.indexOf(b.textContent);
});

// Aplicar o estilo e adicionar os elementos ordenados de volta ao container
vCategoria_array.forEach((pText) => {
    let vColor;
    if (pText.textContent === "Alta") {
        vColor = "#e62c2c";
    } else if (pText.textContent === "Media") {
        vColor = "#f5f50e";
    } else if (pText.textContent === "Baixa") {
        vColor = "#56ec28";
    } else {
        vColor = "defaultColor";
    }
    pText.style.background = vColor;

});
