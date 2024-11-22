// Função para mostrar o formulário correspondente
function showForm(formId) {
    document.getElementById('pessoaFisica').style.display = 'none';
    document.getElementById('pessoaJuridica').style.display = 'none';
    document.getElementById(formId).style.display = 'block';

    var buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });

    document.querySelector('button[onclick="showForm(\'' + formId + '\')"]').classList.add('active');
}

// Função para preencher os selects de tipo fornecimento
async function carregarFornecimentos() {
    try {
        const response = await fetch("http://localhost:9095/fornecedores/fornecimentos-disponiveis");
        const fornecimentos = await response.json();

        // Preenche o select para Pessoa Física
        const tipoFornecimentoSelect = document.getElementById('tipoFornecimento');
        fornecimentos.forEach(fornecimento => {
            const option = document.createElement('option');
            option.value = fornecimento;
            option.textContent = fornecimento;
            tipoFornecimentoSelect.appendChild(option);
        });

        // Preenche o select para Pessoa Jurídica
        const tipoFornecimentoJuridicoSelect = document.getElementById('tipoFornecimentoJuridico');
        fornecimentos.forEach(fornecimento => {
            const option = document.createElement('option');
            option.value = fornecimento;
            option.textContent = fornecimento;
            tipoFornecimentoJuridicoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os fornecimentos:', error);
    }
}

// Carregar os fornecimentos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarFornecimentos);

    // Função para enviar os dados do formulário Pessoa Jurídica
    async function enviarDadosPessoaJuridica(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os valores dos campos do formulário
        const cnpj = document.getElementById('cnpj').value;
        const razaoSocial = document.getElementById('razaoSocial').value;
        const nomeFantasia = document.getElementById('nomeFantasia').value;
        const telefone = document.getElementById('telefonePJ').value;
        const bairro = document.getElementById('bairro').value;
        const cep = document.getElementById('cep').value;
        const municipio = document.getElementById('municipio').value;
        const uf = document.getElementById('unidadeFederativa').value;
        const tipoFornecimento = document.getElementById('tipoFornecimentoJuridico').value;
        const quantidade = document.getElementById('quantidadeJuridico').value;

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!cnpj || !razaoSocial || !nomeFantasia || !telefone || !bairro || !cep || !municipio || !uf || !tipoFornecimento || !quantidade) {
            // Se algum campo estiver vazio, exibe mensagem de erro no modal
            document.getElementById('modal-message').textContent = 'Por favor, preencha todos os campos obrigatórios.';
            document.getElementById('modal').style.display = 'block';
            return; // Interrompe o envio do formulário
        }

        // Estrutura o JSON de dados a ser enviado
        const dadosPessoaJuridica = {
            cnpj,
            razao_social: razaoSocial,
            nome_fantasia: nomeFantasia,
            telefone,
            bairro,
            cep,
            municipio,
            uf,
            fornecimento: {
                tipoFornecimento,
                quantidade: parseInt(quantidade)
            }
        };

        try {
            // Faz a requisição POST ao endpoint
            const response = await fetch("http://localhost:9095/fornecedores/pessoa-juridica", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosPessoaJuridica)
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                showModal("Cadastro realizado com sucesso!", tru);
                // Redireciona ou realiza qualquer outra ação após o sucesso
            } else {
                alert("Erro ao cadastrar: " + response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

        // Função para enviar os dados do formulário Pessoa Fisica
        async function enviarDadosPessoaFisica(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
    
            // Captura os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const idade = document.getElementById('idade').value;
            const email = document.getElementById('email').value;
            const tipoFornecimento = document.getElementById('tipoFornecimento').value;
            const quantidade = document.getElementById('quantidade').value;
            const telefone = document.getElementById('telefone').value;
    
            // Verifica se todos os campos obrigatórios foram preenchidos
            if (!nome || !idade || !email || !tipoFornecimento || !quantidade || !telefone) {
                // Se algum campo estiver vazio, exibe mensagem de erro no modal
                document.getElementById('modal-message').textContent = 'Por favor, preencha todos os campos obrigatórios.';
                document.getElementById('modal').style.display = 'block';
                return; // Interrompe o envio do formulário
            }else if(idade < 18 ){
                // Se algum campo estiver vazio, exibe mensagem de erro no modal
                document.getElementById('modal-message').textContent = 'Menores de idade não são aceitos como fornecedores.';
                document.getElementById('modal').style.display = 'block';
                return; // Interrompe o envio do formulário
            }
    
            // Estrutura o JSON de dados a ser enviado
            const dadosPessoaFisica = {
                telefone,
                nome,
                idade,
                email,
                fornecimento: {
                    tipoFornecimento,
                    quantidade: parseInt(quantidade)
                }
            };
    
            try {
                // Faz a requisição POST ao endpoint
                const response = await fetch("http://localhost:9095/fornecedores/pessoa-fisica", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosPessoaFisica)
                });
    
                // Verifica se a requisição foi bem-sucedida
                if (response.ok) {
                    showModal("Cadastro realizado com sucesso!", true);
                } else {
                    alert("Erro ao cadastrar: " + response.statusText);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro ao conectar com o servidor.");
            }
        }

    // Função para fechar o modal
    document.getElementById('modal-ok').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
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
            window.location.href = "index.html";
        }
    };

    // Fecha o modal ao clicar fora dele, mas não redireciona
    window.onclick = function(event) {
        if (event.target == modal) {
            window.location.href = "index.html";
        }
    };

    // Fecha o modal ao clicar no botão "OK" e redireciona se redirect for true
    okButton.onclick = function() {
        modal.style.display = "none";
        if (redirect) {
            window.location.href = "index.html";
        }
    };
}