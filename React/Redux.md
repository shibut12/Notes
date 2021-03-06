# Redux

## Why Redux

_Vanilla JS_ is suitable for ultra simple app that does not need any DOM manipulation. You can add _jQuery_ into the application if you need reusable code for DOM manipulation and other simplified HTTP requests etc, the disadvantage is maintaining the code is complicated over the time. _React_ is great for bigger projects because of _clear component model, synthetic events, and virtual dom_. React becomes complex when same data need to display in multiple places. _Redux_ makes data management very easy.

## Foundation of Redux

### 1. One Immutable store for entire application

Helps debugging, helps server rendering, do undo / redo etc.

### 2. Actions are always trigger changes

Action describes user's intent, example a click event for new customer.

### 3. State is changed by pure function (reducers)wz

## Redux flow

There is one main __store__ for the entire application, the _store_ holds state of all components. _State_ of the _store_ can only be modified by __reducers__, _store_ can have only __one root reducer__, the _root reducer_ is created by combining many _reducers_. The reducers use an __action__ to identify the _action_ that required to perform, an _action_ contains __type__ and __payload__. The __containers__ are the `.jsx` files that contains logic behind _components_, the _containers_ __dispatch__ an _action_ to perform an operation. When an _action_ is _dispatched_, all the _reducers are notified_. The _reducers_ use a `switch` operator on _action.payload_ to identify if the action is intended for it. The __react components__ include the __Containers__ in it.

![](redux-flow.png)

## Key components

### Actions

The events happening in the application are called _Actions_. Actions are just plain _js_ object containing description on the event. An action must have a _type_ and a _property_.

```js
rateCourse(rating){
    return { type: RATE_COURSE, rating: rating }
}
```

### Store

You can create a store by calling `createStore()` in your application's entry point. The redux store is the single source of truth. Having a single source of truth makes the application easier to manage. Following are the `API` for _redux store_.

1. `store.dispatch(action)`
2. `store.subscribe(listener)`
3. `store.getState()`
4. `replaceReducer(nextReducer)`

```js
let store = createStore(rootReducer);
```

### Reducers

To change the state of store, you dispatch an _action_ that ultimately handled by a _reducer_. Reducer is a simple _javascript_ function that take the _state_ and _action_ and return the new _state_. All reducers are called when an action is dispatched. Each reducer look at the _action.type_ and decide if it need to act on the request.

```js
function myReducer(state, action){
    switch(action.type){
        case 'INCREMENT_COUNTER':
            return(
                {}, // Empty object
                state, // Existing state
                {counter: state.counter + 1} // set the new value for counter variable
            ); // Deep clone of all the above
        default:
            return state;
    }
}
```

### Containers vs components

Container | Components / Presentational
----------|-----------------------------
Focus on how things work | Focus on how things look
Aware of redux | Unaware of redux
Subscribe to Redux State | read from props
Dispatch Redux actions | Invoke callbacks on props
Generated by react-redux | written by hand

#### Methods to copy data in javascript

##### ES6 Object.Assign

The first parameter should be always an empty object.

```js
Object.assign(target, ...sources)

// Example
Object.assign({}, state, {role: 'admin'});
```

#### Spread operator

## Libraries

### React-redux

Helps to connect `React` with `Store`. The redux library can be used with other frameworks as well (e.g. Angular). React redux has two main components.

#### Provider

Attaches app to store. This is defined at the root of your application. Provider then make the store available to all the components in the application (This is done using reac's context).

```js
<Provider store={this.props.store}>
    <App />
</Provider>
```

#### Connect

Creates container components. This function wrapps react components so it is connected to the Redux store.

```js
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorPage);
```

 The `connect()` function accepts two parameters.

 1. mapStateToProps
 2. mapDispatchToProps

#### mapStateToProps

This _function_ descibes what portion of the state should expose as `props`. Once connected this function will be subscribed to the `redux store`, any time store is chanegd the connected function will be called. This function returns an object and it will be converted to properties for the component.

```js
// components can access state using
this.props.appState

// definition
function mapStateToProps(state, ownProps){
    return {appState: state.authorReducer };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorPage);
```

#### mapDispatchToProps

This function specify what actions to expose ans props. The function 'bindActionCreators' is part of redux.

```js
// components can access state using
this.props.appState

// definition
function mapDispatchToProps(dispatch){
    return {actions: bindActionCreators(actions, dispatch)};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorPage);
```

There are 3 ways to handle mapDispatchToProps.

##### 1. Ignore it, use dispatch

When you omit it, dispatch will be automatically attached to the container, you can call it directly in the component.

```js
this.props.dispatch(loadCourses)
```

Downsides

1. Requires more boilerplate code
2. Child components will have to refer to redux specific components

##### 2. Manually wrap

The child components will automatically get properties, they dont have to know about redux.

```js
//In component
this.props.loadCourses()

// definition
function mapDispatchToProps(dispatch){
    return{
        loadCourses: () => {
            dispatch(loadCourses());
        }
    }
}
```

Downsodes

1. Quite redundant

##### 3. Use bindActionCreators

It performs option 2 automatically under the hood. This function ships with Redux. The child components will automatically get properties, they dont have to know about redux.

```js
//In component
this.props.actions.loadCourses();

//Definition
function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(actions, dispatch)
    };
}
```

### Reselect Memoize

A library that cache data call to / from _store_, this will improve performance if a big list is being processed in the component.

### Libraries to handle Async

There are  3 most popular libraries.

#### 1. redux-thunk

Is the most popular library, it is created by the creator of _redux_.

Normally you can only return _objects_ from a function. With _redux-thunk_, you can return _functions_. In _computer science_ a thunk _is a function that wraps an expression in order to delay its evaluation_.

```js
export function deleteAutor(authorId){
    return dispatch => {
        return AuthorApi.deleteAuthor(authorId).then(() => {
            dispatch(deletedAuthor(authorId));
        }).catch(handleError);
    };
}
```

#### 2. redux-promise

Least popular library for handling async requests, it is quite new library. It brings good conventions into redux.

#### 3. redux-saga

It uses _ES6_ library and defines a _domain driven convention_ to access data.

#### Thunks vs Sagas

Thunks | Sagas
-------|------
Actions can return functions instead of objects. A thunk wraps asynchronous operation in a function | You handle async operations through generators. _Generators_ are the function that can be paused and resumed later. Generator can contain multiple _yield_ statements. At each _yield_ generator can pause.
Thunks a re clunky to test, you have mock api calls, no easy hook to each individual step | Easy to test
Simple, learning is easy | hard to learn, Saga has a bigger API compared to thunk
