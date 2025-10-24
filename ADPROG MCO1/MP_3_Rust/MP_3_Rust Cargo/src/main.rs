use std::io;

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
    let go_menu = "Y";
    let mut transaction_choice = 0;

    while go_menu == "Y" {
        menu();
        println!("Enter choice: ");
        io::stdin()
            .read_line(&mut transaction_choice);
    }

}
