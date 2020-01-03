# Counter
as a module based on https://github.com/zaceno/hyperapp-map approach

## version 6 [WIP]

- version 6pre1 [see](https://rawcdn.githack.com/mshgh/ha2-samples/41fb843359c8e9e21c32e56e356913d09402523b/index.html)
  - cleaner way how to handle initial state for modules
    - every module returns its initial state including inital states of all nested modules
    - there is no top level `init` shared by all modules; consumer of modules is responsible for building of the initial state
- version 6pre2 [see](https://rawcdn.githack.com/mshgh/ha2-samples/2b990cd6ef159433fa9117d1be3fc2603359f341/index.html)
  - initial support for dynamically added modules
    - **MultiCounter** module added with `add()` function implemented
    - `add()` is called during application start to simulate dynamic behaviour
    - added counters are present in **Counters** a **Settings** pages, but not working (actions not supported yet)
- version 6pre3 [see](https://rawcdn.githack.com/mshgh/ha2-samples/f569841138a383b312dd50d8bfe1bd624cf049eb/index.html)
  - support to dynamically add counters implemented
  - TODO: delete dynamically added counter(s)
- version 6pre4 [see](https://rawcdn.githack.com/mshgh/ha2-samples/00d647d2d4890797e675138cb111573800404e0d/index.html)
  - support to delete dynamically added counters implemented
- version 6pre5 [see](https://rawcdn.githack.com/mshgh/ha2-samples/def0c3eabf0c2fddb7f0686c1d3bdf83d5a2f240/index.html)
  - structure of state adjusted to contain array defining order and sequence to assign unique ids
- version 6pre5 [see](https://rawcdn.githack.com/mshgh/ha2-samples/def0c3eabf0c2fddb7f0686c1d3bdf83d5a2f240/index.html)
  - generic support for array of Modules moved to lib/modules.js

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
