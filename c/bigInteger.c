#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Remove leading zeros
void removeLeadingZeros(char *num) {
    int i = 0;
    while (num[i] == '0' && num[i + 1])
        i++;
    if (i)
        memmove(num, num + i, strlen(num + i) + 1); // memmove(dest, src, n)
}

// Compare two positive numeric strings
// Returns: 1 if a > b, -1 if a < b, 0 if equal
int compareMagnitude(const char *a, const char *b) {
    int lenA = strlen(a), lenB = strlen(b);
    if (lenA != lenB)
        return (lenA > lenB) ? 1 : -1;
    return strcmp(a, b);
}

// Reverse string in place
void reverse(char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char tmp = str[i];
        str[i] = str[len - i - 1];
        str[len - i - 1] = tmp;
    }
}

// Add "-" sign if needed
char* applySign(char *num, int negative) {
    if (!negative || strcmp(num, "0") == 0)
        return num;

    char *tmp = malloc(strlen(num) + 2);
    sprintf(tmp, "-%s", num);
    free(num);
    return tmp;
}

// =================== Refer Readme.md for explanation ==========

char* addPositive(const char *a, const char *b) {
    int lenA = strlen(a), lenB = strlen(b);
    int maxLen = (lenA > lenB ? lenA : lenB) + 2; // +1 for carry, +1 for '\0'

    char *res = malloc(maxLen);
    char *revA = strdup(a);
    char *revB = strdup(b);
    reverse(revA);
    reverse(revB);

    int carry = 0, i = 0;
    for (; i < lenA || i < lenB || carry; i++) {
        int digitA = i < lenA ? revA[i] - '0' : 0;
        int digitB = i < lenB ? revB[i] - '0' : 0;
        int sum = digitA + digitB + carry;
        res[i] = (sum % 10) + '0';
        carry = sum / 10;
    }

    res[i] = '\0';
    reverse(res);

    free(revA);
    free(revB);

    removeLeadingZeros(res);
    return res;
}

// Subtract two positive numbers assuming a >= b
char* subtractPositive(const char *a, const char *b) {
    int lenA = strlen(a), lenB = strlen(b);
    char *res = malloc(lenA + 1);
    char *revA = strdup(a);
    char *revB = strdup(b);
    reverse(revA);
    reverse(revB);

    int borrow = 0, i = 0;
    for (; i < lenA; i++) {
        int digitA = revA[i] - '0';
        int digitB = i < lenB ? revB[i] - '0' : 0;
        int diff = digitA - digitB - borrow;
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        res[i] = diff + '0';
    }

    res[i] = '\0';
    reverse(res);

    free(revA);
    free(revB);
    removeLeadingZeros(res);
    return res;
}

// Multiply two positive numbers
char* multiplyPositive(const char *a, const char *b) {
    int lenA = strlen(a), lenB = strlen(b);
    int *temp = calloc(lenA + lenB, sizeof(int));

    for (int i = lenA - 1; i >= 0; i--) {
        for (int j = lenB - 1; j >= 0; j--) {
            int mul = (a[i] - '0') * (b[j] - '0');
            int posLow = i + j + 1;
            int posHigh = i + j;
            int sum = mul + temp[posLow];
            temp[posLow] = sum % 10;
            temp[posHigh] += sum / 10;
        }
    }

    char *res = malloc(lenA + lenB + 1);
    
    // making numeric string from temp array
    int k = 0, i = 0;
    while (i < lenA + lenB && temp[i] == 0)
        i++;

    if (i == lenA + lenB)
        res[k++] = '0';
    else
        for (; i < lenA + lenB; i++)
            res[k++] = temp[i] + '0';

    res[k] = '\0';

    free(temp);
    removeLeadingZeros(res);
    return res;
}

// Wrapper for addition with signs
char* add(const char *a, const char *b) {
    // 0-index is sign
    int negA = (a[0] == '-');
    int negB = (b[0] == '-');

    // Pointers to numeric parts
    const char *numA = negA ? a + 1 : a;
    const char *numB = negB ? b + 1 : b;
    char *res;

    // Same sign case
    if (negA == negB) {
        res = addPositive(numA, numB);
        return applySign(res, negA);
    }

    // Different sign case
    int cmp = compareMagnitude(numA, numB);
    if (cmp == 0)
        return strdup("0");

    if (cmp > 0)
        res = subtractPositive(numA, numB);
    else
        res = subtractPositive(numB, numA);

    return applySign(res, (cmp > 0) ? negA : negB);
}

// Subtraction using addition logic
char* subtract(const char *a, const char *b) {
    char *negB;

    // fliping sign of b to use addition function
    if (b[0] == '-')
        negB = strdup(b + 1);
    else {
        negB = malloc(strlen(b) + 2);
        sprintf(negB, "-%s", b);
    }

    // a - b = a + (-b)
    char *res = add(a, negB);
    free(negB);
    return res;
}

// Multiply signed numbers
char* multiply(const char *a, const char *b) {
    int neg = 0; // flag for negative result

    /// only magnitude multiplication so omitting signs
    if (a[0] == '-') {
        a++;
        neg = !neg;
    }

    if (b[0] == '-') {
        b++;
        neg = !neg;
    }

    char *res = multiplyPositive(a, b);
    return applySign(res, neg);
}

// ---------- Main Function ----------
int main() {
    char num1[1001], num2[1001];
    printf("Enter first large number: ");
    scanf("%1000s", num1);
    printf("Enter second large number: ");
    scanf("%1000s", num2);

    removeLeadingZeros(num1);
    removeLeadingZeros(num2);

    printf("\nResults:\n");
    printf("Addition:       %s\n", add(num1, num2));
    printf("Subtraction:    %s\n", subtract(num1, num2));
    printf("Multiplication: %s\n", multiply(num1, num2));

    return 0;
}