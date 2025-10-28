// Sample of Object Oriented Database (OODB) using C++. 

#include <iostream>
#include <fstream>
#include <string>
#include <map>
using namespace std;

// Defining the structure of object
class Person {
private:
    string name;
    int age;

public:
    Person() : age(0) {}    // Default age 0
    Person(string n, int a) : name(n), age(a) {}

    string getName() const { return name; }
    int getAge() const { return age; }

    void save(ofstream& out) const {
        out << name << '\n' << age << '\n';
    }

    void load(ifstream& in) {
        getline(in, name);
        in >> age;
        in.ignore();  // this consumes the leftover newlines
    }

    void display() const {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

int main() {
    // Object to store
    Person person1("Alice", 30);
    Person person2("Bob", 25);

    // concept of key,value to save and retrieve
    map<string, Person> db;
    db["alice"] = person1;
    db["bob"] = person2;

    // Simulated DB using file handeling
    ofstream outFile("assets/mydatabase.txt");
    if (!outFile) {
        cerr << "Error opening file for writing." << endl;
        return 1;
    }

    for (auto& entry : db) {
        string key = entry.first;
        Person& person = entry.second;

        outFile << key << '\n';
        person.save(outFile);  
    }
    outFile.close();
    cout << "Objects saved to database successfully.\n";

    // Reading from the DB (txt file)
    ifstream inFile("assets/mydatabase.txt");
    if (!inFile) {
        cerr << "Error opening file for reading." << endl;
        return 1;
    }

    map<string, Person> loadedDb;
    while (true) {
        string key;
        if (!getline(inFile, key)) break;

        Person p;
        p.load(inFile);
        loadedDb[key] = p;
    }
    inFile.close();

    // Display the saved data
    cout << "\nRetrieved objects from database:\n";
    for (auto& entry : loadedDb) {
        string key = entry.first;
        Person& person = entry.second;
        cout << "Key: " << key << " -> ";
        person.display();
    }

    return 0;
}