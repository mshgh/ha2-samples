# Counter
as a module based on https://github.com/zaceno/hyperapp-map approach

## version 6 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v6/index.html)

- cleaner way to handle initial state for modules
  - every module returns its initial state including inital states of all nested modules
  - all top level modules add their initial state into single global object which is exported as `init` from modules.js

## version 5 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v5/index.html)

- modules implementation changed
  - renaming module.js => modules.js
  - namespace module moved into modules.js and exported as **ns**
  - initial state is now exported from modules.js as **init** and it is a global shared instance **mutated** every time new module is created
- added support for navigation (as re-usable module)

## version 4 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v4/index.html)

- complete rewrite of modules support implementation
- implementation of module **Namespace** with usage example

## version 3 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v3/index.html)

- added PositiveCounter
  - as an extension to Counter
  - example how to use *intercept* to alter child module functionality

## version 2 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v2/index.html)

- counter as a module

## version 1 [see](https://rawcdn.githack.com/mshgh/ha2-samples/counter-map-v1/index.html)

- copy of sample from [CodePen](https://codepen.io/zaceno/pen/ExxdzJZ) with `JSX -> h()` transformation
