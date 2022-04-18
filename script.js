let destinatario="Todos"
let typeMessage="message"
let nome;
let nickname = {
    name: nome
}

function receiveMessages(){

    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    
    
    promise.then(loadMessage);
    
    }
    
    function loadMessage(messages)
    {
    
        let arrayMessages = messages.data
        let msg=[];
    
        let cont=0;
    
        let batePapo = document.querySelector(".messages");
        batePapo.innerHTML=""
    
        
            const message=[]
        for(let i=0;i<arrayMessages.length;i++){
    
            message[i]= {
                from: arrayMessages[i].from,
                to: arrayMessages[i].to,
                text: arrayMessages[i].text,
                type: arrayMessages[i].type,
                time: arrayMessages[i].time,
            }
            if (message[i].type==="message"){
                
            msg[i]= `<div class="geral message1"><p>
            <i>(${message[i].time})</i>
            <b>${message[i].from}</b>
            para  <b>${message[i].to}</b>:
             ${message[i].text}
            
            </p>
            </div>`;
            }

         

               else if (message[i].type==="private_message"){
                
                    msg[i]= `<div class="geral private_message1"><p>
                    <i>(${message[i].time})</i>
                    <b>${message[i].from}</b>
                    para  <b>${message[i].to}</b>: 
            ${message[i].text} 
                    
                    </p>
                    </div>`;
                    }

                    else {
                
                        msg[i]= `<div class="geral status1"><p>
                        <i>(${message[i].time})</i>
                        <b>${message[i].from}</b>
                        
                         ${message[i].text}
                        
                        </p>
                        </div>`;
                        }
            
           if(message[i].type!=="private_message"||message[i].to===nickname.name){
                
                batePapo.innerHTML +=msg[i];
                cont++;
                }         
             
        }
    
        teste=batePapo.querySelectorAll(".geral")
       
        teste[cont-5].scrollIntoView();
    
    
        
       
    
    }
    
    
    function logIn(nome){
    
    
    
    
    let request =axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nickname)
    
    request.then(tratarSucesso);
    request.catch(tratarError);
    
    
    }
    
    
    function tratarSucesso()
    {
        receiveMessages()
        setInterval(conected, 4000);
        setInterval(receiveMessages, 2500);
    
    }
    
        function conected(nome){
    
        
            
            let request =axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname)
            
           
            
            
            }
    
    
    function tratarError(erro)
    {
        
    
        if(erro.response.status===400) 
        {
            nome = (prompt("Digite outro nome de usuario por favor."))
    
            nickname = {
                name: nome
            }
           
    
            logIn()
        }
        
    }
    
    
    function send(){
    
        let messageSent=document.querySelector(".digitarmsg")
    
        
       
        shippingRequisition = 
    
        {
            from: nickname.name,
            to: destinatario,
            text: messageSent.value,
            type: typeMessage 
        }
    
        
    
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', shippingRequisition);
    
        
    
        requisicao.then(enviada);
        requisicao.catch(noSend);
    
    }
    
    function enviada(){
    
        receiveMessages()
    }
    
    function noSend(erro){
    
        const statusCode = erro.response.status;
        window.location.reload()
    }

    function vermensagens(){

        let elemento=document.querySelector(".overlay")
        elemento.classList.add("escondido");
    }
  
    function ParticipantesAtivos(){


        destinatario="Todos"
        typeMessage="message"

        document.querySelector(".enviandoPara").innerHTML= "Enviando para Todos"

       

        let elemento=document.querySelector(".overlay")

       
        
        elemento.classList.remove("escondido");

       let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')

       promise.then(Ativos);

     

        
    }


   function Ativos(nomes){
    let elemento=document.querySelector(".overlay")

    let arrayNomes=[]

   
    let strungNomes="";
    
    for(let i=0; i<nomes.data.length; i++){

        arrayNomes[i] = 
        `<div onclick="selecionaParticipante(this)" class="contato">
        <ion-icon id="logo3" name="person-circle"></ion-icon> <p>${nomes.data[i]["name"]}</p><ion-icon class ="check escondido" name="chevron-down-circle-outline"></ion-icon>

    </div>`
    strungNomes+=arrayNomes[i]+""}

   

    ell= `<div onclick="vermensagens()" class="esquerda ">

    </div>
    <div class="direita">
        <div class="contatos">
            <h2>Escolha um contato para enviar mensagem:</h2>
            <div onclick="selecionaParticipante(this)" class="contato">
            <ion-icon id="logo3" name="people"></ion-icon> <p>Todos</p> <ion-icon class ="check escondido mostrar "name="chevron-down-circle-outline"></ion-icon>
        </div>

     ${strungNomes}


        </div>


        <div class="contatos">
            <h2>Escolha a visibilidade:</h2>

            <div onclick="selecionatype(this)" class="contato tipop">
                <ion-icon id="logo3" name="lock-open"></ion-icon> <p>Publico</p>
                <ion-icon class ="check escondido mostrar "name="chevron-down-circle-outline"></ion-icon>
            </div>

            <div onclick="selecionatype(this)" class="contato tipop">
                <ion-icon id="logo3" name="lock-closed"></ion-icon> <p>Reservadamente</p>
                <ion-icon class ="check escondido  "name="chevron-down-circle-outline"></ion-icon>
            </div>
        </div>
    </div>`

   
    

  

  

    elemento.innerHTML=ell
}


function selecionaParticipante (participanteSelecionado){

     destinatario= participanteSelecionado.querySelector("p").innerHTML

     document.querySelector(".enviandoPara").innerHTML= "Enviando para "+destinatario
 

    let mostraCheck = participanteSelecionado.querySelector(".check")


    let marcado=document.querySelector(".contato .mostrar")

    marcado.classList.remove("mostrar")

    mostraCheck.classList.add("mostrar")

}
 
function selecionatype (tipoSelecionado){

    

    if("Reservadamente" === tipoSelecionado.querySelector("p").innerHTML){

        typeMessage="private_message"
    }

    else{
        typeMessage="message"
    }

    let mostraCheck = tipoSelecionado.querySelector(".check")


    let marcado=document.querySelector(".tipop .mostrar")

    marcado.classList.remove("mostrar")

    mostraCheck.classList.add("mostrar")
  


}


   
    function confirmaNome(){
        let nome1=document.querySelector(".digitanome")
        nome=nome1.value
        logar=document.querySelector(".login");

        nickname = {
            name: nome
        }



        logar.classList.add("escondido");

        

         
           
            logIn()

    }

    
    
    
  