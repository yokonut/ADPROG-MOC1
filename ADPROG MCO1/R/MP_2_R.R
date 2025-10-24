#********************
#Last names: Barlaan, Jocson, Ko, Vergara
#Language: R
# Paradigm(s): Imperative, Procedural, Structural
#********************

currencies <- c("PHP", "USD", "JPY", "GBP", "EUR", "CNY")

exchangeRates <- list(
  PHP = 1.0,
  USD = 52.0,
  JPY = 0.38,
  GBP = 68.0,
  EUR = 57.0,
  CNY = 7.4
)

accounts <- list()
interestRate <- 0.05

repeat {
  cat("\nMain Menu\n")
  cat("\nSelect Transaction:\n")
  cat("[1] Register Account Name\n")
  cat("[2] Deposit Amount\n")
  cat("[3] Withdraw Amount\n")
  cat("[4] Currency Exchange\n")
  cat("[5] Record Exchange Rates\n")
  cat("[6] Show Interest Computation\n\n")
  cat("[0] Exit\n\n")
  
  choice <- readline("Enter choice number: ")
  
  # REGISTER ACCOUNT
  if (choice == "1") {
    cat("\nRegister Account Name\n\n")
    name <- readline("Account Name: ")
    if (name == "") {
      cat("Invalid name.\n")
      next
    }
    if (name %in% names(accounts)) {
      cat("Account already exists.\n")
      next
    }
    accounts[[name]] <- list(balance = 0, currency = "PHP")
    cat("\nBack to the Main Menu (Y/N): ")
    back <- toupper(readline())
    if (back == "N") break
    
    # DEPOSIT
  } else if (choice == "2") {
    cat("\nDeposit Amount\n\n")
    name <- readline("Account Name: ")
    if (!(name %in% names(accounts))) {
      cat("Account not found.\n")
      next
    }
    acct <- accounts[[name]]
    cat("Current Balance:", format(round(acct$balance,2), nsmall=2), "\n")
    cat("Currency: PHP\n\n")
    dep <- as.numeric(readline("Deposit Amount: "))
    if (is.na(dep) || dep <= 0) {
      cat("Invalid amount.\n")
      next
    }
    acct$balance <- acct$balance + dep
    accounts[[name]] <- acct
    cat("Updated Balance:", format(round(acct$balance,2), nsmall=2), "\n\n")
    cat("Back to the Main Menu (Y/N): ")
    back <- toupper(readline())
    if (back == "N") break
    
    # WITHDRAW
  } else if (choice == "3") {
    cat("\nWithdraw Amount\n\n")
    name <- readline("Account Name: ")
    if (!(name %in% names(accounts))) {
      cat("Account not found.\n")
      next
    }
    acct <- accounts[[name]]
    cat("Current Balance:", format(round(acct$balance,2), nsmall=2), "\n")
    cat("Currency: PHP\n\n")
    w <- as.numeric(readline("Withdraw Amount: "))
    if (is.na(w) || w <= 0) {
      cat("Invalid amount.\n")
      next
    }
    if (w > acct$balance) {
      cat("Insufficient funds.\n")
      next
    }
    acct$balance <- acct$balance - w
    accounts[[name]] <- acct
    cat("Updated Balance:", format(round(acct$balance,2), nsmall=2), "\n\n")
    cat("Back to the Main Menu (Y/N): ")
    back <- toupper(readline())
    if (back == "N") break
    
    # RECORD EXCHANGE RATE
  } else if (choice == "5") {
    repeat {
      cat("\nRecord Exchange Rate\n\n")
      cat("[1] Philippine Peso (PHP)\n")
      cat("[2] United States Dollar (USD)\n")
      cat("[3] Japanese Yen (JPY)\n")
      cat("[4] British Pound Sterling (GBP)\n")
      cat("[5] Euro (EUR)\n")
      cat("[6] Chinese Yuan Renminni (CNY)\n\n")
      num <- as.integer(readline("Select Foreign Currency: "))
      if (is.na(num) || num < 1 || num > 6) {
        cat("Invalid choice.\n")
        next
      }
      cur <- currencies[num]
      rate <- as.numeric(readline("Exchange Rate: "))
      if (is.na(rate) || rate <= 0) {
        cat("Invalid rate.\n")
        next
      }
      exchangeRates[[cur]] <- rate
      cat("\nBack to the Main Menu (Y/N): ")
      back <- toupper(readline())
      if (back == "Y") next
      if (back == "N") break
    }
    
    # CURRENCY EXCHANGE
  } else if (choice == "4") {
    repeat {
      cat("\nForeign Currency Exchange\n\n")
      cat("Source Currency Option:\n")
      cat("[1] Philippine Peso (PHP)\n")
      cat("[2] United States Dollar (USD)\n")
      cat("[3] Japanese Yen (JPY)\n")
      cat("[4] British Pound Sterling (GBP)\n")
      cat("[5] Euro (EUR)\n")
      cat("[6] Chinese Yuan Renminni (CNY)\n\n")
      s <- as.integer(readline("Source Currency: "))
      amt <- as.numeric(readline("Source Amount: "))
      cat("\nExchanged Currency Options:\n")
      cat("[1] Philippine Peso (PHP)\n")
      cat("[2] United States Dollar (USD)\n")
      cat("[3] Japanese Yen (JPY)\n")
      cat("[4] British Pound Sterling (GBP)\n")
      cat("[5] Euro (EUR)\n")
      cat("[6] Chinese Yuan Renminni (CNY)\n\n")
      t <- as.integer(readline("Exchange Currency: "))
      if (is.na(s) || is.na(t) || s < 1 || s > 6 || t < 1 || t > 6 || is.na(amt) || amt <= 0) {
        cat("Invalid input.\n")
        next
      }
      from <- currencies[s]
      to <- currencies[t]
      phpValue <- amt * exchangeRates[[from]]
      converted <- phpValue / exchangeRates[[to]]
      cat("Exchange Amount:", format(round(converted,2), nsmall=2), "\n\n")
      cat("Convert another currency (Y/N)? ")
      again <- toupper(readline())
      if (again == "N") break
    }
    
    # SHOW INTEREST
  } else if (choice == "6") {
    cat("\nShow Interest Amount\n\n")
    name <- readline("Account Name: ")
    if (!(name %in% names(accounts))) {
      cat("Account not found.\n")
      next
    }
    acct <- accounts[[name]]
    cat("Current Balance:", format(round(acct$balance,2), nsmall=2), "\n")
    cat("Currency: PHP\n")
    cat("Interest Rate: 5%\n\n")
    days <- as.integer(readline("Total Number of Days: "))
    if (is.na(days) || days <= 0) {
      cat("Invalid days.\n")
      next
    }
    bal <- acct$balance
    dailyRate <- interestRate / 365
    cat("\nDay | Interest | Balance\n")
    for (i in 1:days) {
      interest <- bal * dailyRate
      bal <- bal + interest
      cat(i, "|", format(round(interest,2), nsmall=2), "|", format(round(bal,2), nsmall=2), "\n")
    }
    cat("\nBack to the Main Menu (Y/N): ")
    back <- toupper(readline())
    if (back == "N") break
    
    # EXIT
  } else if (choice == "0") {
    cat("Exiting program. Goodbye!\n")
    break
    
  } else {
    cat("Invalid choice.\n")
  }
}

