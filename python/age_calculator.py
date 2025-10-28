from datetime import date, datetime

def calculate_age(birth_date):
    today = date.today()
    years = today.year - birth_date.year
    months = today.month - birth_date.month
    days = today.day - birth_date.day

    if days < 0:
        months -= 1
        previous_month = (today.month - 1) if today.month > 1 else 12
        previous_year = today.year if today.month > 1 else today.year - 1
        days += (date(previous_year, previous_month + 1, 1) - date(previous_year, previous_month, 1)).days

    if months < 0:
        years -= 1
        months += 12

    return years, months, days


def main():
    print("\t\t AGE CALCULATOR")
    print("Enter your birth date (YYYY-MM-DD): ", end="")
    dob_str = input().strip()

    try:
        birth_date = datetime.strptime(dob_str, "%Y-%m-%d").date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return

    if birth_date > date.today():
        print("You entered a future date!")
        return

    years, months, days = calculate_age(birth_date)
    print(f"\nYou are {years} years, {months} months, and {days} days old!\n")


if __name__ == "__main__":
    main()
