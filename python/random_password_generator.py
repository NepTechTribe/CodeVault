#!/usr/bin/env python3
# Author: Rishabh
# Random Password Generator CLI - generates secure passwords with letters, numbers, and symbols

import random
import string
import pyperclip  # ✅ New addition for clipboard support

def generate_password(length):
    """Generate a random password with letters, numbers, and symbols."""
    if length < 4:
        print("Password length should be at least 4 characters for security.")
        return None

    # Character pools
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    symbols = string.punctuation

    # Ensure at least one character from each category
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(symbols)
    ]

    # Fill remaining length with random characters from all categories
    all_characters = lowercase + uppercase + digits + symbols
    password += random.choices(all_characters, k=length - 4)

    # Shuffle to avoid predictable patterns
    random.shuffle(password)

    return ''.join(password)

def main():
    print("=== Random Password Generator ===")

    while True:
        try:
            length = int(input("\nEnter desired password length (minimum 4): "))
            if length < 4:
                print("Please enter a length of at least 4.")
                continue
            break
        except ValueError:
            print("Please enter a valid number.")

    password = generate_password(length)
    if password:
        print(f"\nGenerated Password: {password}")
        print(f"Length: {len(password)} characters")

        # ✅ Password strength indicator
        if length < 8:
            print("⚠️ Strength: Weak — consider using at least 8 characters.")
        elif length < 12:
            print("🟡 Strength: Moderate — good for temporary use.")
        else:
            print("🟢 Strength: Strong — suitable for secure use.")

        # ✅ Option to copy password to clipboard
        copy = input("\nCopy password to clipboard? (y/n): ").strip().lower()
        if copy == 'y':
            pyperclip.copy(password)
            print("📋 Password copied to clipboard!")

if __name__ == "__main__":
    main()
