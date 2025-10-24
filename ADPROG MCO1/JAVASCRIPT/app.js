/**
 * MCO1: Banking & Currency Exchange Application
 * Simplified JavaScript (Node.js) version
 * - No file I/O
 * - Single user only
 * - All data hard-coded
 *
 * Run: node banking_app_simple.js
 */

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const BASE_CURRENCY = "PHP";
const SUPPORTED = ["PHP", "USD", "JPY", "GBP", "EUR", "CNY"];
const ANNUAL_INTEREST_RATE = 0.05; // 5% per annum

// Hard-coded single user and exchange rates
let user = {
  name: "Juan Dela Cruz",
  currency: "PHP",
  balance: 1000.0,
};

let rates = {
  USD: 52.0,
  JPY: 0.36,
  GBP: 65.0,
  EUR: 56.0,
  CNY: 7.5,
};

function ask(q) {
  return new Promise((resolve) => readline.question(q, resolve));
}

function fmt(n) {
  return Number(n).toFixed(2);
}

// Convert between currencies
function convertAmount(amount, src, dest) {
  amount = Number(amount);
  if (isNaN(amount)) throw new Error("Invalid amount");

  if (src === dest) return amount;

  // Convert source to PHP
  let phpAmount;
  if (src === BASE_CURRENCY) phpAmount = amount;
  else phpAmount = amount * rates[src];

  // Convert PHP to destination
  if (dest === BASE_CURRENCY) return phpAmount;
  else return phpAmount / rates[dest];
}

// ---- FEATURES ----

async function depositAmount() {
  console.log("\n-- Deposit Amount --");
  console.log(`Current Balance: ${fmt(user.balance)} ${user.currency}`);

  SUPPORTED.forEach((c, i) => console.log(`[${i + 1}] ${c}`));
  const idx = Number(await ask("Deposit Currency: "));
  const cur = SUPPORTED[idx - 1] || "PHP";

  const amt = Number(await ask(`Deposit Amount (${cur}): `));
  if (isNaN(amt) || amt <= 0) return console.log("Invalid amount!");

  const converted = convertAmount(amt, cur, user.currency);
  user.balance += converted;

  console.log(
    `Deposited ${fmt(amt)} ${cur} -> ${fmt(converted)} ${user.currency}`
  );
  console.log(`Updated Balance: ${fmt(user.balance)} ${user.currency}`);
}

async function withdrawAmount() {
  console.log("\n-- Withdraw Amount --");
  console.log(`Current Balance: ${fmt(user.balance)} ${user.currency}`);

  SUPPORTED.forEach((c, i) => console.log(`[${i + 1}] ${c}`));
  const idx = Number(await ask("Withdraw Currency: "));
  const cur = SUPPORTED[idx - 1] || "PHP";

  const amt = Number(await ask(`Withdraw Amount (${cur}): `));
  if (isNaN(amt) || amt <= 0) return console.log("Invalid amount!");

  const converted = convertAmount(amt, cur, user.currency);
  if (converted > user.balance) return console.log("Insufficient balance!");

  user.balance -= converted;

  console.log(
    `Withdrew ${fmt(amt)} ${cur} -> ${fmt(converted)} ${user.currency}`
  );
  console.log(`Updated Balance: ${fmt(user.balance)} ${user.currency}`);
}

async function recordExchangeRate() {
  console.log("\n-- Record Exchange Rate --");
  SUPPORTED.filter((c) => c !== BASE_CURRENCY).forEach((c, i) =>
    console.log(`[${i + 1}] ${c}`)
  );

  const idx = Number(await ask("Select Currency: "));
  const foreign = SUPPORTED.filter((c) => c !== BASE_CURRENCY)[idx - 1];
  if (!foreign) return console.log("Invalid selection!");

  const rate = Number(await ask(`1 ${foreign} = X PHP: `));
  if (isNaN(rate) || rate <= 0) return console.log("Invalid rate!");

  rates[foreign] = rate;
  console.log(`Recorded new rate: 1 ${foreign} = ${fmt(rate)} PHP`);
}

async function currencyExchange() {
  console.log("\n-- Currency Exchange --");

  SUPPORTED.forEach((c, i) => console.log(`[${i + 1}] ${c}`));
  const srcIdx = Number(await ask("Source Currency: "));
  const src = SUPPORTED[srcIdx - 1];

  const amt = Number(await ask(`Amount (${src}): `));

  SUPPORTED.forEach((c, i) => console.log(`[${i + 1}] ${c}`));
  const destIdx = Number(await ask("Target Currency: "));
  const dest = SUPPORTED[destIdx - 1];

  const result = convertAmount(amt, src, dest);
  console.log(`${fmt(amt)} ${src} = ${fmt(result)} ${dest}`);
}

async function showInterest() {
  console.log("\n-- Show Interest Computation --");
  const days = Number(await ask("Number of Days: "));
  if (isNaN(days) || days <= 0) return console.log("Invalid number of days!");

  console.log(
    `\nAccount: ${user.name}\nCurrent Balance: ${fmt(
      user.balance
    )} ${user.currency}\nInterest Rate: 5% per annum`
  );
  console.log("Day | Interest | Balance");

  let balance = user.balance;
  for (let d = 1; d <= days; d++) {
    const interest = balance * (ANNUAL_INTEREST_RATE / 365);
    balance += interest;
    console.log(`${d.toString().padEnd(3)} | ${fmt(interest).padEnd(8)} | ${fmt(balance)}`);
  }
}

// ---- MAIN MENU ----
async function mainMenu() {
  while (true) {
    console.log("\n===== MAIN MENU =====");
    console.log("[1] Deposit Amount");
    console.log("[2] Withdraw Amount");
    console.log("[3] Record Exchange Rate");
    console.log("[4] Currency Exchange");
    console.log("[5] Show Interest Computation");
    console.log("[0] Exit");

    const choice = await ask("Select Transaction: ");

    switch (choice) {
      case "1":
        await depositAmount();
        break;
      case "2":
        await withdrawAmount();
        break;
      case "3":
        await recordExchangeRate();
        break;
      case "4":
        await currencyExchange();
        break;
      case "5":
        await showInterest();
        break;
      case "0":
        console.log("Thank you for using the app!");
        readline.close();
        return;
      default:
        console.log("Invalid option!");
    }

    const back = (await ask("Back to Main Menu (Y/N)? ")).toLowerCase();
    if (back !== "y") {
      console.log("Goodbye!");
      readline.close();
      return;
    }
  }
}

mainMenu();
