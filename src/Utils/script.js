const url = './ClientesJSON.php';
const options = {method: 'GET'};
fetch(url, options)
    .then((response) => {
        response.json().then((clientes) => {    

           
            let maiorDespesa = [0];
            let maiorReceita = [0];
            let nomeMaiorReceita = '';
            let nomeMaiorDispesa = '';


            for(let i = 0; i < clientes.length; i++){
                maiorDespesa = PegarMaior(CalculaTotal(clientes[i].despesas), maiorDespesa);
                maiorReceita = PegarMaior(CalculaTotal(clientes[i].receitas), maiorReceita);
                if(CalculaTotal(clientes[i].receitas) == maiorReceita) nomeMaiorReceita = clientes[i].nome;
                if(CalculaTotal(clientes[i].despesas) == maiorDespesa) nomeMaiorDispesa = clientes[i].nome;
            }

            clientes.forEach(cliente => {
                let totalReceitas = CalculaTotal(cliente.receitas);
                let totalDespesas = CalculaTotal(cliente.despesas);
                let balanco = totalDespesas - totalReceitas;

                $(
                    `<div class="card mt-3">
                        <div class="card-body">
                            <img src="${cliente.avatar}" alt="user-profile-photo" class="img-thumbnail rounded-circle">
                            <h5 id='nomeUser' class="card-title d-inline-block ms-2">${cliente.nome}</h5>
                            <ul class="list-group list-group-flush mt-3">                    
                                <li class="list-group-item text-primary"><b>Receitas</b>: R$ ${totalReceitas.toFixed(2)}</li>
                                <li class="list-group-item text-danger">-<b>Despesas</b>: R$ ${totalDespesas.toFixed(2)}</li>
                                <li class="list-group-item text-dark"><b>Balanço</b>: R$ ${balanco.toFixed(2)} </li>
                            </ul>
                        </div>
                    </div> `
                   ).appendTo('main');
            }); 

            $(
                ` <div class="card mt-3">
                    <h5 class="card-title d-inline-block ms-3 mb-2 mt-3">Totalizadores</h5>
                    <div class="card-body">
                        <h6>Maior Receita: ${nomeMaiorReceita}</h6>                                
                        <p class="text-primary"><b>R$: ${maiorReceita.toFixed(2)}</b></p>
                                        
                        <h6>Maior Despesa: ${nomeMaiorDispesa}</h6>                
                        <p class="text-danger"><b>R$: ${maiorDespesa.toFixed(2)}</b></p>
                    </div>
                </div>`
            ).appendTo('footer');
        });
    })
    .catch((error) => {            
        console.error('Error', error);
    });

    function CalculaTotal(valores){
        let soma = 0
        for(let i=0; i < valores.length; i++){
            soma += valores[i];
        }
        return soma;
    }

    function PegarMaior(valor, maiorValor){
        if(valor > maiorValor) maiorValor = valor;
        return maiorValor;
    }