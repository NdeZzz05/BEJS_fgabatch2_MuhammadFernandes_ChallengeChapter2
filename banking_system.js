import ValidationError from "./Utils/Error/validation_error.js";

class BankAccount {
  #balance = 0;

  deposit(amount) {
    return new Promise((resolve, reject) => {
      if (isNaN(amount) || amount <= 0) {
        reject(new ValidationError("Deposit", "Invalid amount"));
      } else {
        alert(`You have deposited ${amount} into your account`);
        setTimeout(() => {
          this.#balance += amount;
          console.log(`You have total balance: ${this.#balance}`);
          resolve(this.#balance);
        }, 1000);
      }
    });
  }

  withdraw(amount) {
    return new Promise((resolve, reject) => {
      if (isNaN(amount) || amount <= 0) {
        reject(new ValidationError("Withdraw", "Invalid amount"));
      } else if (amount > this.#balance) {
        reject(new ValidationError("Withdraw", "Insufficient funds"));
      } else {
        alert(`You have withdrawn ${amount} from your account`);
        setTimeout(() => {
          this.#balance -= amount;
          console.log(`You have total balance: ${this.#balance}`);
          resolve(this.#balance);
        }, 1000);
      }
    });
  }

  transfer(amount, targetAccount) {
    if (isNaN(amount) || amount <= 0) throw new ValidationError("Transfer", "Invalid amount");
    return new Promise(async (resolve, reject) => {
      if (targetAccount instanceof BankAccount) {
        try {
          await this.withdraw(amount);
          await targetAccount.deposit(amount);
          console.log(`Successfully transferred ${amount} to target account`);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new ValidationError("Transfer", "Invalid target account"));
      }
    });
  }

  get balance() {
    return this.#balance;
  }
}

const account1 = new BankAccount();
const account2 = new BankAccount();

const run = async () => {
  try {
    await account1.deposit(10000);
    await account1.transfer(10000, account2);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`${error.param}: ${error.message}`);
    } else {
      console.log(error.message);
    }
  }
};
run();
