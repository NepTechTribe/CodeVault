# Banking Management System


A simple C++ console application that demonstrates basic banking operations: creating accounts, depositing and withdrawing funds, checking balances, listing account holders, updating and closing accounts.


## Table of Contents
- Introduction
- Features
- Requirements
- Build & Run (Windows)
- Usage
- Contributing
- Authors
- License


## Introduction
This project is a learning example of a banking management system implemented in C++. It models account operations and a simple menu-driven interface.


## Features
- Create new accounts
- Deposit funds
- Withdraw funds
- Balance enquiry
- List all account holders
- Update account information
- Close accounts
- Simple file-based persistence (if implemented in the project)


## Requirements
- A C++ compiler (g++ from MinGW, MSVC, or clang)
- Windows 10/11 (development instructions below assume Windows CLI)


## Build & Run (Windows)
Using g++ (MinGW):
```bat
g++ -std=c++17 -o banking main.cpp account.cpp   :: adjust filenames as needed
.\banking.exe
```


Using Visual Studio Developer Command Prompt (MSVC):
```bat
cl /EHsc main.cpp account.cpp   :: adjust filenames as needed
main.exe
```


If the project has a provided Makefile or VS solution, prefer those.


## Usage
Run the compiled executable. Use the menu to:
- Create account: provide name, account type, initial deposit.
- Deposit/Withdraw: enter account number and amount.
- Balance Enquiry: view current balance.
- List All: show all stored accounts.
- Update/Close: modify or remove an account.
- Exit: quit the program (ensure data is saved if persistence is implemented).


## Contributing
- Fork the repository.
- Create a feature branch: git checkout -b feature/your-feature
- Commit changes and open a pull request.
- Keep changes focused and add tests where applicable.


## Authors
- Upendra Raj Joshi
- Aagaman KC
