document.getElementById("visitaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    var tipoAlimento = document.getElementById("tipo-alimento").value;
    var dataVisita = document.getElementById("data-visita").value;
    var email = localStorage.getItem('email');
    var senha = localStorage.getItem('senha');

    // Realiza a requisição ao servidor para agendar a visita
    fetch("http://localhost:9095/vendas/ingresso-solidario?email=" + encodeURIComponent(email) + "&senha=" + encodeURIComponent(senha), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tipo_alimento": tipoAlimento,
            "data_definida": dataVisita
        })
    })
    .then(response => {
        if (response.ok) {
            showModal("Visita agendada com sucesso!", true);
        } else if (response.status === 404) {
            showModal("Erro: Servidor não encontrado. Verifique a conexão e tente novamente.", false);
        } else {
            showModal("Aconteceu um problema do nosso lado, tente novamente mais tarde.", false);
        }
    })
    .catch(error => {
        showModal("Erro ao tentar agendar a visita: " + error.message, false);
    });
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
            modal.style.display = "none";
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
