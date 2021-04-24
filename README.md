# React Use Pagination

This package enables one to paginate through an array of objects.

## Installation

```
yarn add use-pagination-hook
```

Or 

```
npm i use-pagination-hook
```

## How to use

The `use-pagination` hook takes two parameters, an array of all items, and a size that dictates how many items are returned

```
 import React from "react'
 import { usePagination } from 'use-pagination-hook'

 const ExampleComponent = () => {
   const { current, pages, display, next, previous } = usePagination({ items: props.items, size: props.size });

   return (
     <>
       <p>Currently on page {current} of {pages}</p>
       <ul>
        {display.map(row => {
          <li>{row}</li> 
       })}
       </ul>
       <button onClick={next}>Next Page</button>
       <button onClick={previous}>Previous Page</button>
       <p>{count}</p>
     </>
    )
  }
```

## Development commands

```
 // watch
 yarn start

 // or
 npm run start
```

```
 // builds the dist folder
 yarn build

 // or
 npm run build
```

```
 // starts tests
 yarn test

 // or

 npm run test
```

## Local testing and yarn link

To locally test the package, do the following:

Let's assume your CRA is "my-app".

Let's also assume they are in one workspace.

```
workspace
  - use-pagination
  - my-app
```

a) in hook folder, run
```
yarn link
```
b) assuming you have a workspace, create a sample CRA app 
```
npx create-react-app my-app
```
c) navigate to your CRA app folder
```
cd my-app
```
d) run command
```
 yarn link use-pagination
```
e)  In your CRA app, you can now use the package, as it's linked locally 
```
  import { usePagination } from 'use-pagination';
```

f) However, this will give you an error due to different copy of React and in CRA app. 
   To counter that let's assume that we have workspace
```
workspace
  - use-pagination
  - my-app
```
  We navigate to use-pagination and type (this will link the React versions locally). 
  
  Please amend the path to your needs.
  ```
   npm link ../my-app/node_modules/react
  ```
  We should be good to go to work locally. 