async function fetchClientsWithId() {
  var id = document.getElementById('campoIdUsuario').value;
  const response = fetch(`http://localhost:8000/clients/${id}`)
  .then((response) => response.json())
  .then((data) => {

    var name = data.name
    var elemento = document.getElementById('nameTitle');
    elemento.textContent = name;

    var siceDate = data.clientSince
    elemento = document.getElementById('clientSince');
    elemento.textContent = siceDate;

    var clientId = data.id
    elemento = document.getElementById('idNumber');
    elemento.textContent = `ID: ${clientId}`;

    var totalCuts = data.loyaltyCard.totalCuts;
    var cutsRemaining = data.loyaltyCard.cutsRemaining;

    removerDivsAnteriores();

    // Limpa a div de histórico
    var historyWrapper = document.querySelector('.history-wrapper.flex');
    historyWrapper.innerHTML = '';

    for (var i = 0; i < totalCuts; i++) {
      const cardIconsWrapper = document.querySelector('.card-icons-wrapper');
      const newDiv = document.createElement('div');
      newDiv.className = 'check-box flex';

      const newImg = document.createElement('img');
      newImg.src = 'assets/PinCheck.png';
      newImg.alt = '';

      newDiv.appendChild(newImg);
      cardIconsWrapper.appendChild(newDiv);
    }

    for (var i = 0; i < cutsRemaining - 1; i++) {
      const cardIconsWrapper = document.querySelector('.card-icons-wrapper');
      const newDiv = document.createElement('div');
      newDiv.className = 'check-box flex';

      cardIconsWrapper.appendChild(newDiv);
    }

    const cardIconsWrapper = document.querySelector('.card-icons-wrapper');
    const newDiv = document.createElement('div');
    newDiv.className = 'check-box flex';

    const newImg = document.createElement('img');
    newImg.src = 'assets/PinGiftGray.svg';
    newImg.alt = '';

    newDiv.appendChild(newImg);
    cardIconsWrapper.appendChild(newDiv);

    elemento = document.getElementById('totalCuts');
    elemento.textContent = cutsRemaining;
    elemento = document.getElementById('cutsRemaining');
    elemento.textContent = totalCuts;
    elemento = document.getElementById('cutsNeeded');
    elemento.textContent = data.loyaltyCard.cutsNeeded;

    var progressBar = document.querySelector('.completed-bar');
    progressBar.setAttribute('style', `width: ${(cutsRemaining / data.loyaltyCard.cutsNeeded) * 100}%`);

    elemento = document.getElementById('history-cuts');
    elemento.textContent = `${cutsRemaining} cortes`;

    var appointmentHistory = data.appointmentHistory;

    // Função para criar um novo bloco de divs com a data e hora
    function createHistoryBlock(date, time) {
        // Cria o div principal que vai conter tudo
        let historyBlock = document.createElement('div');
        historyBlock.classList.add('history-dates', 'flex');

        // Cria o div que vai conter a data e a hora
        let dateBlock = document.createElement('div');
        dateBlock.classList.add('dates', 'flex');

        // Cria o elemento h2 para a data
        let h2Element = document.createElement('h2');
        h2Element.textContent = date;

        // Cria o elemento p para a hora
        let pElement = document.createElement('p');
        pElement.textContent = time;

        // Adiciona o h2 e o p ao div dateBlock
        dateBlock.appendChild(h2Element);
        dateBlock.appendChild(pElement);

        // Cria o div para o ícone de check
        let checkBlock = document.createElement('div');
        checkBlock.classList.add('history-check', 'flex');

        // Cria o elemento img para o ícone
        let imgElement = document.createElement('img');
        imgElement.src = 'assets/PinCheckGreen.svg';
        imgElement.alt = '';

        // Adiciona a imagem ao div checkBlock
        checkBlock.appendChild(imgElement);

        // Adiciona dateBlock e checkBlock ao historyBlock
        historyBlock.appendChild(dateBlock);
        historyBlock.appendChild(checkBlock);

        // Adiciona o historyBlock ao wrapper
        historyWrapper.appendChild(historyBlock);
    }

    for (var i = 0; i < appointmentHistory.length; i++) {
        createHistoryBlock(appointmentHistory[i].date, appointmentHistory[i].time);
    }

    console.log(appointmentHistory);
    console.log(appointmentHistory.length);
    console.log(appointmentHistory[0].date);
    console.log(appointmentHistory[0].time);
  });
}

function removerDivsAnteriores() {
  const divsToRemove = document.querySelectorAll('.check-box');
  divsToRemove.forEach(div => div.remove());
}
