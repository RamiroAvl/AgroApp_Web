window.onload = function() {
    // Recupera os dados do localStorage
    const itensEscolhidos = JSON.parse(localStorage.getItem('itensEscolhidos')) || [];

    // Seleciona o elemento <tbody> da tabela
    const tbody = document.querySelector('tbody');

    // Limpa o conteúdo atual do <tbody>
    tbody.innerHTML = '';

    // Adiciona cada item à tabela
    itensEscolhidos.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="item">
                    <span class="icon">A</span>
                    <span>${item.nome}</span>
                </div>
            </td>
            <td>
                <span class="preco" data-preco="${item.preco}">${item.preco}$</span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Calcula o total
    calcularTotal();
};

// Função para calcular o total
function calcularTotal() {
    let total = 0;
    const precoElements = document.querySelectorAll('.preco');
    precoElements.forEach(precoElement => {
        const preco = parseFloat(precoElement.getAttribute('data-preco'));
        total += preco;
    });
    document.getElementById('total-price').textContent = total + '$';
}

function limparLocalStorage() {
    localStorage.removeItem('itensEscolhidos');
    console.log("LocalStorage limpo!");
}

async function finalizarCompra() {
    // Recupera o email do localStorage
    const email = localStorage.getItem("email");
    if (!email) {
        alert("Email não encontrado no localStorage.");
        return;
    }

    // Recupera os itens escolhidos e os IDs das plantações
    const itensEscolhidos = JSON.parse(localStorage.getItem("itensEscolhidos"));
    if (!itensEscolhidos || itensEscolhidos.length === 0) {
        alert("Nenhum item selecionado.");
        return;
    }

    // Constrói os parâmetros da URL com base nos ids de plantação escolhidos
    const params = new URLSearchParams();
    itensEscolhidos.forEach(item => {
        params.append("idPlantacao", item.id_plantacao);
    });
    params.append("email", email);

    // Faz a requisição
    try {
        const response = await fetch(`http://localhost:9095/vendas/alimentos?${params.toString()}`, {
            method: "POST"
        });

        if (response.ok) {
            showModal("Compra realizada com sucesso!", true);
            // Limpa o localStorage após a compra, se necessário
            localStorage.removeItem("itensEscolhidos");
        } else {
            throw new Error(`Erro na compra: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        alert("Erro ao realizar a compra. Tente novamente.");
    }
}

// Adiciona o evento de clique no botão "Finalizar"
document.querySelector(".seguir").addEventListener("click", function(event) {
    event.preventDefault();  // Evita o comportamento padrão do botão
    finalizarCompra();  // Chama a função de finalizar a compra
});

function showModal(message, redirect) {
    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modal-message");
    var closeButton = document.getElementsByClassName("close")[0];
    var okButton = document.getElementById("modal-ok");

    modalMessage.innerText = message;
    modal.style.display = "block";

    // Fecha o modal e redireciona ao clicar no "X" se redirect for true
    closeButton.onclick = function() {
        modal.style.display = "none";
        if (redirect) {
            window.location.href = "menu_user.html";
        }
    };

    // Fecha o modal ao clicar fora dele, mas não redireciona
    window.onclick = function(event) {
        if (event.target == modal) {
            window.location.href = "menu_user.html";
        }
    };

    // Fecha o modal ao clicar no botão "OK" e redireciona se redirect for true
    okButton.onclick = function() {
        modal.style.display = "none";
        if (redirect) {
            window.location.href = "menu_user.html";
        }
    };
}


