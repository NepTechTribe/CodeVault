/**
 * CHAIN OF RESPONSIBILITY PATTERN
 * 
 * Purpose: Passes requests along a chain of handlers. Upon receiving a request,
 * each handler decides either to process the request or to pass it to the next handler.
 * 
 * When to use:
 * - Multiple objects can handle a request
 * - Don't know which handler should process the request
 * - Want to decouple sender and receiver
 * - Middleware in web frameworks
 * - Event handling systems
 * - Validation chains
 * - Authentication/authorization pipelines
 * - Error handling chains
 * 
 * Benefits:
 * - Decouples sender and receiver
 * - Adds/removes handlers dynamically
 * - Follows Single Responsibility Principle
 * - Flexible request handling
 * - Easy to add new handlers
 * 
 * Drawbacks:
 * - No guarantee request will be handled
 * - Can be hard to debug
 * - Performance overhead
 * - Chain can become complex
 */

// Example 1: Request Processing Chain
class Request {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.processedBy = [];
        this.response = null;
    }
    
    addProcessor(processor) {
        this.processedBy.push(processor);
    }
    
    setResponse(response) {
        this.response = response;
    }
}

class RequestHandler {
    constructor() {
        this.nextHandler = null;
    }
    
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(request) {
        if (this.canHandle(request)) {
            this.process(request);
        } else if (this.nextHandler) {
            this.nextHandler.handle(request);
        } else {
            console.log(`❌ No handler found for request type: ${request.type}`);
        }
    }
    
    canHandle(request) {
        throw new Error('canHandle() method must be implemented');
    }
    
    process(request) {
        throw new Error('process() method must be implemented');
    }
}

class AuthenticationHandler extends RequestHandler {
    canHandle(request) {
        return request.type === 'API_REQUEST' || request.type === 'USER_ACTION';
    }
    
    process(request) {
        console.log('🔐 [AUTH] Authenticating request...');
        
        // Simulate authentication check
        const isValidToken = request.data.token && request.data.token.length > 10;
        
        if (isValidToken) {
            console.log('✅ [AUTH] Authentication successful');
            request.addProcessor('AuthenticationHandler');
            
            if (this.nextHandler) {
                this.nextHandler.handle(request);
            }
        } else {
            console.log('❌ [AUTH] Authentication failed');
            request.setResponse({ error: 'Invalid authentication token', status: 401 });
        }
    }
}

class AuthorizationHandler extends RequestHandler {
    constructor(allowedRoles = ['user', 'admin']) {
        super();
        this.allowedRoles = allowedRoles;
    }
    
    canHandle(request) {
        return request.type === 'API_REQUEST' || request.type === 'USER_ACTION';
    }
    
    process(request) {
        console.log('🛡️ [AUTHZ] Checking authorization...');
        
        // Simulate role check
        const userRole = request.data.role || 'guest';
        const hasPermission = this.allowedRoles.includes(userRole);
        
        if (hasPermission) {
            console.log(`✅ [AUTHZ] Authorization successful for role: ${userRole}`);
            request.addProcessor('AuthorizationHandler');
            
            if (this.nextHandler) {
                this.nextHandler.handle(request);
            }
        } else {
            console.log(`❌ [AUTHZ] Authorization failed for role: ${userRole}`);
            request.setResponse({ error: 'Insufficient permissions', status: 403 });
        }
    }
}

class ValidationHandler extends RequestHandler {
    canHandle(request) {
        return request.type === 'API_REQUEST';
    }
    
    process(request) {
        console.log('✅ [VALIDATION] Validating request data...');
        
        // Simulate validation
        const isValid = request.data && Object.keys(request.data).length > 0;
        
        if (isValid) {
            console.log('✅ [VALIDATION] Request data is valid');
            request.addProcessor('ValidationHandler');
            
            if (this.nextHandler) {
                this.nextHandler.handle(request);
            }
        } else {
            console.log('❌ [VALIDATION] Request data is invalid');
            request.setResponse({ error: 'Invalid request data', status: 400 });
        }
    }
}

class RateLimitHandler extends RequestHandler {
    constructor(maxRequests = 100, windowMs = 60000) {
        super();
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = new Map();
    }
    
    canHandle(request) {
        return request.type === 'API_REQUEST';
    }
    
    process(request) {
        console.log('⏱️ [RATE_LIMIT] Checking rate limit...');
        
        const clientId = request.data.clientId || 'default';
        const now = Date.now();
        
        if (!this.requests.has(clientId)) {
            this.requests.set(clientId, []);
        }
        
        const clientRequests = this.requests.get(clientId);
        
        // Remove old requests outside the window
        const validRequests = clientRequests.filter(time => now - time < this.windowMs);
        this.requests.set(clientId, validRequests);
        
        if (validRequests.length < this.maxRequests) {
            validRequests.push(now);
            console.log(`✅ [RATE_LIMIT] Request allowed (${validRequests.length}/${this.maxRequests})`);
            request.addProcessor('RateLimitHandler');
            
            if (this.nextHandler) {
                this.nextHandler.handle(request);
            }
        } else {
            console.log(`❌ [RATE_LIMIT] Rate limit exceeded (${validRequests.length}/${this.maxRequests})`);
            request.setResponse({ error: 'Rate limit exceeded', status: 429 });
        }
    }
}

class BusinessLogicHandler extends RequestHandler {
    canHandle(request) {
        return request.type === 'API_REQUEST';
    }
    
    process(request) {
        console.log('💼 [BUSINESS] Processing business logic...');
        
        // Simulate business logic processing
        const result = {
            message: 'Request processed successfully',
            data: request.data,
            timestamp: new Date(),
            processors: request.processedBy
        };
        
        console.log('✅ [BUSINESS] Business logic completed');
        request.addProcessor('BusinessLogicHandler');
        request.setResponse({ success: true, result });
    }
}

// Example 2: Middleware Chain (Express.js style)
class Middleware {
    constructor() {
        this.middlewares = [];
    }
    
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    
    async execute(req, res, next) {
        let index = 0;
        
        const runNext = async () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index++];
                await middleware(req, res, runNext);
            } else if (next) {
                await next();
            }
        };
        
        await runNext();
    }
}

// Example middleware functions
const loggerMiddleware = (req, res, next) => {
    console.log(`📝 [MIDDLEWARE] ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
};

const corsMiddleware = (req, res, next) => {
    console.log('🌐 [MIDDLEWARE] Adding CORS headers');
    res.headers = { ...res.headers, 'Access-Control-Allow-Origin': '*' };
    next();
};

const bodyParserMiddleware = (req, res, next) => {
    console.log('📦 [MIDDLEWARE] Parsing request body');
    req.body = req.body || {};
    next();
};

const errorHandlerMiddleware = (req, res, next) => {
    console.log('🚨 [MIDDLEWARE] Error handler ready');
    next();
};

// Example 3: Validation Chain
class ValidationRule {
    constructor() {
        this.nextRule = null;
    }
    
    setNext(rule) {
        this.nextRule = rule;
        return rule;
    }
    
    validate(data) {
        if (this.canValidate(data)) {
            const result = this.doValidate(data);
            if (!result.isValid) {
                return result;
            }
        }
        
        if (this.nextRule) {
            return this.nextRule.validate(data);
        }
        
        return { isValid: true, errors: [] };
    }
    
    canValidate(data) {
        return true;
    }
    
    doValidate(data) {
        throw new Error('doValidate() method must be implemented');
    }
}

class RequiredFieldRule extends ValidationRule {
    constructor(fieldName) {
        super();
        this.fieldName = fieldName;
    }
    
    doValidate(data) {
        if (!data[this.fieldName]) {
            return {
                isValid: false,
                errors: [`${this.fieldName} is required`]
            };
        }
        return { isValid: true, errors: [] };
    }
}

class EmailFormatRule extends ValidationRule {
    doValidate(data) {
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            return {
                isValid: false,
                errors: ['Invalid email format']
            };
        }
        return { isValid: true, errors: [] };
    }
}

class PasswordStrengthRule extends ValidationRule {
    doValidate(data) {
        if (data.password) {
            const errors = [];
            
            if (data.password.length < 8) {
                errors.push('Password must be at least 8 characters long');
            }
            
            if (!/[A-Z]/.test(data.password)) {
                errors.push('Password must contain at least one uppercase letter');
            }
            
            if (!/[a-z]/.test(data.password)) {
                errors.push('Password must contain at least one lowercase letter');
            }
            
            if (!/\d/.test(data.password)) {
                errors.push('Password must contain at least one number');
            }
            
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
        }
        return { isValid: true, errors: [] };
    }
}

class AgeValidationRule extends ValidationRule {
    doValidate(data) {
        if (data.age && (data.age < 18 || data.age > 120)) {
            return {
                isValid: false,
                errors: ['Age must be between 18 and 120']
            };
        }
        return { isValid: true, errors: [] };
    }
}

// Example 4: Error Handling Chain
class ErrorHandler {
    constructor() {
        this.nextHandler = null;
    }
    
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(error, request) {
        if (this.canHandle(error)) {
            return this.process(error, request);
        } else if (this.nextHandler) {
            return this.nextHandler.handle(error, request);
        } else {
            console.log('❌ No error handler found for:', error.message);
            return { error: 'Internal server error', status: 500 };
        }
    }
    
    canHandle(error) {
        throw new Error('canHandle() method must be implemented');
    }
    
    process(error, request) {
        throw new Error('process() method must be implemented');
    }
}

class ValidationErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error.name === 'ValidationError';
    }
    
    process(error, request) {
        console.log('✅ [ERROR_HANDLER] Handling validation error');
        return { error: error.message, status: 400 };
    }
}

class AuthenticationErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error.name === 'AuthenticationError';
    }
    
    process(error, request) {
        console.log('✅ [ERROR_HANDLER] Handling authentication error');
        return { error: 'Authentication failed', status: 401 };
    }
}

class DatabaseErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error.name === 'DatabaseError';
    }
    
    process(error, request) {
        console.log('✅ [ERROR_HANDLER] Handling database error');
        return { error: 'Database operation failed', status: 500 };
    }
}

class DefaultErrorHandler extends ErrorHandler {
    canHandle(error) {
        return true; // Always handles as fallback
    }
    
    process(error, request) {
        console.log('✅ [ERROR_HANDLER] Handling default error');
        return { error: 'An unexpected error occurred', status: 500 };
    }
}

// Usage Examples
console.log('=== CHAIN OF RESPONSIBILITY PATTERN EXAMPLES ===\n');

// Request Processing Chain Example
console.log('1. Request Processing Chain:');
const authHandler = new AuthenticationHandler();
const authzHandler = new AuthorizationHandler(['user', 'admin']);
const validationHandler = new ValidationHandler();
const rateLimitHandler = new RateLimitHandler(5, 60000);
const businessHandler = new BusinessLogicHandler();

// Build the chain
authHandler
    .setNext(authzHandler)
    .setNext(validationHandler)
    .setNext(rateLimitHandler)
    .setNext(businessHandler);

// Test requests
const apiRequest = new Request('API_REQUEST', {
    token: 'valid_token_12345',
    role: 'user',
    clientId: 'client_001',
    data: { userId: 123, action: 'get_profile' }
});

console.log('\nProcessing API request:');
authHandler.handle(apiRequest);
console.log('Response:', apiRequest.response);

// Middleware Chain Example
console.log('\n2. Middleware Chain:');
const middleware = new Middleware();

middleware
    .use(loggerMiddleware)
    .use(corsMiddleware)
    .use(bodyParserMiddleware)
    .use(errorHandlerMiddleware);

const req = { method: 'POST', path: '/api/users', body: { name: 'John' } };
const res = { headers: {} };

console.log('\nExecuting middleware chain:');
middleware.execute(req, res, () => {
    console.log('✅ [MIDDLEWARE] All middleware completed');
});

// Validation Chain Example
console.log('\n3. Validation Chain:');
const requiredNameRule = new RequiredFieldRule('name');
const requiredEmailRule = new RequiredFieldRule('email');
const emailFormatRule = new EmailFormatRule();
const passwordStrengthRule = new PasswordStrengthRule();
const ageValidationRule = new AgeValidationRule();

// Build validation chain
requiredNameRule
    .setNext(requiredEmailRule)
    .setNext(emailFormatRule)
    .setNext(passwordStrengthRule)
    .setNext(ageValidationRule);

const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'StrongPass123',
    age: 25
};

console.log('\nValidating user data:');
const validationResult = requiredNameRule.validate(userData);
console.log('Validation result:', validationResult);

// Error Handling Chain Example
console.log('\n4. Error Handling Chain:');
const validationErrorHandler = new ValidationErrorHandler();
const authErrorHandler = new AuthenticationErrorHandler();
const dbErrorHandler = new DatabaseErrorHandler();
const defaultErrorHandler = new DefaultErrorHandler();

// Build error handling chain
validationErrorHandler
    .setNext(authErrorHandler)
    .setNext(dbErrorHandler)
    .setNext(defaultErrorHandler);

// Test different error types
const errors = [
    new Error('Validation failed'),
    new Error('Authentication failed'),
    new Error('Database connection failed'),
    new Error('Unknown error')
];

errors.forEach((error, index) => {
    error.name = ['ValidationError', 'AuthenticationError', 'DatabaseError', 'UnknownError'][index];
    console.log(`\nHandling ${error.name}:`);
    const result = validationErrorHandler.handle(error, {});
    console.log('Error response:', result);
});

module.exports = {
    Request,
    RequestHandler,
    AuthenticationHandler,
    AuthorizationHandler,
    ValidationHandler,
    RateLimitHandler,
    BusinessLogicHandler,
    Middleware,
    ValidationRule,
    RequiredFieldRule,
    EmailFormatRule,
    PasswordStrengthRule,
    AgeValidationRule,
    ErrorHandler,
    ValidationErrorHandler,
    AuthenticationErrorHandler,
    DatabaseErrorHandler,
    DefaultErrorHandler
};

