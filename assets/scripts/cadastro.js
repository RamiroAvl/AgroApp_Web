document.getElementById("cadastroForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

   fetch("http://localhost:9095/usuarios/cadastro",{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "nome_usuario": nome,
        "email_usuario": email,
        "senha_usuario": senha
    })
   })
   .then(response => {
    if(response.status == 200){
        //Armazene email e senha no local storage
        localStorage.setItem('email', email);
        localStorage.setItem('senha', senha);
        //redireciona para menu_user.html
        window.location.href = "menu_user.html";
    }else{
        throw new Error('Erro no cadastro, tente novamente!');
    }
   })
});