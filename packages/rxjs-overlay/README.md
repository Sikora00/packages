# rxjs-overlay

![npm](https://img.shields.io/npm/v/@sikora00/rxjs-overlay)
[![Build Status](https://travis-ci.org/Sikora00/rxjs-overlay.svg?branch=master)](https://travis-ci.org/Sikora00/rxjs-overlay)
![npm](https://img.shields.io/npm/dw/@sikora00/rxjs-overlay)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/sikora00/rxjs-overlay/rxjs)

# New observables:

- spawn (return an observable which emits onece at the end of the command life and a function which spawn the command)

# New operators:

- filterFalsy alias for the `filter(Boolean)` operator
- (deprecated) ngUnsubscribe (complete observable on ngOnDestroy)
