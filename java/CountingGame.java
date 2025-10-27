import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rand = new Random();

        System.out.println("=== Welcome to the Number Guessing Game ===");
        int target = rand.nextInt(100) + 1; // Random number between 1 and 100
        int attempts = 0;
        int guess = 0;

        System.out.println("I'm thinking of a number between 1 and 100.");
        System.out.println("Can you guess it?");

        // Game loop
        while (guess != target) {
            System.out.print("\nEnter your guess: ");
            guess = sc.nextInt();
            attempts++;

            if (guess < target) {
                System.out.println("Too low! Try again.");
            } else if (guess > target) {
                System.out.println("Too high! Try again.");
            } else {
                System.out.println("🎉 Congratulations! You guessed it in " + attempts + " tries!");
            }
        }

        sc.close();
        System.out.println("Thanks for playing!");
    }
}
