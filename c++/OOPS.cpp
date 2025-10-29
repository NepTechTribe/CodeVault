#include <bits/stdc++.h>
using namespace std;

// Abstraction: interface-like base
class Vehicle {
public:
    virtual ~Vehicle() = default;
    virtual string type() const = 0;                  // pure virtual [abstraction]
    virtual double farePerKm() const = 0;             // pure virtual
    virtual double estimate(double km) const = 0;     // polymorphic behavior
    virtual void print() const = 0;                   // virtual printing
};

// Encapsulation: private state with validation
class Car : public Vehicle {
    string plate;            // private data [encapsulation]
    int seats;
    double baseFare;
    double perKm;
public:
    Car(string plateNo, int seatCount, double base, double perkm)
        : plate(move(plateNo)), seats(seatCount), baseFare(base), perKm(perkm) {
        if (seats <= 0) throw invalid_argument("Seats must be positive");
        if (baseFare < 0 || perKm <= 0) throw invalid_argument("Invalid fares");
    }
    // getters (controlled access)
    const string& getPlate() const { return plate; }
    int getSeats() const { return seats; }
    double farePerKm() const override { return perKm; }             // override for polymorphism
    string type() const override { return "Car"; }
    double estimate(double km) const override {                    // dynamic dispatch
        if (km < 0) throw invalid_argument("km must be non-negative");
        // Surge for comfort and base fare
        return baseFare + km * perKm;
    }
    void print() const override {
        cout << "[Car] " << plate << " seats=" << seats
             << " base=" << baseFare << " perKm=" << perKm << "\n";
    }
};

class Bike : public Vehicle {
    string plate;
    bool helmetIncluded;
    double perKm;
public:
    Bike(string plateNo, bool helmet, double perkm)
        : plate(move(plateNo)), helmetIncluded(helmet), perKm(perkm) {
        if (perKm <= 0) throw invalid_argument("Invalid perKm");
    }
    const string& getPlate() const { return plate; }
    bool hasHelmet() const { return helmetIncluded; }
    double farePerKm() const override { return perKm; }
    string type() const override { return "Bike"; }
    double estimate(double km) const override {
        if (km < 0) throw invalid_argument("km must be non-negative");
        double safetyFee = helmetIncluded ? 2.0 : 0.0;
        return safetyFee + km * perKm;                              // different formula
    }
    void print() const override {
        cout << "[Bike] " << plate << " helmet=" << boolalpha << helmetIncluded
             << " perKm=" << perKm << "\n";
    }
};

// Utility using runtime polymorphism
double totalTripCost(const vector<unique_ptr<Vehicle>>& fleet, double km) {
    double sum = 0;
    for (auto& v : fleet) sum += v->estimate(km);                   // virtual call
    return sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<unique_ptr<Vehicle>> fleet;
    fleet.emplace_back(make_unique<Car>("MH12-AB-1234", 4, 50.0, 12.5));
    fleet.emplace_back(make_unique<Bike>("MH14-XY-9876", true, 6.0));
    fleet.emplace_back(make_unique<Car>("MH12-ZZ-5555", 6, 80.0, 14.0));

    cout << "Fleet details:\n";
    for (auto& v : fleet) {
        v->print();                                                 // virtual call
    }

    double km = 8.0;
    cout << fixed << setprecision(2);
    cout << "\nEstimations for " << km << " km:\n";
    for (auto& v : fleet) {
        cout << v->type() << " -> Rs " << v->estimate(km)
             << " (Rs " << v->farePerKm() << "/km)\n";
    }

    cout << "\nTotal trip cost (all vehicles): Rs "
         << totalTripCost(fleet, km) << "\n";

    // Demonstrate safe downcast if needed
    if (auto* c = dynamic_cast<Car*>(fleet[0].get())) {
        cout << "\nFirst vehicle plate (Car): " << c->getPlate() << "\n";
    }
}
