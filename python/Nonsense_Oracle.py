import random

questions = [
    "If a tree could talk, what would it say?",
    "What color is happiness?",
    "How many stars fit in your pocket?",
    "Can clouds taste like candy?",
    "Do shadows have dreams?"
]

answers = [
    "Definitely purple!",
    "Only on Tuesdays.",
    "More than you think.",
    "Ask again in a dream.",
    "Impossible, but fun to try.",
    "The answer is somewhere under your bed."
]

side_effects = ["✨", "💀", "🐍", "🌈", "🔥", "🌀"]

print("🌀 Welcome to the Nonsense Oracle 🌀")

rounds = 0
while True:
    rounds += 1
    print("\n" + random.choice(questions))
    input("Your answer: ")
    print("Oracle says:", random.choice(answers), random.choice(side_effects))
    
    if rounds >= 3:
        print("🏆 You are now a Master Dreamer! 🏆")
    
    if input("Continue? (y/n) ").lower() != "y":
        print("Farewell, dreamer! 🌟")
        break
