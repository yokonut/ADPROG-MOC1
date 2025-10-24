/********************
Last names: JOCSON (programmer for this file), BARLAAN, KO, VERGARA
Language: KOTLIN
Paradigm(s): MULTI PARADIGM (OBJECT-ORIENTED, FUNCTIONAL, IMPERATIVE)
********************/

// Displays the main menu
fun displayMainMenu() {
    println("Select Transaction:")
    println("[1] Register Account Name")
    println("[2] Deposit Amount")
    println("[3] Withdraw Amount")
    println("[4] Currency Exchange")
    println("[5] Record Exchange Rates")
    println("[6] Show Interest Computation")
    println("[0] Exit")
    print("Input: ")
}

// Helper function to read a non-empty line from the user
fun readNonEmptyLine(prompt: String = ""): String {
    while (true) {
        if (prompt.isNotEmpty()) print(prompt)
        val line = readLine()
        if (!line.isNullOrBlank()) return line
        println("Please enter a value.")
    }
}

// Helper function to read a Double from the user to reduce null checking in the code
fun readDouble(prompt: String = ""): Double {
    while (true) {
        val s = readNonEmptyLine(prompt)
        val d = s.toDoubleOrNull()
        if (d != null) return d
        println("Invalid number. Try again.\n")
    }
}

// Helper function to read an Int from the user to reduce null checking in the code
fun readInt(prompt: String = ""): Int {
    while (true) {
        val s = readNonEmptyLine(prompt)
        val i = s.toIntOrNull()
        if (i != null) return i
        println("Invalid number. Try again.\n")
    }
}

// Prompt to go back to the main menu
fun backToMenuPrompt() : Boolean {
    print("\nBack to main menu? (Y/N): ")
    var backToMenu = readLine()
    return backToMenu.equals("Y", ignoreCase = true)
}

// Returns the registered account name from user input
fun menuRegisterAccountName() : String {
    println("Register Account Name")
    print("Account Name: ")
    var accountName : String = readLine().toString()
    return accountName
}

// Returns the updated balance after getting the deposit amount from user input
fun menuDepositAmount(accountName : String, currentBalance : Double, baseCurrency : String) : Double {
    println("Deposit Amount")
    println("Account Name: $accountName")
    println("Current Balance: $currentBalance")
    println("Currency: $baseCurrency\n")
    var depositAmount = 0.0
    do {
        depositAmount = readDouble("Deposit Amount: ")
        if (depositAmount <= 0) {
            println("Invalid deposit amount. Please try again.\n")
        }
    } while (depositAmount <= 0)
    var updatedBalance = currentBalance + depositAmount
    println("Updated Balance: $updatedBalance")
    return updatedBalance
}

// Returns the updated balance after getting the withdraw amount from user input
fun menuWithdrawAmount(accountName : String, currentBalance : Double, baseCurrency : String) : Double {
    println("Withdraw Amount")
    println("Account Name: $accountName")
    println("Current Balance: $currentBalance")
    println("Currency: $baseCurrency\n")
    var withdrawAmount = 0.0
    do {
        withdrawAmount = readDouble("Withdraw Amount: ")
        if (withdrawAmount <= 0 || withdrawAmount > currentBalance) {
            println("Invalid withdraw amount. Please try again.\n")
        }
    } while (withdrawAmount <= 0 || withdrawAmount > currentBalance)
    var updatedBalance = currentBalance - withdrawAmount
    println("Updated Balance: $updatedBalance")
    return updatedBalance
}

// Helper function to perform currency exchange operation
fun exchangeCurrency(sourceAmount: Double, sourceCurrency: String, exchangeCurrency: String, currenciesRate: MutableMap<String, Double>): Double {
    var sourceBase = sourceAmount * currenciesRate[sourceCurrency]!!    // first convert to base currency (PHP)
    var converted = sourceBase / currenciesRate[exchangeCurrency]!!   // then convert to exchanged currency
    return converted

}

// Menu function to handle currency exchange
fun menuCurrencyExchange(currencies: MutableMap<String, String>, currenciesRate: MutableMap<String, Double>) {
    println("Foreign Currency Exchange")
    println("Source Currency Option:")
    // Shows currency options in mutable map
    for ((index, entry) in currencies.entries.withIndex()) {
        val key = entry.key
        val value = entry.value
        println("[${index + 1}] $value ($key)")
    }
    println("")
    
    // Gets valid source currency option from user
    var selectedIndex: Int
    do {
        selectedIndex = readInt("Source Currency: ") - 1
        if (selectedIndex !in currencies.keys.indices) {
            println("Invalid option. Please try again.\n")
        }
    } while (selectedIndex !in currencies.keys.indices)
    var sourceCurrency = currencies.keys.elementAt(selectedIndex)

    var sourceAmount = readDouble("Source Amount: ")
    println("")

    // Shows currency options again for exchange currency
    println("Exchanged Currency Options:")
        for ((index, entry) in currencies.entries.withIndex()) {
        val key = entry.key
        val value = entry.value
        println("[${index + 1}] $value ($key)")
    }

    // Gets valid exchange currency option from user
    println("")
    do {
        selectedIndex = readInt("Exchange Currency: ") - 1
        if (selectedIndex !in currencies.keys.indices) {
            println("Invalid option. Please try again.\n")
        }
    } while (selectedIndex !in currencies.keys.indices)

    // Performs currency exchange and shows the formatted exchanged amount
    var exchangeCurrency = currencies.keys.elementAt(selectedIndex)
    var convertedAmount = exchangeCurrency(sourceAmount, sourceCurrency, exchangeCurrency, currenciesRate)
    println("Exchange Amount: ${"%.2f".format(convertedAmount)}")
}

// Menu function to show current exchange rates and record new exchange rates
fun menuRecordExchangeRates(currencies: MutableMap<String, String>, currenciesRate: MutableMap<String, Double>) {
    println("Record Exchange Rate\n")
    for ((index, entry) in currencies.entries.withIndex()) {
        val key = entry.key
        val value = entry.value
        println("[${index + 1}] $value ($key)")
    }
    println("")
    var selectedIndex = readInt("Select Foreign Currency: ") - 1
    var selectedCurrency = currenciesRate.entries.elementAt(selectedIndex)
    println("Current Exchange Rate: ${selectedCurrency.key} -> ${selectedCurrency.value}")
    var exchangeRate = readDouble("Update Exchange Rate: ")
    currenciesRate[selectedCurrency.key] = exchangeRate
}

// Menu function to show interest computation over a number of days
fun menuShowInterestAmount(accountName : String, currentBalance : Double, baseCurrency : String, interestRate : Double) {
    println("Show Interest Amount\n")
    println("Account Name: $accountName")
    println("Current Balance: $currentBalance")
    println("Currency: $baseCurrency")
    println("Interest Rate: ${interestRate * 100}%\n")
    var days = readInt("Total Number of Days: ")
    var dailyInterestRate = interestRate / 365
    var updatedBalance = currentBalance

    // Padding for table formatting
    val dayCol = 4
    val interestCol = 12
    val balanceCol = 14
    println("Day".padEnd(dayCol) + " | " + "Interest".padEnd(interestCol) + " | " + "Balance".padEnd(balanceCol) + " |")

    // Iterates over number of days and computes daily interest and adds it to the updated balance
    for (day in 1..days) {
        var dailyInterest = dailyInterestRate * updatedBalance
        updatedBalance = updatedBalance + dailyInterest
        var interest = "%.4f".format(dailyInterest).padStart(interestCol)
        var balance = "%.2f".format(updatedBalance).padStart(balanceCol)
        println(day.toString().padEnd(dayCol) + " | " + interest + " | " + balance + " |")
    }
}   

fun main () {
    // Initialize default values
    var accountName: String = ""
    var currentBalance: Double = 1000.0
    var currenciesRate = mutableMapOf("PHP" to 1.0, "USD" to 58.62, "JPY" to 0.38, "GBP" to 78.09, "EUR" to 68.05, "CNY" to 8.23)
    var currencies = mutableMapOf("PHP" to "Philippine Peso", 
                                "USD" to "United States Dollar", 
                                "JPY" to "Japanese Yen", 
                                "GBP" to "British Pound Sterling", 
                                "EUR" to "Euro", 
                                "CNY" to "Chinese Yuan Renminni") // Default values based on current exchange rates
    var baseCurrency = "PHP"
    val interestRate = 0.05

    // Main program loop
    do {
        displayMainMenu()
        var input = readLine()
        println("")
        if (input == "1") {
            do {
                accountName = menuRegisterAccountName()
            } while (!backToMenuPrompt())
        } else if (input == "2") {
            do {
                currentBalance = menuDepositAmount(accountName, currentBalance, baseCurrency)
            } while (!backToMenuPrompt())
        } else if (input == "3") {
            do {
                currentBalance = menuWithdrawAmount(accountName, currentBalance, baseCurrency)
            } while (!backToMenuPrompt())
        } else if (input == "4") {
            do {
                menuCurrencyExchange(currencies, currenciesRate)
            } while (!backToMenuPrompt())
        } else if (input == "5") {
            do {
                menuRecordExchangeRates(currencies, currenciesRate)
            } while (!backToMenuPrompt())
        } else if (input == "6") {
            do {
                menuShowInterestAmount(accountName, currentBalance, baseCurrency, interestRate)
            } while (!backToMenuPrompt())
        } else if (input == "0") {
            println("Exiting the program.")
        } else {
            println("Invalid input. Please try again.\n")
        }
        

    } while (input != "0")
}