# Exceptional

Handy error class for easier error handling

## Overview

This package is intended to simplify creating custom error classes in JavaScript. Due to some quirky behavior when 
extending native JS types operations like `instanceof` and inheritance no longer function as expected.

The AbstractError class included in this library handles the extension of the native JS Error class for you, as well as, 
working around most of the quirks that can be experienced when extending native types.

## Usage

Basic usage

```typescript
import AbstractError from '@egb/exceptional';

class MyCustomError extends AbstractError { }

const myError = new MyCustomError('Error message');

myError instanceof MyCustomError; // returns true
myError instanceof AbstractError; // returns true
myError instanceof Error; // returns true

myError.name; // contains name "MyCustomerError"
myError.message // contains message "Error message" passed to native JS Error
myError.stack; // contains stacktrace (MyCustomError: Error Message\n ...)
```
