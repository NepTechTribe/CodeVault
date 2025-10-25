/**
 * STRATEGY PATTERN
 * 
 * Purpose: Defines a family of algorithms, encapsulates each one, and makes them
 * interchangeable. Strategy lets the algorithm vary independently from clients that use it.
 * 
 * When to use:
 * - Multiple ways to perform a task
 * - Need to switch algorithms at runtime
 * - Want to avoid conditional statements
 * - Different variations of an algorithm
 * - Payment processing methods
 * - Sorting algorithms
 * - Compression algorithms
 * - Validation strategies
 * 
 * Benefits:
 * - Algorithms can be switched at runtime
 * - Eliminates conditional statements
 * - Easy to add new strategies
 * - Follows Open/Closed Principle
 * - Promotes code reuse
 * 
 * Drawbacks:
 * - Increased number of classes
 * - Clients must be aware of different strategies
 * - Communication overhead between strategies
 */

// Example 1: Payment Processing Strategies
class PaymentStrategy {
    pay(amount) {
        throw new Error('pay() method must be implemented');
    }
}

class CreditCardPayment extends PaymentStrategy {
    constructor(cardNumber, cvv, expiryDate) {
        super();
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }
    
    pay(amount) {
        console.log(`💳 Processing credit card payment of $${amount}`);
        console.log(`Card: ****${this.cardNumber.slice(-4)}`);
        console.log(`CVV: ${this.cvv}, Expiry: ${this.expiryDate}`);
        
        // Simulate payment processing
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
            console.log('✅ Credit card payment successful');
            return { success: true, transactionId: `CC_${Date.now()}` };
        } else {
            console.log('❌ Credit card payment failed');
            return { success: false, error: 'Payment declined' };
        }
    }
}

class PayPalPayment extends PaymentStrategy {
    constructor(email) {
        super();
        this.email = email;
    }
    
    pay(amount) {
        console.log(`🅿️ Processing PayPal payment of $${amount}`);
        console.log(`Email: ${this.email}`);
        
        // Simulate PayPal API call
        const success = Math.random() > 0.05; // 95% success rate
        if (success) {
            console.log('✅ PayPal payment successful');
            return { success: true, transactionId: `PP_${Date.now()}` };
        } else {
            console.log('❌ PayPal payment failed');
            return { success: false, error: 'PayPal API error' };
        }
    }
}

class BankTransferPayment extends PaymentStrategy {
    constructor(accountNumber, routingNumber) {
        super();
        this.accountNumber = accountNumber;
        this.routingNumber = routingNumber;
    }
    
    pay(amount) {
        console.log(`🏦 Processing bank transfer of $${amount}`);
        console.log(`Account: ****${this.accountNumber.slice(-4)}`);
        console.log(`Routing: ${this.routingNumber}`);
        
        // Simulate bank transfer
        const success = Math.random() > 0.15; // 85% success rate
        if (success) {
            console.log('✅ Bank transfer successful');
            return { success: true, transactionId: `BT_${Date.now()}` };
        } else {
            console.log('❌ Bank transfer failed');
            return { success: false, error: 'Insufficient funds' };
        }
    }
}

class PaymentProcessor {
    constructor() {
        this.strategy = null;
    }
    
    setPaymentStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        if (!this.strategy) {
            throw new Error('No payment strategy set');
        }
        
        console.log(`\n💰 Processing payment of $${amount}`);
        return this.strategy.pay(amount);
    }
}

// Example 2: Sorting Strategies
class SortingStrategy {
    sort(array) {
        throw new Error('sort() method must be implemented');
    }
}

class BubbleSortStrategy extends SortingStrategy {
    sort(array) {
        console.log('🫧 Using Bubble Sort');
        const arr = [...array];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        
        return arr;
    }
}

class QuickSortStrategy extends SortingStrategy {
    sort(array) {
        console.log('⚡ Using Quick Sort');
        const arr = [...array];
        
        if (arr.length <= 1) return arr;
        
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        
        return [...this.sort(left), ...middle, ...this.sort(right)];
    }
}

class MergeSortStrategy extends SortingStrategy {
    sort(array) {
        console.log('🔀 Using Merge Sort');
        const arr = [...array];
        
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = this.sort(arr.slice(0, mid));
        const right = this.sort(arr.slice(mid));
        
        return this.merge(left, right);
    }
    
    merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
}

class Sorter {
    constructor() {
        this.strategy = null;
    }
    
    setSortingStrategy(strategy) {
        this.strategy = strategy;
    }
    
    sort(array) {
        if (!this.strategy) {
            throw new Error('No sorting strategy set');
        }
        
        const startTime = performance.now();
        const sortedArray = this.strategy.sort(array);
        const endTime = performance.now();
        
        console.log(`⏱️ Sorting took ${(endTime - startTime).toFixed(2)}ms`);
        return sortedArray;
    }
}

// Example 3: Compression Strategies
class CompressionStrategy {
    compress(data) {
        throw new Error('compress() method must be implemented');
    }
    
    decompress(data) {
        throw new Error('decompress() method must be implemented');
    }
}

class ZipCompression extends CompressionStrategy {
    compress(data) {
        console.log('📦 Compressing with ZIP algorithm');
        // Simulate ZIP compression
        const compressedSize = Math.floor(data.length * 0.7);
        return {
            data: `ZIP_${data.substring(0, compressedSize)}`,
            originalSize: data.length,
            compressedSize: compressedSize,
            compressionRatio: (compressedSize / data.length * 100).toFixed(1)
        };
    }
    
    decompress(compressedData) {
        console.log('📦 Decompressing ZIP data');
        return compressedData.data.replace('ZIP_', '');
    }
}

class GzipCompression extends CompressionStrategy {
    compress(data) {
        console.log('🗜️ Compressing with GZIP algorithm');
        // Simulate GZIP compression
        const compressedSize = Math.floor(data.length * 0.6);
        return {
            data: `GZIP_${data.substring(0, compressedSize)}`,
            originalSize: data.length,
            compressedSize: compressedSize,
            compressionRatio: (compressedSize / data.length * 100).toFixed(1)
        };
    }
    
    decompress(compressedData) {
        console.log('🗜️ Decompressing GZIP data');
        return compressedData.data.replace('GZIP_', '');
    }
}

class CompressionManager {
    constructor() {
        this.strategy = null;
    }
    
    setCompressionStrategy(strategy) {
        this.strategy = strategy;
    }
    
    compress(data) {
        if (!this.strategy) {
            throw new Error('No compression strategy set');
        }
        
        return this.strategy.compress(data);
    }
    
    decompress(compressedData) {
        if (!this.strategy) {
            throw new Error('No compression strategy set');
        }
        
        return this.strategy.decompress(compressedData);
    }
}

// Example 4: Validation Strategies
class ValidationStrategy {
    validate(data) {
        throw new Error('validate() method must be implemented');
    }
}

class EmailValidation extends ValidationStrategy {
    validate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        console.log(`📧 Validating email: ${email}`);
        console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        
        return {
            isValid,
            errors: isValid ? [] : ['Invalid email format']
        };
    }
}

class PasswordValidation extends ValidationStrategy {
    constructor(minLength = 8, requireSpecial = true) {
        super();
        this.minLength = minLength;
        this.requireSpecial = requireSpecial;
    }
    
    validate(password) {
        console.log(`🔒 Validating password`);
        
        const errors = [];
        
        if (password.length < this.minLength) {
            errors.push(`Password must be at least ${this.minLength} characters long`);
        }
        
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        if (this.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        
        const isValid = errors.length === 0;
        console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        if (!isValid) {
            console.log('Errors:', errors);
        }
        
        return { isValid, errors };
    }
}

class PhoneValidation extends ValidationStrategy {
    validate(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        const isValid = phoneRegex.test(phone);
        
        console.log(`📱 Validating phone: ${phone}`);
        console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        
        return {
            isValid,
            errors: isValid ? [] : ['Invalid phone number format']
        };
    }
}

class Validator {
    constructor() {
        this.strategy = null;
    }
    
    setValidationStrategy(strategy) {
        this.strategy = strategy;
    }
    
    validate(data) {
        if (!this.strategy) {
            throw new Error('No validation strategy set');
        }
        
        return this.strategy.validate(data);
    }
}

// Usage Examples
console.log('=== STRATEGY PATTERN EXAMPLES ===\n');

// Payment Processing Example
console.log('1. Payment Processing Strategies:');
const paymentProcessor = new PaymentProcessor();

// Credit Card Payment
const creditCard = new CreditCardPayment('1234567890123456', '123', '12/25');
paymentProcessor.setPaymentStrategy(creditCard);
paymentProcessor.processPayment(99.99);

// PayPal Payment
const paypal = new PayPalPayment('user@example.com');
paymentProcessor.setPaymentStrategy(paypal);
paymentProcessor.processPayment(49.99);

// Bank Transfer Payment
const bankTransfer = new BankTransferPayment('9876543210', '123456789');
paymentProcessor.setPaymentStrategy(bankTransfer);
paymentProcessor.processPayment(199.99);

// Sorting Strategies Example
console.log('\n2. Sorting Strategies:');
const sorter = new Sorter();
const testArray = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];

console.log('Original array:', testArray);

// Bubble Sort
const bubbleSort = new BubbleSortStrategy();
sorter.setSortingStrategy(bubbleSort);
const bubbleResult = sorter.sort(testArray);
console.log('Bubble sort result:', bubbleResult);

// Quick Sort
const quickSort = new QuickSortStrategy();
sorter.setSortingStrategy(quickSort);
const quickResult = sorter.sort(testArray);
console.log('Quick sort result:', quickResult);

// Merge Sort
const mergeSort = new MergeSortStrategy();
sorter.setSortingStrategy(mergeSort);
const mergeResult = sorter.sort(testArray);
console.log('Merge sort result:', mergeResult);

// Compression Strategies Example
console.log('\n3. Compression Strategies:');
const compressionManager = new CompressionManager();
const testData = 'This is a test string that will be compressed using different algorithms.';

console.log('Original data:', testData);
console.log('Original size:', testData.length, 'characters');

// ZIP Compression
const zipCompression = new ZipCompression();
compressionManager.setCompressionStrategy(zipCompression);
const zipResult = compressionManager.compress(testData);
console.log('ZIP compression:', zipResult);

// GZIP Compression
const gzipCompression = new GzipCompression();
compressionManager.setCompressionStrategy(gzipCompression);
const gzipResult = compressionManager.compress(testData);
console.log('GZIP compression:', gzipResult);

// Validation Strategies Example
console.log('\n4. Validation Strategies:');
const validator = new Validator();

// Email Validation
const emailValidation = new EmailValidation();
validator.setValidationStrategy(emailValidation);
validator.validate('user@example.com');
validator.validate('invalid-email');

// Password Validation
const passwordValidation = new PasswordValidation(8, true);
validator.setValidationStrategy(passwordValidation);
validator.validate('StrongPass123!');
validator.validate('weak');

// Phone Validation
const phoneValidation = new PhoneValidation();
validator.setValidationStrategy(phoneValidation);
validator.validate('+1-555-123-4567');
validator.validate('123');

module.exports = {
    PaymentProcessor,
    CreditCardPayment,
    PayPalPayment,
    BankTransferPayment,
    Sorter,
    BubbleSortStrategy,
    QuickSortStrategy,
    MergeSortStrategy,
    CompressionManager,
    ZipCompression,
    GzipCompression,
    Validator,
    EmailValidation,
    PasswordValidation,
    PhoneValidation
};

