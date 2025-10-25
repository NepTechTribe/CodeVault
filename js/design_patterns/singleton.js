/**
 * SINGLETON PATTERN
 * 
 * Purpose: Ensures a class has only one instance and provides global access to it.
 * 
 * When to use:
 * - Database connections
 * - Logger instances
 * - Configuration managers
 * - Cache managers
 * - Thread pools
 * 
 * Benefits:
 * - Controlled access to single instance
 * - Lazy initialization
 * - Global access point
 * - Memory efficiency
 * 
 * Drawbacks:
 * - Global state can be problematic
 * - Hard to test
 * - Violates Single Responsibility Principle
 * - Can become a bottleneck
 */

// Example 1: Database Connection Singleton
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.connectionString = 'mongodb://localhost:27017/mydb';
        this.isConnected = false;
        DatabaseConnection.instance = this;
    }
    
    connect() {
        if (!this.isConnected) {
            console.log(`Connecting to database: ${this.connectionString}`);
            this.isConnected = true;
            return true;
        }
        console.log('Already connected to database');
        return false;
    }
    
    disconnect() {
        if (this.isConnected) {
            console.log('Disconnecting from database');
            this.isConnected = false;
            return true;
        }
        console.log('Not connected to database');
        return false;
    }
    
    query(sql) {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }
        console.log(`Executing query: ${sql}`);
        return { rows: [], affectedRows: 0 };
    }
}

// Example 2: Logger Singleton
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        
        this.logs = [];
        this.logLevel = 'INFO';
        Logger.instance = this;
    }
    
    setLogLevel(level) {
        this.logLevel = level;
    }
    
    log(level, message) {
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, level, message };
        this.logs.push(logEntry);
        
        if (this.shouldLog(level)) {
            console.log(`[${timestamp}] ${level}: ${message}`);
        }
    }
    
    shouldLog(level) {
        const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
        return levels[level] >= levels[this.logLevel];
    }
    
    getLogs() {
        return [...this.logs];
    }
    
    clearLogs() {
        this.logs = [];
    }
}

// Example 3: Configuration Manager Singleton
class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }
        
        this.config = {
            apiUrl: 'https://api.example.com',
            timeout: 5000,
            retries: 3,
            debug: false
        };
        ConfigManager.instance = this;
    }
    
    get(key) {
        return this.config[key];
    }
    
    set(key, value) {
        this.config[key] = value;
        console.log(`Configuration updated: ${key} = ${value}`);
    }
    
    getAll() {
        return { ...this.config };
    }
    
    loadFromFile(configData) {
        this.config = { ...this.config, ...configData };
        console.log('Configuration loaded from file');
    }
}

// Example 4: Cache Manager Singleton
class CacheManager {
    constructor() {
        if (CacheManager.instance) {
            return CacheManager.instance;
        }
        
        this.cache = new Map();
        this.maxSize = 100;
        this.ttl = 300000; // 5 minutes in milliseconds
        CacheManager.instance = this;
    }
    
    set(key, value, customTTL = null) {
        const expiry = Date.now() + (customTTL || this.ttl);
        this.cache.set(key, { value, expiry });
        
        if (this.cache.size > this.maxSize) {
            this.evictOldest();
        }
        
        console.log(`Cached: ${key}`);
    }
    
    get(key) {
        const item = this.cache.get(key);
        
        if (!item) {
            console.log(`Cache miss: ${key}`);
            return null;
        }
        
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            console.log(`Cache expired: ${key}`);
            return null;
        }
        
        console.log(`Cache hit: ${key}`);
        return item.value;
    }
    
    evictOldest() {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
        console.log(`Evicted oldest cache entry: ${oldestKey}`);
    }
    
    clear() {
        this.cache.clear();
        console.log('Cache cleared');
    }
    
    size() {
        return this.cache.size;
    }
}

// Usage Examples
console.log('=== SINGLETON PATTERN EXAMPLES ===\n');

// Database Connection Example
console.log('1. Database Connection Singleton:');
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log('db1 === db2:', db1 === db2); // true - same instance

db1.connect();
db2.connect(); // Won't create new connection
db1.query('SELECT * FROM users');

// Logger Example
console.log('\n2. Logger Singleton:');
const logger1 = new Logger();
const logger2 = new Logger();
console.log('logger1 === logger2:', logger1 === logger2); // true

logger1.setLogLevel('DEBUG');
logger2.log('DEBUG', 'Debug message');
logger2.log('INFO', 'Info message');
logger2.log('ERROR', 'Error message');

// Config Manager Example
console.log('\n3. Configuration Manager Singleton:');
const config1 = new ConfigManager();
const config2 = new ConfigManager();
console.log('config1 === config2:', config1 === config2); // true

config1.set('apiUrl', 'https://new-api.example.com');
console.log('API URL from config2:', config2.get('apiUrl'));

// Cache Manager Example
console.log('\n4. Cache Manager Singleton:');
const cache1 = new CacheManager();
const cache2 = new CacheManager();
console.log('cache1 === cache2:', cache1 === cache2); // true

cache1.set('user:123', { name: 'John Doe', email: 'john@example.com' });
console.log('Cached user:', cache2.get('user:123'));

// Modern ES6+ Singleton with Module Pattern
console.log('\n5. Modern ES6+ Singleton:');
class ModernSingleton {
    static #instance = null;
    
    constructor() {
        if (ModernSingleton.#instance) {
            return ModernSingleton.#instance;
        }
        
        this.data = [];
        ModernSingleton.#instance = this;
    }
    
    static getInstance() {
        if (!ModernSingleton.#instance) {
            ModernSingleton.#instance = new ModernSingleton();
        }
        return ModernSingleton.#instance;
    }
    
    addData(item) {
        this.data.push(item);
    }
    
    getData() {
        return [...this.data];
    }
}

const modern1 = ModernSingleton.getInstance();
const modern2 = ModernSingleton.getInstance();
console.log('modern1 === modern2:', modern1 === modern2); // true

modern1.addData('test');
console.log('Data from modern2:', modern2.getData());

module.exports = {
    DatabaseConnection,
    Logger,
    ConfigManager,
    CacheManager,
    ModernSingleton
};

