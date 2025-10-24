/********************
Last names: Barlaan, Ko, Jocson, Vergara
Language: Rust
Paradigm(s): Imperative, Functional
********************/

use std::io;

/*
 * Structure for bank account details
 * String name - Bank account name
 * f64 balance - Bank account balance
 * String currency - Bank account currency
 */
struct BankAccount {
    name: String,
    balance: f64,
    currency: String,
}

/*
 * @param accounts - mutable reference to BankAccount struct
 */
fn register_account(accounts: &mut BankAccount) {
    println!("Register Account Name");
    println!("Account Name: ");
    io::stdin().read_line(&mut accounts.name).expect("Failed to read");
    accounts.name = accounts.name.trim().to_string();
    println!("Account '{}' registered", accounts.name);
}

/*
 * Function for depositing an amount of money to the bank account
 * @param accounts - mutable reference to BankAccount struct
 */
fn deposit_amount(accounts: &mut BankAccount) {
    // Display account details
    println!("Deposit Amount");
    println!("Account Name: {}", accounts.name);
    println!("Current Balance: {}", accounts.balance);
    println!("Currency: {}", accounts.currency);
    loop { // Loop until valid input
        let mut input = String::new();
        println!("\nEnter Deposit Amount: ");
        io::stdin().read_line(&mut input).unwrap();
        match input.trim().parse::<f64>() {
            Ok(num) if num > 0.0 => {
                accounts.balance += num;
                break;
            }
            Ok(_) => println!("Invalid input. Please deposit a positive amount."),
            Err(_) => println!("Invalid input. Please enter a number."),
        }
    }
    println!("New Balance: {}", accounts.balance);
}

/*
 * Function for withdrawing an amount of money from the bank account
 * @param accounts - mutable reference to BankAccount struct
 */
fn withdraw_amount(accounts: &mut BankAccount) {
    // Display account details
    println!("Withdraw Amount");
    println!("Account Name: {}", accounts.name);
    println!("Current Balance: {}", accounts.balance);
    println!("Currency: {}", accounts.currency);
    loop { // Loop until valid input
        let mut input = String::new();
        println!("\nEnter Withdraw Amount: ");
        io::stdin().read_line(&mut input).unwrap();
        match input.trim().parse::<f64>() {
            Ok(num) if num >= 0.0 => {
            if num > accounts.balance {
                println!("You cannot withdraw more than your current balance ({:.2}).", accounts.balance);
            } else {
                accounts.balance -= num;
                break;
            }
        }
            Ok(_) => println!("Invalid input. Please withdraw an amount greater than 0."),
            Err(_) => println!("Invalid input. Please enter a number."),
        }
    }
    println!("New Balance: {}", accounts.balance);
}

/*
 * Function for calculating the currency exchange with php as the base rate
 * @param rates[] - Reference to an array of f64 exchange rates
 */
fn currency_exchange(rates: [f64; 6]) {
    let mut source: u32;
    let mut source_amount: f64;
    let mut exchange: u32;
    let mut exchange_amount: f64;
    let mut again = String::from("Y");

    while again.trim().eq_ignore_ascii_case("Y") {
    println!("Currency Exchange");
    println!("Source Currency Options: ");
    println!("[1] Philippine Peso (PHP)");
    println!("[2] United States Dollar (USD)");
    println!("[3] Japanese Yen (JPY)");
    println!("[4] British Pound Sterling (GBP)");
    println!("[5] Euro (EUR)");
    println!("[6] Chinese Yuan (CNY)");
    println!("\nSource Currency: ");
    loop { // Loop to check for valid input for source currency
        let mut source_input = String::new();
        io::stdin().read_line(&mut source_input).expect("Failed to read line");
        match source_input.trim().parse::<u32>() {
            Ok(num) if num >= 1 && num <= 6 => {
                source = num;
                break;
            }
            Ok(_) => {
                println!("Invalid choice! Please enter a number between 1 and 6.");
            }
            Err(_) => {
                println!("Invalid input! Please enter a valid number.");
            }
        }
    }
    println!("Enter Source Amount: ");
    loop { // Loop to check for valid input for source amount
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");
        match input.trim().parse::<f64>() {
            Ok(num) if num > 0.0 => {
                source_amount = num;
                break;
            }
            Ok(_) => {
                println!("Invalid amount! Please enter a positive number.");
            }
            Err(_) => {
                println!("Invalid input! Please enter a valid number.");
            }
        }
    }
    println!("Exchanged Currency Options: ");
    println!("[1] Philippine Peso (PHP)");
    println!("[2] United States Dollar (USD)");
    println!("[3] Japanese Yen (JPY)");
    println!("[4] British Pound Sterling (GBP)");
    println!("[5] Euro (EUR)");
    println!("[6] Chinese Yuan (CNY)");
    println!("\nExchange Currency: ");
    loop { // Loop to check for valid input for exchange currency
        let mut exchange_input = String::new();
        io::stdin().read_line(&mut exchange_input).expect("Failed to read line");
        match exchange_input.trim().parse::<u32>() {
            Ok(num) if num >= 1 && num <= 6 => {
                exchange = num;
                break;
            }
            Ok(_) => {
                println!("Invalid choice! Please enter a number between 1 and 6.");
            }
            Err(_) => {
                println!("Invalid input! Please enter a valid number.");
            }
        }
    }
    exchange_amount = source_amount * (rates[source as usize - 1] / rates[exchange as usize - 1]);
    println!("Exchanged Amount: {:.2}", exchange_amount);
    again.clear();
    loop { // Loop to ask and check for valid input for converting another currency
            let mut yn = String::new();
            println!("\nConvert another currency (Y/N)?");
            io::stdin().read_line(&mut yn).expect("Failed to read line");
            let yn = yn.trim();
            if yn.eq_ignore_ascii_case("Y") || yn.eq_ignore_ascii_case("N") {
                again = yn.to_string();
                break;
            } else {
                println!("Invalid input. Please enter Y or N");
            }
        }   
    }
}

/*
 * Function to record exchange rates for different currencies
 * @param rates[] - mutable reference to an array of f64 exchange rates
 */
fn record_exchange_rates(rates: &mut [f64; 6]) {
    let choice: u32;
    println!("Record Exchange Rate\n");
    println!("[1] Philippine Peso (PHP)");
    println!("[2] United States Dollar (USD)");
    println!("[3] Japanese Yen (JPY)");
    println!("[4] British Pound Sterling (GBP)");
    println!("[5] Euro (EUR)");
    println!("[6] Chinese Yuan (CNY)");
    println!("\nSelect Foreign Currency: ");
    loop { // Loop to check for valid input for currency choice
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");
        match input.trim().parse::<u32>() {
            Ok(num) if num >= 1 && num <= 6 => {
                choice = num;
                break;
            }
            Ok(_) => {
                println!("Invalid choice! Please enter a number between 1 and 6.");
            }
            Err(_) => {
                println!("Invalid input! Please enter a valid number.");
            }
        }
    }
    println!("Exchange Rate: ");
    loop { // Loop to check for valid input for exchange rate
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");
        match input.trim().parse::<f64>() {
            Ok(rate) if rate > 0.0 => {
                rates[choice as usize - 1] = rate;
                break;
            }
            _ => println!("Invalid input. Please enter a positive number"),
        }
    }
}
/*
 * Function to show interest computation over a number of days
 * @param accounts - reference to BankAccount struct
 */
fn show_interest(accounts: &BankAccount) {
    let daily_interest: f64 = accounts.balance * (0.05 / 365.0); // Computation based on what was given in the MCO1 pdf
    let days: u32;
    let mut total_balance = accounts.balance;
    let rounded_interest = (daily_interest * 100.0).round() / 100.0; // Rounding the daily interst to 2 decimal places

    println!("Show Interest Amount");
    println!("Account Name: {} ", accounts.name);
    println!("Current Balance: {} ", accounts.balance);
    println!("Currency: {} ", accounts.currency);
    println!("Interest Rate: 5%");
    println!("Daily Interest: {}", rounded_interest);
    println!("\nTotal Number of Days: ");
    loop { // Loop to check for valid input for number of days
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");
        match input.trim().parse::<u32>() {
            Ok(num) if num > 0 => {
                days = num;
                break;
            }
            Ok(_) => {
                println!("Invalid amount! Please enter a positive number.");
            }
            Err(_) => {
                println!("Invalid input! Please enter a valid number.");
            }
        }
    }
    println!("Day | Interest | Balance |");
    println!("---------------------------");
    for day in 1..=days {
        total_balance += rounded_interest;
        println!("{} | {:.2} | {:.2} |", day, rounded_interest, total_balance);
    }
}



/*
 * Helper function to display main menu options
 */
fn menu() {
    println!("Select Transaction: ");
    println!("[1] Register Account Name");
    println!("[2] Deposit Amount");
    println!("[3] Withdraw Amount");
    println!("[4] Currency Exchange");
    println!("[5] Record Exchange Rates");
    println!("[6] Show Interest Computation");
}


fn main() {
    let mut go_menu = String::from("Y");
    let mut transaction_choice: u32;
    let mut accounts = BankAccount {
        name: String::new(),
        balance: 0.0,
        currency: String::from("PHP"),
    };
    let mut rates = [1.0, 58.63, 0.39, 78.05, 68.09, 8.23];

    while go_menu.trim().eq_ignore_ascii_case("Y") { // Main menu loop to ensure that user will go back to the main menu after each transaction
        menu();
        loop {
            let mut input = String::new();
            println!("Enter choice [1-6]: ");
            io::stdin().read_line(&mut input).expect("Failed to read line");
            match input.trim().parse::<u32>() {
                Ok(num) if num >= 1 && num <= 6 => {
                    transaction_choice = num;
                    break;
                }
                Ok(_) => {
                    println!("Invalid choice! Please enter a number between 1 and 6.");
                }
                Err(_) => {
                    println!("Invalid input! Please enter a valid number.");
                }
            }
        }
        match transaction_choice {
            1 => register_account(&mut accounts),
            2 => deposit_amount(&mut accounts),
            3 => withdraw_amount(&mut accounts),
            4 => currency_exchange(rates),
            5 => record_exchange_rates(&mut rates),
            6 => show_interest(&accounts),
            _ => unreachable!(),
        }

        go_menu.clear();
            loop {
            let mut yn = String::new();
            println!("\nBack to the Main Menu (Y/N): ");
            io::stdin().read_line(&mut yn).expect("Failed to read line");
            let yn = yn.trim();

            if yn.eq_ignore_ascii_case("Y") || yn.eq_ignore_ascii_case("N") {
                go_menu = yn.to_string();
                break;
            } else {
                println!("Invalid input. Please enter Y or N");
            }
        }

        if go_menu.eq_ignore_ascii_case("N") {
            println!("\nExiting program.");
        }
    }
}