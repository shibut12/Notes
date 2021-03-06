# React

A JavaAScript library for building user interfaces. The libreary is created and maintained by Facebook.

## Flux and Redux

* Flux is a pattern redux is a library
* Flux and Redux have actions. Actions can be compared to events in JS.
  * In Flux
    * an action is a simple JavaScript Object
  * In Redux
    * by default an action is a simple JavaScript object.
    When using Redux middleware, action can be functions and promises
* Stores
  * Flux
    * Can have multiple stores per application, each store is a singleton object.
  * Redux
    * Can have only a single store per Application, data usually separated into data domains internally.
* Dispatcher
  * Flux
    * Has a single dispatcher, and all action have to pass through that dispatcher.
    * It is a singleton object
  * Redux
    * Has no dispatcher entity, instead the store has the dispatching process baked in.
    * A Redux store exposes a few simple API function, one of them is to dispatch actions.
* Store
  * Flux
    * The action on data is written in Store.
    * The store can decide what parts of the data to expose publicly.
    * This is the key player in flux.
    * You can mutate the state as you wish
  * Redux
    * The login on waht to perform on received data is in Reducer function. 
    * This gets called for every action that gets dispatched.
    * A store cannot be defined without a reducer function.
    8 A Redux Receiver is a simple function that receives the previous state and one action, and it returns the new state based on the action.
    * In redux app you can split your reducer into simpler functions as you would do with any other function.
    * The smartest player in redux app is the reducer.
    * Redux will expose whatever returned from store's reducer. This is one constraint.
    * You cannot mutate the state.
    * Redux reducers always copy the state they receive and returns a modified version of the state's copy, not the original.

Flux | Redux
-----|------
Stores contain state and change logic | Store and change logic are separate
Multiple stores| one store
Flat and disconnected stores | Single store with hierarchial reducers
Singleton dispatcher | No dispatcher
React components subscribe to stores | Container components utilize connect
State is mutated | State is immutable


## Features

* JSX - Martkups in javaScript
* Virtual DOM
* Isomorphic rendering - Allows to render in client and server
* Unidirectional flows

## Core concepts

* HTML should be a projection of app state , not a source of truth.
* JavaScript and HTML belong in the same file.
* Unidirectional flow, not two-way binding.
* Inline styles can be good.

## Technology is overview

* Use Node JS to write server side javascript
* Use Browserify to expose node js pacages in the browser
* React as components library
* React routing for routing
* Facebook flux for unidirectional data flow
* Gulp task runner

## Advantages and Disadvantages


|Advantages                               |  Disadvantages                                         |
------------------------------------------|--------------------------------------------------------|
|Conceptual Simplicity                    | Limited in scope
|Recat is faster than competitors         | Productivity 
|Simple model for server side rendering   | Complex tooling

## Architecture

    PROPS -----> RENDER  <---- STATE <---|
                   |                     |
                   |                     |
                   |                     | Events
                   |                     |
                   \/                    |
                  DOM                    |
                   |                     |
                   |---------------------|

Model + component = DOM

## Comparison with Angular

|React                                    |  Angular                                               |
------------------------------------------|--------------------------------------------------------|
|Renders UI and handles events            | A Complete UI framework
|Uses JavaScript for view logic           | Custom template expression syntax
|Applicaitons are written in JavaScript   | Written in TypeScript

## JSX

A Syntax extension to JavaScript. It is used with React to descriibe what the UI should look like. JSX prodices __React elements__.

### Hello world JSX

```javascript
const name = 'Shibu';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);
```
## Components

### Different ways to create a component

* ES5 createClass method
Original method suggested when react introiduced.
```js
var HelloWorld = React.createClass({
  render: function(){
    return(
      <h1>Hello world</h1>
    );
  }
});
```

React does not require explicit binding

```js
//This will work in ES5
<div onCLick={this.handleClick}>Click here</div>
```

* ES6 class extends React.Component

React requires explicit binding with ES6 class.

```js
//This will not work in ES6
<div onCLick={this.handleClick}>Click here</div>

//This will work in ES6
<div onCLick={this.handleClick.bind(this)}>Click here</div>
```

A better approach to bind function in ES6 is through _class constructor_.

```js
class Contacts extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
}
```
* ES5 stateless function

Introduuced in _react 1.4_. It has simpler syntax. All the data for the components through _props_.

```js
var HelloWorld = function(props){
  return(
    <h1>Hello world</h1>
  );
};
```

* ES6 stateless function

Following are recommended in ES6.

1. Arrow => functions over _function_ keyword.
2. Use _const_ or _let_ instead _var_.

```js
const HelloWorld = (props) => {
  return(
    <h1>Hello world</h1>
  );
};
```

#### Key benefits of stateless components

1. No class is needed
2. Avoid `this` keyword
3. Enforced best practices, good for presentational components
4. Hi Signal-to-noise ratio
5. Enhanced code completion / intellisense
6. Bloated components are obvious
7. Easy to uinderstand
8. Easy to test
9. Improve performances as it does not have any states

#### When should we use Stateless components

Class component                                  | Stateless component
--------------------------------------------------|-----------------------------
If State, ref and life cycle methods are needed   | Every where else
If needed chil;d functions(for better performance)| Every where else

### Container and Presentation component

Container component                                  | Presentation component
--------------------------------------------------|-----------------------------
Little to no markeup   | Contains only markups
Typically stateful| Stateless
Pass data and actions down| Recieve data and actions via props
Knows about redux | doesnt know about redux, relys completely on props or state
