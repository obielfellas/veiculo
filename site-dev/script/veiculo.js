const url = 'https://go-wash-api.onrender.com/api/auth/vehicle'

async function cadastro_veiculo() {
    let tipo = document.getElementById('tipo').value;
    let marca = document.getElementById('marca').value; 
    let modelo = document.getElementById('modelo').value;
    let cor = document.getElementById('cor').value;
    let ano = document.getElementById('ano').value;
    let tamanho = document.getElementById('tamanho').value;

    if (!tipo || !marca || !modelo || !cor || !ano || !tamanho) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "type": tipo,
                "brand": marca,
                "model": modelo,
                "color": cor,
                "year": ano,
                "size": tamanho
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
            }
        });

        if (response.ok) {
            let result = await response.json();
            console.log(result);
            alert("Veículo cadastrado com sucesso!");
            window.location.href = 'home.html';
          
        } else {
            let error = await response.json();
            console.error("Erro:", error);
            alert("Erro ao cadastrar o veículo. Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição. Tente novamente mais tarde.");
    }
}