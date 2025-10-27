/**
 * DECORATOR PATTERN
 * 
 * Purpose: Attaches additional responsibilities to an object dynamically.
 * Decorators provide a flexible alternative to subclassing for extending functionality.
 * 
 * When to use:
 * - Add features to objects without modifying their class
 * - Need to add responsibilities dynamically
 * - Want to avoid subclass explosion
 * - Logging, caching, validation
 * - Middleware in web frameworks
 * - Wrapping API calls
 * - Adding security layers
 * 
 * Benefits:
 * - More flexible than inheritance
 * - Can add/remove responsibilities at runtime
 * - Follows Single Responsibility Principle
 * - Allows mixing and matching features
 * - No need to modify existing code
 * 
 * Drawbacks:
 * - Can create many small objects
 * - Hard to debug decorated objects
 * - Order of decorators can matter
 * - Can become complex with many decorators
 */

// Example 1: Coffee Shop Decorators
class Coffee {
    constructor() {
        this.description = 'Simple Coffee';
        this.cost = 2.00;
    }
    
    getDescription() {
        return this.description;
    }
    
    getCost() {
        return this.cost;
    }
}

class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    getDescription() {
        return this.coffee.getDescription();
    }
    
    getCost() {
        return this.coffee.getCost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', Milk';
    }
    
    getCost() {
        return this.coffee.getCost() + 0.50;
    }
}

class SugarDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', Sugar';
    }
    
    getCost() {
        return this.coffee.getCost() + 0.25;
    }
}

class VanillaDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', Vanilla';
    }
    
    getCost() {
        return this.coffee.getCost() + 0.75;
    }
}

class WhippedCreamDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    
    getDescription() {
        return this.coffee.getDescription() + ', Whipped Cream';
    }
    
    getCost() {
        return this.coffee.getCost() + 1.00;
    }
}

// Example 2: HTTP Request Decorators
class HTTPRequest {
    constructor(url, method = 'GET', headers = {}) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = null;
    }
    
    async execute() {
        console.log(`🌐 Making ${this.method} request to ${this.url}`);
        console.log('Headers:', this.headers);
        
        // Simulate HTTP request
        const response = {
            status: 200,
            data: { message: 'Success', timestamp: new Date() },
            headers: { 'content-type': 'application/json' }
        };
        
        return response;
    }
}

class RequestDecorator {
    constructor(request) {
        this.request = request;
    }
    
    async execute() {
        return await this.request.execute();
    }
}

class LoggingDecorator extends RequestDecorator {
    async execute() {
        console.log(`📝 [LOG] Starting request to ${this.request.url}`);
        const startTime = Date.now();
        
        try {
            const response = await this.request.execute();
            const duration = Date.now() - startTime;
            console.log(`📝 [LOG] Request completed in ${duration}ms with status ${response.status}`);
            return response;
        } catch (error) {
            console.log(`📝 [LOG] Request failed: ${error.message}`);
            throw error;
        }
    }
}

class CachingDecorator extends RequestDecorator {
    constructor(request, cache = new Map()) {
        super(request);
        this.cache = cache;
        this.cacheTimeout = 300000; // 5 minutes
    }
    
    async execute() {
        const cacheKey = `${this.request.method}:${this.request.url}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            console.log(`💾 [CACHE] Returning cached response for ${this.request.url}`);
            return cached.data;
        }
        
        const response = await this.request.execute();
        this.cache.set(cacheKey, {
            data: response,
            timestamp: Date.now()
        });
        
        console.log(`💾 [CACHE] Cached response for ${this.request.url}`);
        return response;
    }
}

class RetryDecorator extends RequestDecorator {
    constructor(request, maxRetries = 3, delay = 1000) {
        super(request);
        this.maxRetries = maxRetries;
        this.delay = delay;
    }
    
    async execute() {
        let lastError;
        
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                console.log(`🔄 [RETRY] Attempt ${attempt}/${this.maxRetries} for ${this.request.url}`);
                const response = await this.request.execute();
                console.log(`🔄 [RETRY] Success on attempt ${attempt}`);
                return response;
            } catch (error) {
                lastError = error;
                console.log(`🔄 [RETRY] Attempt ${attempt} failed: ${error.message}`);
                
                if (attempt < this.maxRetries) {
                    console.log(`🔄 [RETRY] Waiting ${this.delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, this.delay));
                }
            }
        }
        
        console.log(`🔄 [RETRY] All ${this.maxRetries} attempts failed`);
        throw lastError;
    }
}

class AuthenticationDecorator extends RequestDecorator {
    constructor(request, token) {
        super(request);
        this.token = token;
    }
    
    async execute() {
        console.log(`🔐 [AUTH] Adding authentication token`);
        this.request.headers['Authorization'] = `Bearer ${this.token}`;
        return await this.request.execute();
    }
}

// Example 3: Function Decorators (Higher-Order Functions)
function timingDecorator(func) {
    return function(...args) {
        const startTime = performance.now();
        const result = func.apply(this, args);
        const endTime = performance.now();
        console.log(`⏱️ Function ${func.name} took ${(endTime - startTime).toFixed(2)}ms`);
        return result;
    };
}

function loggingDecorator(func) {
    return function(...args) {
        console.log(`📝 Calling function ${func.name} with arguments:`, args);
        const result = func.apply(this, args);
        console.log(`📝 Function ${func.name} returned:`, result);
        return result;
    };
}

function cachingDecorator(func) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(`💾 Cache hit for ${func.name}`);
            return cache.get(key);
        }
        
        console.log(`💾 Cache miss for ${func.name}`);
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function retryDecorator(func, maxRetries = 3, delay = 1000) {
    return async function(...args) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔄 Retry attempt ${attempt}/${maxRetries} for ${func.name}`);
                return await func.apply(this, args);
            } catch (error) {
                lastError = error;
                console.log(`🔄 Attempt ${attempt} failed: ${error.message}`);
                
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    };
}

// Example 4: Class Decorators (ES6+)
function classTimingDecorator(target) {
    const originalMethods = {};
    
    // Get all methods from the class
    Object.getOwnPropertyNames(target.prototype).forEach(name => {
        if (name !== 'constructor' && typeof target.prototype[name] === 'function') {
            originalMethods[name] = target.prototype[name];
            
            target.prototype[name] = function(...args) {
                const startTime = performance.now();
                const result = originalMethods[name].apply(this, args);
                const endTime = performance.now();
                console.log(`⏱️ Method ${name} took ${(endTime - startTime).toFixed(2)}ms`);
                return result;
            };
        }
    });
    
    return target;
}

function classLoggingDecorator(target) {
    const originalMethods = {};
    
    Object.getOwnPropertyNames(target.prototype).forEach(name => {
        if (name !== 'constructor' && typeof target.prototype[name] === 'function') {
            originalMethods[name] = target.prototype[name];
            
            target.prototype[name] = function(...args) {
                console.log(`📝 Calling method ${name} with arguments:`, args);
                const result = originalMethods[name].apply(this, args);
                console.log(`📝 Method ${name} returned:`, result);
                return result;
            };
        }
    });
    
    return target;
}

// Example 5: Modern JavaScript Decorators (Stage 3 Proposal)
class Calculator {
    @timingDecorator
    @loggingDecorator
    add(a, b) {
        return a + b;
    }
    
    @timingDecorator
    multiply(a, b) {
        return a * b;
    }
    
    @cachingDecorator
    @timingDecorator
    fibonacci(n) {
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
}

// Usage Examples
console.log('=== DECORATOR PATTERN EXAMPLES ===\n');

// Coffee Shop Example
console.log('1. Coffee Shop Decorators:');
let coffee = new Coffee();
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new VanillaDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new WhippedCreamDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

// HTTP Request Decorators Example
console.log('\n2. HTTP Request Decorators:');
let request = new HTTPRequest('https://api.example.com/users', 'GET');

// Add logging
request = new LoggingDecorator(request);

// Add caching
request = new CachingDecorator(request);

// Add authentication
request = new AuthenticationDecorator(request, 'abc123token');

// Add retry logic
request = new RetryDecorator(request, 3, 1000);

// Execute the decorated request
request.execute().then(response => {
    console.log('Final response:', response);
});

// Function Decorators Example
console.log('\n3. Function Decorators:');
const expensiveCalculation = (n) => {
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.random();
    }
    return result;
};

const decoratedCalculation = timingDecorator(
    loggingDecorator(
        cachingDecorator(expensiveCalculation)
    )
);

decoratedCalculation(100);
decoratedCalculation(100); // Should use cache

// Class Decorators Example
console.log('\n4. Class Decorators:');
@classTimingDecorator
@classLoggingDecorator
class MathOperations {
    add(a, b) {
        return a + b;
    }
    
    multiply(a, b) {
        return a * b;
    }
}

const math = new MathOperations();
math.add(5, 3);
math.multiply(4, 7);

// Modern Calculator Example
console.log('\n5. Modern Calculator with Decorators:');
const calc = new Calculator();
calc.add(10, 20);
calc.multiply(5, 6);
calc.fibonacci(10);
calc.fibonacci(10); // Should use cache

module.exports = {
    Coffee,
    CoffeeDecorator,
    MilkDecorator,
    SugarDecorator,
    VanillaDecorator,
    WhippedCreamDecorator,
    HTTPRequest,
    RequestDecorator,
    LoggingDecorator,
    CachingDecorator,
    RetryDecorator,
    AuthenticationDecorator,
    timingDecorator,
    loggingDecorator,
    cachingDecorator,
    retryDecorator,
    classTimingDecorator,
    classLoggingDecorator,
    Calculator
};

