

const readline = require('readline');
const currencies = ["PHP", "USD", "JPY", "GBP", "EUR", "CNY"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

let user = {
    name: "",
    balance: 1000,
    currency: "PHP",
    rates: {
        PHP: 1.0,      
        USD: 0.018,    
        JPY: 2.5,      
        GBP: 0.014,    
        EUR: 0.016,    
        CNY: 0.13,     
    }
}

async function main() {
    let continueProgram = true;
    let currentCase = null;
    
    while (continueProgram) {
        if (!currentCase) {
            console.log("\n" + "=".repeat(50));
            console.log("Select Transaction");
            console.log ("[1] Register Account Name");
            console.log ("[2] Deposit Amount");
            console.log ("[3] Withdraw Amount");
            console.log ("[4] Currency Exchange ");
            console.log ("[5] Record Exchange Rates");
            console.log ("[6] Show Interest Computation");
            console.log ("[7] Exit Program");

            let choice = await askQuestion("Enter your choice: ");
            currentCase = choice;
        }

    switch (currentCase) {
        case "1":
            console.log ("Register Account Name");
            let name = await askQuestion("Enter your name: ");
            user.name = name;
            console.log("Account name registered:", user.name);
            break;
        case "2":
            console.log ("Deposit Amount");
            let amount = await askQuestion("Enter the amount to deposit: ");
            user.balance += parseFloat(amount);
            console.log ("Deposited amount: ", amount);
            console.log ("Updated balance: ", user.balance);
            break;
        case "3":
            console.log ("Withdraw Amount");
            let withdrawAmount = await askQuestion("Enter the amount to withdraw: ");
            user.balance -= parseFloat(withdrawAmount);
            console.log ("Withdrawn amount: ", withdrawAmount);
            console.log ("Updated balance: ", user.balance);
            break;
        case "4":
            console.log ("Foreign Currency Exchange");
            console.log("Source Currency Options:");
            console.log("[1] Philippine Peso (PHP)");
            console.log("[2] United States Dollar (USD)");
            console.log("[3] Japanese Yen (JPY)");
            console.log("[4] British Pound Sterling (GBP)");
            console.log("[5] Euro (EUR)");
            console.log("[6] Chinese Yuan (CNY)");

            let sourceChoice = await askQuestion("Select source currency: ");
            let sourceAmount = await askQuestion("Enter source amount: ");

            console.log("\nTarget Currency Options:");
            console.log("[1] Philippine Peso (PHP)");
            console.log("[2] United States Dollar (USD)");
            console.log("[3] Japanese Yen (JPY)");
            console.log("[4] British Pound Sterling (GBP)");
            console.log("[5] Euro (EUR)");
            console.log("[6] Chinese Yuan (CNY)");

            let targetChoice = await askQuestion("Select target currency: ");
            let sourceCurrency = currencies[parseInt(sourceChoice) - 1];
            let targetCurrency = currencies[parseInt(targetChoice) - 1];
            
            
            let exchangeRate = user.rates[targetCurrency] / user.rates[sourceCurrency];
            let exchangedAmount = parseFloat(sourceAmount) * exchangeRate;
            
            console.log(`\nExchange Details:`);
            console.log(`Source: ${parseFloat(sourceAmount)} ${sourceCurrency}`);
            console.log(`Target: ${exchangedAmount.toFixed(2)} ${targetCurrency}`);
            console.log(`Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate.toFixed(4)} ${targetCurrency}`);
            break;
        case "5":
            console.log ("Record Exchange Rates");
            console.log("Select currency to update:");
            console.log("[1] Philippine Peso (PHP)");
            console.log("[2] United States Dollar (USD)");
            console.log("[3] Japanese Yen (JPY)");
            console.log("[4] British Pound Sterling (GBP)");
            console.log("[5] Euro (EUR)");
            console.log("[6] Chinese Yuan (CNY)");
            
            let currencyChoice = await askQuestion("Select currency to update: ");
            let newRate = await askQuestion("Enter new exchange rate (PHP value): ");
            let selectedCurrency = currencies[parseInt(currencyChoice) - 1];
            
            if (selectedCurrency === "PHP") {
                console.log("Cannot change PHP rate - it's the base currency (1.0)");
            } else {
                user.rates[selectedCurrency] = parseFloat(newRate);
                console.log(`Updated ${selectedCurrency} rate to: ${newRate}`);
                console.log(`1 PHP = ${newRate} ${selectedCurrency}`);
            }
            break;
        case "6":
            console.log ("Show Interest Computation");
            console.log(`Current Balance: ${user.balance} ${user.currency}`);
            console.log("Annual Interest Rate: 5% per Annum");
            console.log("Daily Interest Rate: 5% / 365 = 0.0137% per day");
            
            let days = await askQuestion("Enter number of days to compute interest: ");
            let numberOfDays = parseInt(days);
            
            if (isNaN(numberOfDays) || numberOfDays <= 0) {
                console.log("Invalid number of days. Please enter a positive number.");
                break;
            }
            
            const annualRate = 0.05;
            const dailyRate = annualRate / 365;
            
            let currentBalance = user.balance;
            let totalInterest = 0;
            
            console.log("\nInterest Computation Details:");
            console.log("Day | Balance | Daily Interest | Total Interest");
            console.log("----|---------|----------------|---------------");
            
            for (let day = 1; day <= numberOfDays; day++) {
                let dailyInterest = currentBalance * dailyRate;
                totalInterest += dailyInterest;
                currentBalance += dailyInterest;
                
                console.log(`${day.toString().padStart(3)} | ${currentBalance.toFixed(2).padStart(7)} | ${dailyInterest.toFixed(2).padStart(14)} | ${totalInterest.toFixed(2).padStart(13)}`);
            }
            
            console.log("\nSummary:");
            console.log(`Initial Balance: ${user.balance} ${user.currency}`);
            console.log(`Final Balance: ${currentBalance.toFixed(2)} ${user.currency}`);
            console.log(`Total Interest Earned: ${totalInterest.toFixed(2)} ${user.currency}`);
            console.log(`Interest Rate: ${(dailyRate * 100).toFixed(4)}% per day`);
            break;
        case "7":
            console.log("Thank you for using the Banking System!");
            continueProgram = false;
            break;
        default:
            console.log ("Invalid choice. Please select 1-7.");
    }
    
    if (continueProgram) {
        let continueChoice = await askQuestion("\nBack to the main menu (y/n): ");
        if (continueChoice.toLowerCase() === 'y' || continueChoice.toLowerCase() === 'yes') {
            currentCase = null;
        } else if (continueChoice.toLowerCase() === 'n' || continueChoice.toLowerCase() === 'no') {
        } else {
            console.log("Thank you for using the Banking System!");
            continueProgram = false;
        }
    }
    }
    
    rl.close();
}

main().catch(console.error);