/**
 * OBSERVER PATTERN
 * 
 * Purpose: Defines a one-to-many dependency between objects so that when one object
 * changes state, all its dependents are notified and updated automatically.
 * 
 * When to use:
 * - Event handling systems
 * - Model-View architectures
 * - Notification systems
 * - Real-time data updates
 * - Decoupling publishers from subscribers
 * - Implementing event-driven architecture
 * 
 * Benefits:
 * - Loose coupling between objects
 * - Dynamic relationships
 * - Broadcast communication
 * - Easy to add/remove observers
 * - Supports one-to-many notifications
 * 
 * Drawbacks:
 * - Can cause memory leaks if not properly managed
 * - Unexpected updates can occur
 * - Debugging can be difficult
 * - Performance issues with many observers
 */

// Example 1: News Agency and Subscribers
class NewsAgency {
    constructor() {
        this.subscribers = [];
        this.news = [];
    }
    
    subscribe(subscriber) {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
            console.log(`${subscriber.name} subscribed to news updates`);
        }
    }
    
    unsubscribe(subscriber) {
        const index = this.subscribers.indexOf(subscriber);
        if (index > -1) {
            this.subscribers.splice(index, 1);
            console.log(`${subscriber.name} unsubscribed from news updates`);
        }
    }
    
    notify(newsItem) {
        console.log(`\n📢 Broadcasting news: "${newsItem.title}"`);
        this.subscribers.forEach(subscriber => {
            subscriber.update(newsItem);
        });
    }
    
    publishNews(newsItem) {
        this.news.push(newsItem);
        this.notify(newsItem);
    }
    
    getSubscribers() {
        return this.subscribers.map(sub => sub.name);
    }
}

class NewsSubscriber {
    constructor(name, interests = []) {
        this.name = name;
        this.interests = interests;
        this.receivedNews = [];
    }
    
    update(newsItem) {
        if (this.interests.length === 0 || this.interests.some(interest => 
            newsItem.category.toLowerCase().includes(interest.toLowerCase())
        )) {
            this.receivedNews.push(newsItem);
            console.log(`📰 ${this.name} received: "${newsItem.title}"`);
        } else {
            console.log(`🚫 ${this.name} ignored: "${newsItem.title}" (not interested in ${newsItem.category})`);
        }
    }
    
    getReceivedNews() {
        return this.receivedNews;
    }
}

// Example 2: Stock Market Observer
class StockMarket {
    constructor() {
        this.observers = [];
        this.stocks = new Map();
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    updateStock(symbol, price) {
        const previousPrice = this.stocks.get(symbol);
        this.stocks.set(symbol, price);
        
        const change = previousPrice ? price - previousPrice : 0;
        const changePercent = previousPrice ? (change / previousPrice) * 100 : 0;
        
        const stockData = {
            symbol,
            price,
            change,
            changePercent,
            timestamp: new Date()
        };
        
        this.notifyObservers(stockData);
    }
    
    notifyObservers(stockData) {
        this.observers.forEach(observer => {
            observer.update(stockData);
        });
    }
}

class StockTrader {
    constructor(name, watchlist = []) {
        this.name = name;
        this.watchlist = watchlist;
        this.alerts = [];
    }
    
    update(stockData) {
        if (this.watchlist.includes(stockData.symbol)) {
            const alert = {
                symbol: stockData.symbol,
                price: stockData.price,
                change: stockData.change,
                changePercent: stockData.changePercent,
                timestamp: stockData.timestamp
            };
            
            this.alerts.push(alert);
            
            if (Math.abs(stockData.changePercent) > 5) {
                console.log(`🚨 ${this.name}: ${stockData.symbol} moved ${stockData.changePercent.toFixed(2)}%!`);
            } else {
                console.log(`📊 ${this.name}: ${stockData.symbol} = $${stockData.price} (${stockData.changePercent.toFixed(2)}%)`);
            }
        }
    }
    
    getAlerts() {
        return this.alerts;
    }
}

// Example 3: Event Emitter (Node.js style)
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }
    
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...args);
            });
        }
    }
    
    once(eventName, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
    }
    
    listenerCount(eventName) {
        return this.events[eventName] ? this.events[eventName].length : 0;
    }
}

// Example 4: Model-View Observer
class Model {
    constructor() {
        this.observers = [];
        this.data = {};
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    setData(key, value) {
        const oldValue = this.data[key];
        this.data[key] = value;
        this.notifyObservers(key, value, oldValue);
    }
    
    getData(key) {
        return this.data[key];
    }
    
    notifyObservers(key, newValue, oldValue) {
        this.observers.forEach(observer => {
            observer.update(key, newValue, oldValue);
        });
    }
}

class View {
    constructor(name) {
        this.name = name;
        this.displayedData = {};
    }
    
    update(key, newValue, oldValue) {
        this.displayedData[key] = newValue;
        console.log(`🖥️ ${this.name} updated: ${key} = ${newValue} (was: ${oldValue})`);
    }
    
    render() {
        console.log(`📱 ${this.name} display:`, this.displayedData);
    }
}

// Example 5: Modern ES6+ Observer with Proxy
class ModernObserver {
    constructor() {
        this.observers = new Set();
        this.data = {};
    }
    
    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }
    
    notify(data) {
        this.observers.forEach(callback => callback(data));
    }
    
    setData(key, value) {
        const oldValue = this.data[key];
        this.data[key] = value;
        this.notify({ key, value, oldValue, timestamp: new Date() });
    }
}

// Usage Examples
console.log('=== OBSERVER PATTERN EXAMPLES ===\n');

// News Agency Example
console.log('1. News Agency Observer:');
const newsAgency = new NewsAgency();
const subscriber1 = new NewsSubscriber('Alice', ['technology', 'science']);
const subscriber2 = new NewsSubscriber('Bob', ['sports', 'politics']);
const subscriber3 = new NewsSubscriber('Charlie'); // No specific interests

newsAgency.subscribe(subscriber1);
newsAgency.subscribe(subscriber2);
newsAgency.subscribe(subscriber3);

newsAgency.publishNews({
    title: 'New AI breakthrough in machine learning',
    category: 'Technology',
    content: 'Scientists have made significant progress...'
});

newsAgency.publishNews({
    title: 'World Cup final results',
    category: 'Sports',
    content: 'The championship game ended with...'
});

newsAgency.publishNews({
    title: 'Weather forecast for tomorrow',
    category: 'Weather',
    content: 'Sunny skies expected...'
});

// Stock Market Example
console.log('\n2. Stock Market Observer:');
const stockMarket = new StockMarket();
const trader1 = new StockTrader('John', ['AAPL', 'GOOGL']);
const trader2 = new StockTrader('Sarah', ['AAPL', 'MSFT']);

stockMarket.addObserver(trader1);
stockMarket.addObserver(trader2);

stockMarket.updateStock('AAPL', 150.00);
stockMarket.updateStock('GOOGL', 2800.00);
stockMarket.updateStock('AAPL', 157.50); // 5% increase
stockMarket.updateStock('MSFT', 300.00);

// Event Emitter Example
console.log('\n3. Event Emitter:');
const emitter = new EventEmitter();

const userLoginHandler = (user) => {
    console.log(`👤 User ${user.name} logged in`);
};

const userLogoutHandler = (user) => {
    console.log(`👋 User ${user.name} logged out`);
};

emitter.on('user:login', userLoginHandler);
emitter.on('user:logout', userLogoutHandler);
emitter.on('user:login', (user) => {
    console.log(`📧 Sending welcome email to ${user.email}`);
});

emitter.emit('user:login', { name: 'Alice', email: 'alice@example.com' });
emitter.emit('user:logout', { name: 'Alice', email: 'alice@example.com' });

console.log('Login event listeners:', emitter.listenerCount('user:login'));

// Model-View Example
console.log('\n4. Model-View Observer:');
const model = new Model();
const view1 = new View('Dashboard');
const view2 = new View('Mobile App');

model.addObserver(view1);
model.addObserver(view2);

model.setData('userCount', 100);
model.setData('revenue', 50000);
model.setData('userCount', 150);

view1.render();
view2.render();

// Modern Observer Example
console.log('\n5. Modern ES6+ Observer:');
const modernObserver = new ModernObserver();

const unsubscribe1 = modernObserver.subscribe((data) => {
    console.log(`🔄 Observer 1: ${data.key} changed from ${data.oldValue} to ${data.value}`);
});

const unsubscribe2 = modernObserver.subscribe((data) => {
    console.log(`🔄 Observer 2: ${data.key} = ${data.value} at ${data.timestamp.toISOString()}`);
});

modernObserver.setData('temperature', 25);
modernObserver.setData('humidity', 60);

unsubscribe1(); // Remove first observer
modernObserver.setData('pressure', 1013);

module.exports = {
    NewsAgency,
    NewsSubscriber,
    StockMarket,
    StockTrader,
    EventEmitter,
    Model,
    View,
    ModernObserver
};

