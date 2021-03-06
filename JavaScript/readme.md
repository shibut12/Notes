# JavaScript

Is a PrototypeOriented programming language. It is interpreted and dynamically typed

## ES2015

Previously called ES6, ES2015 is the most extensive update to the _JavaScript_ language since the publication of its first edition in 1997. Additional documentation is [here](/JavaScript/es2015-es6.md)

## Objects

### Key concepts

#### this

`this` refers to the object that the code is being executed. By default, it is the `Global` object. In a browser it is the `window` object.

#### new

`new` creates an empty JavaScript object. in the below example it is used to create instance of functions.

```js
function Cat(){
    this.name = 'Fluffy';
    this.color = 'White';
}

var cat = new Cat();
console.log(cat.name); //resolve to Fluffy
```

#### Constructors and parameters

Used to create named objects.

```js
function Cat(name, color){
    this.name = name;
    this.color = color;
}

var cat = new Cat('Fluffy', 'brown');
console.log(cat.name + ' is ' + cat.color); // resolves to Fluffy is brown
```

#### Object.create

`new` uses `Object.create` behind the scene to create an instance of the Cat object.

```js
//Object creation using the literal
//Object notation {}

//Object #1
var foo = {name: 'foo', one: 1, two: 2};

//Object #2
var bar = {two: 'two', three: 3};

console.log(bat.three);// Resolve to 3

//Object.setPrototypeOf() is introduced in ECMAScript2015

bar = Object.create(foo); //bar is an instance of foo

// Verification.
console.log(bar.one);  // Resolve to 1
console.log(bar.two);  // Resolve to 2
console.log(bat.three);// undefined error
console.log(bar.name); // Resolve to foo
```

#### class - added in ECMAScript 6

Allows to program in a OOPS programming style.

```js
class Cat{
    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    speak(){
        console.log('meow');
    }
}

var lucy = new Cat('Lucy', 'White');
lucy.speak(); //Resolves to meow
```

---

### Objects, properties and Property attributes

#### dot `.` notation

Allows to create, change or access named property from an object.

```js
var cat = {
    name: 'Fluffy',
    color: 'White'
}

console.log(cat.name); // Resolve to Fluffy
```

#### Bracket notation []

Allows to create and access named properties from an object. It is similar to dot `.` notation. The use case for this notation is you can create properties with name enter by user or a json payload.

```js
var cat = {
    name: 'Fluffy',
    color: 'White'
}

cat['eye-color'] = 'blue';
console.log(cat['eye-color']); // Resolve to blue
```

#### OwnPropertyDescriptor

Every property has a property descriptor.

```js
var cat = {
    name: 'Fluffy',
    color: 'White'
}

console.log(Object.getOwnPropertyDescriptor(cat, 'name'));

//Generates following json
//{"value":"Fluffy","writable":true,"enumerable":true,"configurable":true}
```

##### Writable property

It allows to change the name of property from its initial value. To make a property non-writable, use `Object.defineProperty`. 

Only `'use strict'` mode will generate error if an attempt to change name property is failed.

```js
Object.defineProperty(object-name, 'name', {writable: false});
```

```js
var cat = {
    name: 'Fluffy',
    color: 'White'
}

cat.name = 'floof'; // will update the name property from Fluffy to floof

cat; // will print {name: "floof", color: "White"}

Object.defineProperty(cat, 'name', {writable: false}); // sets the name property of cat object non writable

cat.name = 'Fluffy';  // will not change the name property

cat; // will print {name: "floof", color: "White"}

console.log(Object.getOwnPropertyDescriptor(cat, 'name'));

//Generates following json
//{value: "floof", writable: false, enumerable: true, configurable: true}
```

##### Object.freeze

Even though `Object.defineProperty` makes a property non-writable, if the property is pointing to another object, it will still allow user to change the value. To disable this, you need to `freeze` the field.

```js
'use strict'

var cat = {
    name: {first: 'Fluffy', last: 'Labouf'},
    color: 'white'
}

Object.defineProperty(cat, 'name', {writable: false});
Object.freeze(cat.name);
cat.name = 'Fluffy'; //will fail
cat; // will print {"name":{"first":"Fluffy","last":"Labouf"},"color":"white"}
```

#### Enumerable operator

The enumerable property is depends on `enumerable` property, if it is `false`, it will not JSON serialize the object leaf elements of the object.

```js
var cat = {
    name: {first: 'Fluffy', last: 'Labouf'},
    color: 'white'
}

//will print name, color
for(var propertyName in cat){
    console.log(propertyName +  ':' + cat[propertyName]);
}

console.log(Object.keys(cat)); // will display ["name","color"]

JSON.stringify(cat) // Will resolve to {"name":{"first":"Fluffy","last":"Labouf"},"color":"white"}

Object.defineProperty(cat, 'name', {enumerable: false});
JSON.stringify(cat) // Will resolve to {"color":"white"}
```

#### Configurable operator

Will lock down the property, the value cannot be changed, property cannot be deleted. You can change the property to writable.

```js
var cat = {
    name: {first: 'Fluffy', last: 'Labouf'},
    color: 'white'
}

Object.defineProperty(cat, 'name', {configurable: false});
Object.defineProperty(cat, 'name', {enumerable: false}); // Will generate an error if 'use strict' is enabled.
delete(cat.name); //will generate an error as well.
```

#### Getters and Setters

```js
var cat = {
    name: {first: 'Fluffy', last: 'Labouf'},
    color: 'white'
}

Object.defineProperty(cat, 'fullName', {
    get: function(){
        return this.name.first + ' ' + this.name.last
    },
    set: function(value){
        var nameParts = value.split(' ');
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
});

console.log(cat.fullName); // Will resolve to Fluffy Labouf

cat.fullName = 'Muffin Top' // set first name to Muffin and last name to Top
console.log(cat.fullName); // Will resolve to Muffin Top
```

---

### Prototypes and inheritance

Prototype is an object that exists in every function in JavaScript.

```js
var arr = ['red', 'blue', 'green'];
console.log(arr.last); // undefined error


Object.defineProperty(arr, 'last', {get: function(){
    return this[this.length - 1];
}});

console.log(arr.last); // Resolve to Green

var arr1 = ['red', 'blue', 'green', 'yellow'];
console.log(arr1.last); // undefined error

Object.defineProperty(Array.prototype, 'last', {get: function(){
    return this[this.length - 1];
}});
console.log(arr1.last); // Resolve to yellow
```

The Prototype property is an empty object. __Objects__ do not have property, but they have _proto_ property. A prototype is not a class, it is an object. When a function is created, an empty prototype object is created and attached to it behind the scene. If this function then used as a constructor function with a `new` keyword, the object that is created has a `__proto__` property that is pointed to the same function that is pointed to the __function's prototype__.

__A function's prototype__ is the object __instance__ that will become the prototype for all objects created using this function as a constructor.

__An object's prototype__ is the object __instance__ from which the object is inherited.

E.g

```js
function Cat(name, color){
    this.name = name;
    this.color = color;
}

var lucy = new Cat('Lucy', 'White');

JSON.stringify(Cat.prototype); // will resolve to {}
JSON.stringify(lucy.__proto__); // will resolve to {}
Cat.prototype == lucy.__proto__; // Will resolve to true

Cat.prototype.age = 3; // Updated Cat's property by adding age
JSON.stringify(Cat.prototype); // will resolve to {"age":3}
JSON.stringify(lucy.__proto__); // will resolve to {"age":3}
Cat.prototype == lucy.__proto__; // Will resolve to true
```

#### Instance vs Prototype properties

If the value of a prototype is directly change on the object, then the new value is added as a property of the object and the value in prototype is unchanged. The `hasOwnProperty` function allows to check if the given property is defined on the object or on the prototype.


When code request for a specific property, JavaScript first lookup the property in Object, if not found it will lookup in `__proto__ ` or `prototype`.

```js
function Cat(name, color){
    this.name = name;
    this.color = color;
}
Cat.prototype.age = 3; // Updated Cat's property by adding age

var lucy = new Cat('Lucy', 'White');
var CAT = new Cat('CAT', 'Brown');

console.log(lucy.age); // resolve to 3
console.log(CAT.age); // resolve to 3

lucy.age = 1;
console.log(lucy.age); // resolve to 1
console.log(lucy.__proto__.age); // resolve to 3
console.log(CAT.age); // resolve to 3
console.log(lucy.hasOwnProperty('age')); //resolve to true
console.log(CAT.hasOwnProperty('age')); //resolve to false
```

#### Changing a function's prototype

When objects are created, their `__proto__` is pointed to a `prototype` in memory. When the `prototype` object of the function is modified after creating objects, the new prototype is pointed to a __new prototype__ object in memory. The existing objects will continue to point to the __prototypes__ in memory. In short prototype is like pointers.

```js
function Cat(name, color){
    this.name = name;
    this.color = color;
}
Cat.prototype.age = 4; // Updated Cat's property by adding age

var lucy = new Cat('Lucy', 'White');
var CAT = new Cat('CAT', 'Brown');

console.log(CAT.age); //Resolve to 4
console.log(lucy.age); // Resolve to 4

Cat.prototype = {age: 5};

var jack = new Cat('jack', 'Black');

console.log(CAT.age); //Resolve to 4
console.log(lucy.age); // Resolve to 4
console.log(Cat.prototype.age); // Resolve to 5
console.log(jack.age); // Resolve to 5
```

#### Multiple levels of Inheritance

It is possible to walk up the prototype chain to view parent object's `prototype`, but eventually a null will be returned. It is because, in JavaScript every object is inherited from `Object` an `Object` __does not have a prototype__.

```js
function Cat(name, color){
    this.name = name;
    this.color = color;
}
Cat.prototype.age = 4; // Updated Cat's property by adding age

var lucy = new Cat('Lucy', 'White');

JSON.stringify(lucy.__proto__); // resolve to {"age":4}
JSON.stringify(lucy.__proto__.__proto__); // resolve to {}
JSON.stringify(lucy.__proto__.__proto__.__proto__); // resolve to null
```

#### Creating own chains of Inheritance

Following are very important 3 lines of code when creating own prototype chains.

1. `Animal.call(this, 'meow');` - Ensure that when a object is called it calls the parent's constructor
2. `Cat.prototype = Object.create(Animal.prototype)';` - Set the Child's prototype to parent's prototype.
3. `Cat.prototype.constructor = Cat;` - Set the default constructor of child to child itself, it ensure that chile is not set ans an object of parent.

```js
function Animal(){}
Animal.prototype.speak = function(){
    console.log('grunt');
}

function Cat(name, color){
    this.name = name;
    this.color = color;
}

Cat.prototype = Object.create(Animal.prototype); // Object.create will not call the Animal constructor, it just set the object

var lucy = new Cat('Lucy', 'White');
lucy.speak(); // Resolve to grunt
```

To ensure the parent object is called follow below code. The `.call(this);` will ensure that any validation that Parent object may have is called.

```js
function Animal(voice){
    this.voice = voice;
}
Animal.prototype.speak = function(){
    console.log(this.voice);
}

function Cat(name, color){
    Animal.call(this, 'meow');
    this.name = name;
    this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

var lucy = new Cat('Lucy', 'White');
lucy.speak(); // Resolve to Meow

lucy instanceof Cat; // resolve to true
lucy instanceof Animal; // resolve to false
```

#### Creating prototypes with Class like syntax

Properties of `Classes` are nbot enumerable, you cannot walk up the inheritance chain when created using Class.

```js
class Animal {
    constructor(voice){
        this.voice = voice || 'grunt';
    }
    speak(){
        console.log(this.voice);
    }
}
class Cat extends Animal{
    constructor(name, color){
        super('Meow');

        this.name = name;
        this.color = color;
    }
}

var lucy = new Cat('Lucy', 'White');
lucy.speak(); //Resolves to Meow
```