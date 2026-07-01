class Employee {

    name: string;

    role: string;

    constructor(name: string, role: string) {

        this.name = name;
        this.role = role;

    }

    displayDetails() {

        console.log(`Name: ${this.name}`);
        console.log(`Role: ${this.role}`);

    }

}

const emp = new Employee(
    "Pratiksha",
    "QA Engineer"
);

emp.displayDetails();