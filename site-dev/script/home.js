async function listarEnderecos() {
    
    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "GET",
       
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
        }
    });
    let enderecos = await api.json()
    console.log(enderecos)
   
    let tbody = document.querySelector("tbody")
    let linha = ""

    enderecos.data.forEach((endereco) => {
        
        linha += `
            <td>${endereco.title}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.complement}</td>
            <td><button onclick="atualizarEndereco(${endereco.id})">Atualizar Endereço</button></td>
            <td><button onclick="removerEndereco(${endereco.id})">Remover</button></td>`;
     
    });

    tbody.innerHTML = linha
}

listarEnderecos();

async function removerEndereco(id) {
    try{
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
        }
    });

    if (response.ok) {
        alert("endereço excluido com sucesso");
        window.location.reload()
       
    } else {
        const errorData = await response.json();
        console.error("Erro ao excluir endereço", errorData)
        alert(`Erro ao excluir endereço: ${errorData.message}`)

    }
    } catch (error) {
        alert("Ocorreu um erro ao tentar exluir o endereço.");
        console.error("Erro:", error);
    }  
}

function atualizarEndereco(id) {
    window.location.href = `attendereco.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', listarEnderecos);

async function logout() {

        const token = JSON.parse(localStorage.getItem('user')).access_token;

        const response = await fetch("https://go-wash-api.onrender.com/api/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });

        if (response.ok) {
            alert("Logout realizado com sucesso.");
            localStorage.removeItem('user');
            window.location.href = "index.html";
        } else {
            const errorData = await response.json();
            console.error("Erro ao fazer logout:", errorData);
            alert(`Erro ao fazer logout: ${errorData.message}`);
        }
    }

    async function listarVeiculos() {
    
        let api = await fetch("https://go-wash-api.onrender.com/api/auth/vehicle", {
            method: "GET",
           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
            }
        });
        let veiculos = await api.json()
        console.log(veiculos)
       
        let tbodycar = document.querySelector("tbodycar")
        let linha = ""
    
        veiculos.data.forEach((veiculo) => {
            
            linha += `
                <td>${veiculo.type}</td>
                <td>${veiculo.brand}</td>
                <td>${veiculo.model}</td>
                <td>${veiculo.color}</td>
                <td>${veiculo.year}</td>
                <td>${veiculo.size}</td>
                <td><button onclick="removerVeiculo(${veiculo.id})">Remover</button></td>`;
         
        });
    
        tbodycar.innerHTML = linha
    }
    
    listarVeiculos();

    async function removerVeiculo(id) {
        try{
            const response = await fetch(`https://go-wash-api.onrender.com/api/auth/vehicle/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
            }
        });
    
        if (response.ok) {
            alert("veículo excluido com sucesso");
            window.location.reload()
           
        } else {
            const errorData = await response.json();
            console.error("Erro ao veículo", errorData)
            alert(`Erro ao excluir veículo: ${errorData.message}`)
    
        }
        } catch (error) {
            alert("Ocorreu um erro ao tentar exluir o veículo.");
            console.error("Erro:", error);
        }  
    }