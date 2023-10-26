const interestRate = 2.2;
let amount = null;
let period = null;

document.addEventListener("DOMContentLoaded", function () {
    const loanAmountInput = document.getElementById("loanAmount");
    const repaymentPeriodInput = document.getElementById("repaymentPeriod");
    const dailyRepaymentOutput = document.getElementById("dailyRepayment");
    const totalRepaymentOutput = document.getElementById("totalRepayment");
    const calculateButton = document.getElementById("calculateButton");
    const inputContainerAmount = document.getElementById("amount");
    const inputContainerPeriod = document.getElementById("period");
    const calculatorBlock = document.getElementById("calculator");
    const greetingBlock = document.getElementById("greeting");
    const backButton = document.getElementById("backButton");
    const greetingContent = document.getElementById("greetingContent");

    calculateButton.addEventListener("click", () => {
        calculatorBlock.style.display = "none";
        greetingBlock.style.display = "block"; 

        let periodText;

        if ((period % 10) === 1) {
            periodText = "день";
        } else if ((period % 10) >= 2 && (period % 10) <= 4) {
            periodText = "дні";
        } else {
            periodText = "днів";
        }

        greetingContent.textContent = `Вам надано кредит ${amount} грн на ${period} ${periodText}!`;
    });

    backButton.addEventListener("click", () => {
        calculatorBlock.style.display = "block";
        greetingBlock.style.display = "none";
    });

    loanAmountInput.addEventListener("input", () => {
        updateRepayments();
        loanAmountValidation();
    });
    
    repaymentPeriodInput.addEventListener("input", () => {
        updateRepayments();
        repaymentPeriodValidation();
    });

    function updateRepayments() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseInt(repaymentPeriodInput.value);
        amount = loanAmount;
        period = repaymentPeriod;
        if (loanAmount >= 1000 && loanAmount <= 50000 && repaymentPeriod >= 7 && repaymentPeriod <= 60){
            const dailyRepayment = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;
            const totalRepayment = dailyRepayment * repaymentPeriod;
    
            dailyRepaymentOutput.textContent = dailyRepayment.toFixed(2) + " грн.";
            totalRepaymentOutput.textContent = totalRepayment.toFixed(2) + " грн.";
            validateInputs(loanAmount, repaymentPeriod);

        } else {
            calculateButton.setAttribute("disabled", "true");
            dailyRepaymentOutput.textContent = '0 грн.';
            totalRepaymentOutput.textContent = '0 грн.';
        };
    };

    function validateInputs(loanAmount, repaymentPeriod) {
        if (loanAmount >= 1000 && loanAmount <= 50000 && repaymentPeriod >= 7 && repaymentPeriod <= 60) {
            calculateButton.removeAttribute("disabled");
        } else {
            calculateButton.setAttribute("disabled", "true");
        };
    };

    function loanAmountValidation() {
        const value = parseFloat(loanAmountInput.value);
        const existingErrorElement = document.getElementById("loan-error");
        if (isNaN(value) || value < 1000 || value > 50000) {

            if (!existingErrorElement){
                const spanElement = document.createElement("span");
                spanElement.textContent = "Позика має бути від 1000 до 50000";
                spanElement.classList.add("error");
                spanElement.id = "loan-error";
                inputContainerAmount.appendChild(spanElement);
            }
        } else {
            existingErrorElement ? existingErrorElement.remove() : '';
        };
    };

    function repaymentPeriodValidation() {
        const value = parseFloat(repaymentPeriodInput.value);
        const existingErrorElement = document.getElementById("period-error");
        if (isNaN(value) || value < 7 || value > 60) {
            if(!existingErrorElement){
                const spanElement = document.createElement("span");
                spanElement.textContent = "Період має бути від 7 до 60 днів";
                spanElement.classList.add("error");
                spanElement.id = "period-error";
                inputContainerPeriod.appendChild(spanElement);
            }
        } else {
            existingErrorElement ? existingErrorElement.remove() : '';
        };
    };
});

