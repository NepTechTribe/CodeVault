# Temperature Converter in Python
# Converts between Celsius, Fahrenheit, and Kelvin

def convert(temp, unit_from, unit_to):
    if unit_from == "C":
        if unit_to == "F": return (temp * 9/5) + 32
        if unit_to == "K": return temp + 273.15
    elif unit_from == "F":
        if unit_to == "C": return (temp - 32) * 5/9
        if unit_to == "K": return (temp - 32) * 5/9 + 273.15
    elif unit_from == "K":
        if unit_to == "C": return temp - 273.15
        if unit_to == "F": return (temp - 273.15) * 9/5 + 32
    return None

def main():
    print("=== Temperature Converter ===")
    print("Units: C = Celsius, F = Fahrenheit, K = Kelvin")
    
    temp = float(input("Enter temperature: "))
    unit_from = input("Convert from (C/F/K): ").strip().upper()
    unit_to = input("Convert to (C/F/K): ").strip().upper()

    result = convert(temp, unit_from, unit_to)
    if result is not None:
        print(f"{temp:.2f}{unit_from} = {result:.2f}{unit_to}")
    else:
        print("Invalid units. Please enter C, F, or K.")

if __name__ == "__main__":
    main()
