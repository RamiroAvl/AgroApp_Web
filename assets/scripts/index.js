document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    fetch("http://localhost:9095/usuarios/login?email=" + encodeURIComponent(email) + "&senha=" + encodeURIComponent(senha), {
        method: "GET"
    })
    .then(response => {
        if (response.status === 200) {
            //Armazene email e senha no local storage
            localStorage.setItem('email', email);
            localStorage.setItem('senha', senha);
            return response.text(); // Obtenha a resposta como texto se for 200
        } else if (response.status === 404) {
            throw new Error('Email ou senha incorretos, tente novamente!');
        } else {
            throw new Error('Erro no servidor');
        }
    })
    .then(text => {
        // Sucesso no login, redireciona para menu_user.html
        window.location.href = "menu_user.html";
    })
    .catch(error => {
        console.error("Erro:", error);
        document.getElementById("error-message").innerText = error.message; // Mostra a mensagem de erro no HTML
        document.getElementById("error-message").style.display = 'block'; // Garante que a mensagem seja exibida
    });
});
