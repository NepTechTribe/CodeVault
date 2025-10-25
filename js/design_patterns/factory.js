/**
 * FACTORY PATTERN
 * 
 * Purpose: Creates objects without specifying their exact class.
 * 
 * When to use:
 * - Object creation logic is complex
 * - Need to create objects based on runtime conditions
 * - Want to decouple object creation from object usage
 * - Creating families of related objects
 * - Need to support multiple product types
 * 
 * Benefits:
 * - Encapsulates object creation
 * - Reduces coupling between classes
 * - Easy to add new product types
 * - Centralizes creation logic
 * - Follows Open/Closed Principle
 * 
 * Drawbacks:
 * - Can become complex with many product types
 * - May introduce unnecessary abstraction
 * - Factory classes can become bloated
 */

// Example 1: Vehicle Factory
class Vehicle {
    constructor(type, brand, model) {
        this.type = type;
        this.brand = brand;
        this.model = model;
    }
    
    start() {
        console.log(`${this.brand} ${this.model} ${this.type} is starting...`);
    }
    
    stop() {
        console.log(`${this.brand} ${this.model} ${this.type} is stopping...`);
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super('Car', brand, model);
        this.wheels = 4;
        this.doors = 4;
    }
    
    drive() {
        console.log(`Driving ${this.brand} ${this.model} on the road`);
    }
}

class Motorcycle extends Vehicle {
    constructor(brand, model) {
        super('Motorcycle', brand, model);
        this.wheels = 2;
        this.hasWindshield = false;
    }
    
    ride() {
        console.log(`Riding ${this.brand} ${this.model} on the road`);
    }
}

class Truck extends Vehicle {
    constructor(brand, model) {
        super('Truck', brand, model);
        this.wheels = 6;
        this.cargoCapacity = 'Heavy';
    }
    
    haul() {
        console.log(`Hauling cargo with ${this.brand} ${this.model}`);
    }
}

class VehicleFactory {
    static createVehicle(type, brand, model) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car(brand, model);
            case 'motorcycle':
                return new Motorcycle(brand, model);
            case 'truck':
                return new Truck(brand, model);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
    
    static getAvailableTypes() {
        return ['car', 'motorcycle', 'truck'];
    }
}

// Example 2: UI Component Factory
class UIComponent {
    constructor(type, props) {
        this.type = type;
        this.props = props;
        this.element = null;
    }
    
    render() {
        throw new Error('render() method must be implemented');
    }
    
    mount(container) {
        if (this.element) {
            container.appendChild(this.element);
        }
    }
}

class Button extends UIComponent {
    constructor(props) {
        super('Button', props);
    }
    
    render() {
        this.element = document.createElement('button');
        this.element.textContent = this.props.text || 'Button';
        this.element.className = this.props.className || 'btn';
        this.element.onclick = this.props.onClick || (() => {});
        return this.element;
    }
}

class Input extends UIComponent {
    constructor(props) {
        super('Input', props);
    }
    
    render() {
        this.element = document.createElement('input');
        this.element.type = this.props.type || 'text';
        this.element.placeholder = this.props.placeholder || '';
        this.element.className = this.props.className || 'input';
        this.element.value = this.props.value || '';
        return this.element;
    }
}

class Card extends UIComponent {
    constructor(props) {
        super('Card', props);
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = this.props.className || 'card';
        
        if (this.props.title) {
            const title = document.createElement('h3');
            title.textContent = this.props.title;
            this.element.appendChild(title);
        }
        
        if (this.props.content) {
            const content = document.createElement('p');
            content.textContent = this.props.content;
            this.element.appendChild(content);
        }
        
        return this.element;
    }
}

class UIComponentFactory {
    static createComponent(type, props) {
        switch (type.toLowerCase()) {
            case 'button':
                return new Button(props);
            case 'input':
                return new Input(props);
            case 'card':
                return new Card(props);
            default:
                throw new Error(`Unknown component type: ${type}`);
        }
    }
    
    static createForm(fields) {
        const form = document.createElement('form');
        
        fields.forEach(field => {
            const component = this.createComponent(field.type, field.props);
            component.render();
            form.appendChild(component.element);
        });
        
        return form;
    }
}

// Example 3: Database Connection Factory
class DatabaseConnection {
    constructor(type, config) {
        this.type = type;
        this.config = config;
        this.connected = false;
    }
    
    connect() {
        console.log(`Connecting to ${this.type} database...`);
        this.connected = true;
    }
    
    disconnect() {
        console.log(`Disconnecting from ${this.type} database...`);
        this.connected = false;
    }
    
    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log(`Executing ${this.type} query: ${sql}`);
        return { rows: [], affectedRows: 0 };
    }
}

class MySQLConnection extends DatabaseConnection {
    constructor(config) {
        super('MySQL', config);
    }
    
    query(sql) {
        super.query(sql);
        console.log('Using MySQL-specific query execution');
        return { rows: [], affectedRows: 0 };
    }
}

class PostgreSQLConnection extends DatabaseConnection {
    constructor(config) {
        super('PostgreSQL', config);
    }
    
    query(sql) {
        super.query(sql);
        console.log('Using PostgreSQL-specific query execution');
        return { rows: [], affectedRows: 0 };
    }
}

class MongoDBConnection extends DatabaseConnection {
    constructor(config) {
        super('MongoDB', config);
    }
    
    query(sql) {
        super.query(sql);
        console.log('Using MongoDB-specific query execution');
        return { rows: [], affectedRows: 0 };
    }
}

class DatabaseFactory {
    static createConnection(type, config) {
        switch (type.toLowerCase()) {
            case 'mysql':
                return new MySQLConnection(config);
            case 'postgresql':
            case 'postgres':
                return new PostgreSQLConnection(config);
            case 'mongodb':
                return new MongoDBConnection(config);
            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }
    
    static getSupportedTypes() {
        return ['mysql', 'postgresql', 'mongodb'];
    }
}

// Example 4: Abstract Factory Pattern
class AbstractFactory {
    createProductA() {
        throw new Error('createProductA() must be implemented');
    }
    
    createProductB() {
        throw new Error('createProductB() must be implemented');
    }
}

class ConcreteFactory1 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA1();
    }
    
    createProductB() {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA2();
    }
    
    createProductB() {
        return new ConcreteProductB2();
    }
}

class AbstractProductA {
    operationA() {
        throw new Error('operationA() must be implemented');
    }
}

class AbstractProductB {
    operationB() {
        throw new Error('operationB() must be implemented');
    }
}

class ConcreteProductA1 extends AbstractProductA {
    operationA() {
        return 'ConcreteProductA1 operation';
    }
}

class ConcreteProductA2 extends AbstractProductA {
    operationA() {
        return 'ConcreteProductA2 operation';
    }
}

class ConcreteProductB1 extends AbstractProductB {
    operationB() {
        return 'ConcreteProductB1 operation';
    }
}

class ConcreteProductB2 extends AbstractProductB {
    operationB() {
        return 'ConcreteProductB2 operation';
    }
}

// Usage Examples
console.log('=== FACTORY PATTERN EXAMPLES ===\n');

// Vehicle Factory Example
console.log('1. Vehicle Factory:');
const car = VehicleFactory.createVehicle('car', 'Toyota', 'Camry');
const motorcycle = VehicleFactory.createVehicle('motorcycle', 'Honda', 'CBR600');
const truck = VehicleFactory.createVehicle('truck', 'Ford', 'F-150');

car.start();
car.drive();
motorcycle.start();
motorcycle.ride();
truck.start();
truck.haul();

console.log('Available vehicle types:', VehicleFactory.getAvailableTypes());

// UI Component Factory Example
console.log('\n2. UI Component Factory:');
const button = UIComponentFactory.createComponent('button', {
    text: 'Click Me',
    className: 'btn-primary',
    onClick: () => console.log('Button clicked!')
});

const input = UIComponentFactory.createComponent('input', {
    type: 'email',
    placeholder: 'Enter your email',
    className: 'form-input'
});

const card = UIComponentFactory.createComponent('card', {
    title: 'Sample Card',
    content: 'This is a sample card content',
    className: 'card-style'
});

console.log('Created components:', button.type, input.type, card.type);

// Database Factory Example
console.log('\n3. Database Factory:');
const mysqlConn = DatabaseFactory.createConnection('mysql', {
    host: 'localhost',
    port: 3306,
    database: 'mydb'
});

const postgresConn = DatabaseFactory.createConnection('postgresql', {
    host: 'localhost',
    port: 5432,
    database: 'mydb'
});

mysqlConn.connect();
mysqlConn.query('SELECT * FROM users');
postgresConn.connect();
postgresConn.query('SELECT * FROM products');

console.log('Supported database types:', DatabaseFactory.getSupportedTypes());

// Abstract Factory Example
console.log('\n4. Abstract Factory:');
const factory1 = new ConcreteFactory1();
const factory2 = new ConcreteFactory2();

const productA1 = factory1.createProductA();
const productB1 = factory1.createProductB();
const productA2 = factory2.createProductA();
const productB2 = factory2.createProductB();

console.log(productA1.operationA());
console.log(productB1.operationB());
console.log(productA2.operationA());
console.log(productB2.operationB());

module.exports = {
    VehicleFactory,
    UIComponentFactory,
    DatabaseFactory,
    AbstractFactory,
    ConcreteFactory1,
    ConcreteFactory2
};

