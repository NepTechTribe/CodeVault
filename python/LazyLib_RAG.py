import random

# A tiny "knowledge base" (pretend documents)
documents = [
    "Cats were once worshipped as gods in ancient Egypt.",
    "Bananas are berries, but strawberries aren't.",
    "The moon landing happened in 1969.",
    "Octopuses have three hearts and blue blood."
]

def retrieve(query):
    """Pretend to retrieve the most relevant document."""
    return random.choice(documents)

def generate_answer(query):
    """Pretend to generate an answer using retrieved info."""
    doc = retrieve(query)
    return f"📚 I found this: '{doc}'\nSo, in response to your question '{query}', I'd say... maybe that!"

# Example question
question = "Why do cats act like they own the place?"
print(generate_answer(question))
