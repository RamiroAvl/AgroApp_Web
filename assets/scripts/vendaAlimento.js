let alimentos = [];  // Armazena todos os alimentos
let currentPage = 1;  // Página inicial

// Função para obter alimentos
async function obterAlimentosProntos() {
    try {
        console.log("Iniciando requisição...");

        // Requisição para o backend
        const response = await fetch('http://localhost:9095/vendas/alimentos-prontos');
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        
        alimentos = await response.json();
        console.log("Dados recebidos:", alimentos);

        // Atualiza a tabela e a navegação
        updateTable();
        updatePagination();
    } catch (error) {
        console.error('Erro ao obter alimentos:', error);
    }
}

// Função para dividir os alimentos em páginas
function getPaginatedAlimentos() {
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return alimentos.slice(startIndex, endIndex);
}

// Função para atualizar a tabela com os alimentos da página atual
function updateTable() {
    const tbody = document.getElementById('alimentos-lista');
    if (!tbody) {
        console.error("Elemento tbody não encontrado!");
        return;
    }

    tbody.innerHTML = '';  // Limpa a tabela

    const paginatedAlimentos = getPaginatedAlimentos();
    paginatedAlimentos.forEach(alimento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="item">
                    <span class="icon">${alimento.nome_alimento}</span> 
                    <span>${alimento.nome_alimento}</span>
                </div>
            </td>
            <td>
                <span>${alimento.valor_alimento}</span>
                <input type="checkbox" name="item${alimento.id_plantacao}_check">
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para atualizar os links de paginação
function updatePagination() {
    const totalPages = Math.ceil(alimentos.length / 3);
    const paginationContainer = document.querySelector('.paginas');
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';  // Esconde a navegação se houver apenas uma página
        return;
    }

    paginationContainer.style.display = 'block';  // Exibe a navegação

    let paginationHtml = '';

    // "Previous" Button
    if (currentPage > 1) {
        paginationHtml += `<a href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<a href="#" class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</a>`;
    }

    // "Next" Button
    if (currentPage < totalPages) {
        paginationHtml += `<a href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
    }

    paginationContainer.innerHTML = paginationHtml;
}

// Função para mudar de página
function changePage(page) {
    currentPage = page;
    updateTable();
    updatePagination();
}

// Chama a função ao carregar a página
window.onload = obterAlimentosProntos;

// Função para armazenar os dados no localStorage
function salvarDadosEscolhidos() {
    const alimentosSelecionados = [];

    // Pega todos os checkboxes da tabela
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        // Encontra o alimento correspondente ao checkbox
        const tr = checkbox.closest('tr');
        const nome = tr.querySelector('td:nth-child(1) .icon').textContent.trim();
        const preco = tr.querySelector('td:nth-child(2) span').textContent.trim();

        // Obter o id_plantacao diretamente do checkbox (já que ele é usado para definir o nome do input)
        const idPlantacao = checkbox.name.replace('item', '').replace('_check', '');

        alimentosSelecionados.push({ nome, preco, id_plantacao: idPlantacao });
    });

    // Salva os dados no localStorage
    localStorage.setItem('itensEscolhidos', JSON.stringify(alimentosSelecionados));
}

// Adiciona o evento de clique no botão "Seguir"
const seguirButton = document.querySelector('.seguir a');
seguirButton.addEventListener('click', function(event) {
    // Previne o comportamento padrão do link (navegar para a próxima página)
    event.preventDefault();
    
    // Salva os dados no localStorage antes de redirecionar
    salvarDadosEscolhidos();

    // Agora redireciona para a página de resumo
    window.location.href = 'resumo_compra.html';
});
