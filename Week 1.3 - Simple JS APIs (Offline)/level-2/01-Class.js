// Class Handbook

// ? Classes are a template for creating objects
// ? They encapsulate data with code to wrok on that data
// ? Classes in JS are built on prototypes but also
// ? have some syntax and semantics that are unique to classes

// ? The body of a class is executed in strict mode
// ? even without the "use strict" directive.

// ! Declaration
class Animal {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  static myType() {
    console.log('Animal');
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
}

// ! Expression: the class is anonymous but assigned to a variable
const Animal1 = class {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
};

// ! Expression; the class has its own name
const Animal2 = class Animal2 {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
};

// ? A class element can be characterized by three aspects:

// ? Kind: Getter, setter, method, or field
// ? Location: Static or instance
// ? Visibility: Public or private

let dog = new Animal('Doggyy', 9);
Animal.myType();
// ? Give R.E
// dog.myType();
