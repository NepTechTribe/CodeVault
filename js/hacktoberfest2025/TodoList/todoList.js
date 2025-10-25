/**
 * Interactive Todo List Application
 * With menu options for: Add task, Delete task, Complete tasks, show the current state of the list and exit.
 * Features persistent storage in todos.txt file so the user's list does not disappears when he closes the program.
 * Run : node todoList.js
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Stores the file path
const STORAGE_FILE = path.join(__dirname, 'todos.txt');

let todos = [];
let nextId = 1;

// this is a class for the todo item and it's charachteristics
class Todo {
    constructor(text, id = null, completed = false) {
        this.id = id || nextId++;
        this.text = text;
        this.completed = completed;
    }
}

// loads all the todos of the user
function loadTodos() {
    try {
        if (fs.existsSync(STORAGE_FILE)) {
            const data = fs.readFileSync(STORAGE_FILE, 'utf8');
            if (data.trim()) {
                const savedData = JSON.parse(data);
                todos = savedData.todos.map(t => new Todo(t.text, t.id, t.completed));
                nextId = savedData.nextId;
                
            }
        }
    } catch (error) {
        console.log('⚠️  Could not load previous todos. Starting fresh.');
    }
}

// here the function saves all the todos to the txt file.
function saveTodos() {
    try {
        
        if (todos.length === 0) {
            fs.writeFileSync(STORAGE_FILE, '', 'utf8');
        } else {
            const data = {
                todos: todos,
                nextId: nextId
            };
            fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf8');
        }
    } catch (error) {
        console.log('⚠️  Warning: Could not save todos to file.');
    }
}

// this is a function that is used to display the menu to the user
function showMainMenu() {
    console.log('╔════════════════════════════════╗');
    console.log('║             MENU               ║');
    console.log('╠════════════════════════════════╣');
    console.log('║ 1.  Add a new task             ║');
    console.log('║ 2.  Remove a task              ║');
    console.log('║ 3.  Mark a task as complete    ║');
    console.log('║ 4.  Show all tasks             ║');
    console.log('║ 5.  Exit                       ║');
    console.log('╚════════════════════════════════╝');
    
    rl.question('Choose a function (1-5): ', handleMenuChoice);
}

// here we do all the functions based on the input of the user.
function handleMenuChoice(choice) {
    switch(choice.trim()) {
        case '1':
            addNewTask();
            break;
        case '2':
            deleteTask();
            break;
        case '3':
            completeTask();
            break;
        case '4':
            showAllTasks();
            break;
        case '5':
            exitApp();
            break;
        default:
            console.log('\n❌ Not a valid option. Please pick a number from 1-5.');
            showMainMenu();
    }
}

// function for adding a task
function addNewTask() {
    rl.question('\nWrite your new task: ', (text) => {
        if (text.trim() === '') {
            console.log("\n\n");
            showMainMenu();
            return;
        }
        
        const todo = new Todo(text.trim());
        todos.push(todo);
        saveTodos();
        console.log(`\n✅ New task was added to your list: "${text}"`);
        
        // Display updated list
        console.log("\n\n");
        displayTodos();
        showMainMenu();
    });
}

// function for deleting a task
function deleteTask() {
    if (todos.length === 0) {
        console.log('\n❌ There are currently no available tasks to be deleted!');
        console.log("\n\n");
        showMainMenu();
        return;
    }
    
    console.log('\n Choose a task you want to delete');
    console.log('---------------------------------------------------');
    todos.forEach(todo => {
        const status = todo.completed ? '✓' : ' ';
        console.log(`${todo.id}. [${status}] ${todo.text}`);
    });

    console.log('---------------------------------------------------');    
    rl.question('Type the number of the task (or press 0 if you want to cancel the deletion): ', (id) => {
        const taskId = parseInt(id);
        
        if (taskId === 0) {
            console.log('Cancelling function...');
            console.log("\n\n");
            showMainMenu();
            return;
        }
        
        const todo = todos.find(t => t.id === taskId);
        
        if (!todo) {
            console.log('\n❌ No task was found with this ID!');
            console.log("\n\n");
            showMainMenu();
            return;
        }
        
        
        rl.question(`\n⚠️  Are you sure you want to delete the task: "${todo.text}"? (y-yes / n-no): `, (confirm) => {
            if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
                todos = todos.filter(t => t.id !== taskId);
                
                // Renumber all tasks after deletion
                todos.forEach((t, index) => {
                    t.id = index + 1;
                });
                nextId = todos.length + 1;
                
                saveTodos();
                console.log('\n✅ The task was successfully deleted!');
                console.log("\n\n");
                displayTodos();
            } else {
                console.log('\n❌ The removal of the task was cancelled.');
            }
            showMainMenu();
        });
    });
}

// function for marked as deleted
function completeTask() {
    if (todos.length === 0) {
        console.log('\n❌ There are currently no tasks!');
        console.log("\n\n");
        showMainMenu();
        return;
    }
    
    console.log('\nChoose a task you want to mark as completed:');
    console.log('════════════════════════════════');
    todos.forEach(todo => {
        const status = todo.completed ? '✓' : ' ';
        console.log(`${todo.id}. [${status}] ${todo.text}`);
    });
    console.log('════════════════════════════════');
    
    rl.question('Type the number of the task (or press 0 to return to the menu): ', (id) => {
        const taskId = parseInt(id);
        
        if (taskId === 0) {
            console.log('Cancelling the process...');
            console.log("\n\n");
            showMainMenu();
            return;
        }
        
        const todo = todos.find(t => t.id === taskId);
        
        if (!todo) {
            console.log('\n❌ No task was found with this ID!');
            console.log("\n\n");
            showMainMenu();
            return;
        }
        
        todo.completed = !todo.completed;
        saveTodos();
        
        if (todo.completed) {
            console.log(`\n✅ The task "${todo.text}" has been marked as completed!`);
        } else {
            console.log(`\n↩️  The task "${todo.text}" is now pending again.`);
        }

        console.log("\n\n");
        displayTodos();
        showMainMenu();
    });
}

// here we display all the todos. both the finished and the unfinished.
function displayTodos() {
    console.log('╔════════════════════════════════╗');
    console.log('║            My List             ║');
    console.log('╚════════════════════════════════╝');
    
    if (todos.length === 0) {
        console.log('There are currently no tasks');
    } else {
        const pending = todos.filter(t => !t.completed);
        const completed = todos.filter(t => t.completed);
        
        if (pending.length > 0) {
            console.log('\n🔴 Not finished yet:');
            pending.forEach(todo => {
                console.log(`   ${todo.id}. [ ] ${todo.text}`);
            });
        }
        
        if (completed.length > 0) {
            console.log('\n🟢 Finished:');
            completed.forEach(todo => {
                console.log(`   ${todo.id}. [✓] ${todo.text}`);
            });
        }
    }
    console.log('------------------------------------------------------------------------');
}


function showAllTasks() {
    console.log("\n\n");
    console.log('📋 Displaying all tasks...\n');
    displayTodos();
    showMainMenu();
}


function exitApp() {
    console.log('\n👋 Goodbye, hope to see you soon. Your list has been saved!');
    rl.close();
}


console.log('\n Welcome to your Todo List!');
loadTodos();
displayTodos();
showMainMenu();

// Handle closing
rl.on('close', () => {
    process.exit(0);
});