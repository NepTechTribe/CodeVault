import random
welcome_message="Hey User! Welcome to the number guessing game..."
print(welcome_message)
# add too low and too high
range_question=int(input("What is the highest number you would want me to think of?\n"))
difficulty=input("Choose difficulty: easy,medium or hard\n").lower()
print("I am thinking of a number........")
answer=random.randint(0,range_question)
should_continue=True
if difficulty=="easy":
    lives=10
elif difficulty=="medium":
    lives=5
elif difficulty=="hard":
    lives=3
while lives>0 and should_continue:
    guess=int(input("Enter your guess here...\n"))
    if guess==answer:
        print(f"Yayyyy! You got it right. The number is {answer}")
        print("See you again soon!")
        should_continue=False
    else:
        lives-=1
        print(f"Ohh no! Your guess was wrong... the number is not {guess}")
        print(f"You have {lives} lives left")
        print("Go ahead take another guess...")
if lives==0:
    print("You lose! You have no lives left")

