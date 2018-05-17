# JavaScript

Is a PrototypeOriented programming language. It is interpreted and dynamically typed

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