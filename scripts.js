const disappear = document.querySelector('.content-form')
const container = document.querySelector('.container');
const form = document.querySelector('.form')
const total = document.getElementById("number_quantidy");
const startValue = document.getElementById("start-number");
const endValue = document.getElementById("final-number");
const submitBtn = document.querySelector(".btn");
const toggleButton = document.querySelector(".toggle")
let noRepeat = false;


function toggleRepeat() {
    noRepeat = !noRepeat;
    const toggleIcon = toggleButton.querySelector("img");

    toggleButton.classList.add('toggling');

    setTimeout(() => {
        if (noRepeat) {
            toggleIcon.src = 'assets/icons/toggle.svg';
            toggleButton.classList.add('active');
        } else {
            toggleIcon.src = 'assets/icons/state=default.svg';
            toggleButton.classList.remove('active');
        }

        setTimeout(() => {
            toggleButton.classList.remove('toggling');
        } , 300);
    } , 150);

    toggleButton.classList.add('clicked');
    setTimeout(() => {
        toggleButton.classList.remove('clicked');
    } , 200);


}


function getRandomNumbers(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortNumbers() {
    const quantity = parseInt(total.value);
    const min = parseInt(startValue.value);
    const max = parseInt(endValue.value);

    if (isNaN(quantity) || isNaN(min) || isNaN(max)) {
        alert('Por favor , preencha todos os campos com valores numéricos.');
        return;
    }

    if (quantity <= 0) {
        alert('A quantidade de números deve ser maior que zero.')
        return;
    }

    if (min >= max) {
        alert('O valor inicial deve ser maior que o final.');
        return;
    }

    if (noRepeat && (max - min + 1) < quantity) {
        alert(`Não é possível sortear ${quantity} números diferentes no intervalo de ${min} e ${max}`);
        return;
    }

    const drawnNumbers = [];

    if (noRepeat) {
        while (drawnNumbers.length < quantity) {
            const randomNum = getRandomNumbers(min,max);
            if (!drawnNumbers.includes(randomNum)) {
                drawnNumbers.push(randomNum);
            }

        } 
    } else {
        for (let i = 0 ; i < quantity ; i++) {
            drawnNumbers.push(getRandomNumbers(min,max));
        }
    }

    displayResults(drawnNumbers);

}


function displayResults(numbers) {

    disappear.classList.add('hiding');

    setTimeout(() => {
        disappear.classList.add('none');


        const oldResults = document.querySelector('.results');
        if (oldResults) {
            oldResults.remove();
        }
    
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'results';
    
        const title = document.createElement('h3');
        title.textContent = "Resultado do sorteio";
        resultsDiv.appendChild(title);
    
        const subtitleResult = document.createElement('p');
        subtitleResult.textContent = 'Resultado :';
        resultsDiv.appendChild(subtitleResult); 
    
        const numbersContainer = document.createElement('div');
        numbersContainer.className = 'numbers-container';
    
        numbers.forEach((number , index) => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'number';
            numberDiv.textContent = number ; 
            numberDiv.style.animationDelay = `${0.8 + (index * 0.15)}s`
            numbersContainer.appendChild(numberDiv);
        });
    
        resultsDiv.appendChild(numbersContainer);
    
        const newDrawButton = document.createElement('button');
        newDrawButton.className = 'btn new-draw';
        newDrawButton.textContent = 'Sortear novamente';
        const restartImg = document.createElement("img");
        restartImg.src = "assets/icons/Frame.svg";
        restartImg.alt = "ícone de restart";
        newDrawButton.appendChild(restartImg); 

        newDrawButton.addEventListener('click', () => {
            resultsDiv.style.animation = "fadeOut 0.5s ease forwards";
    
            setTimeout(() => {
                resultsDiv.remove();
                disappear.classList.remove('none');
    
                disappear.classList.remove('hiding');
        
                total.value = '';
                startValue.value = '';
                endValue.value = '';
        
            }, 500)
    
        });
        
        resultsDiv.appendChild(newDrawButton);
        
        
        disappear.parentNode.insertBefore(resultsDiv, disappear.nextSibling);



    }, 500)

   

}

toggleButton.addEventListener('click' , toggleRepeat)
submitBtn.addEventListener('click' ,sortNumbers)

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    sortNumbers();
})