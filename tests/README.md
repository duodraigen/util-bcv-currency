# Test Suite

Tests will be continuously added for each new currency getter method. Workflow must be implemented as follows:

1. Create a file named \<method-name-or-related\>.test.ts

2. Import the library with `import { \<method-name\>, type \<type-name-if-exists\> } from "../"`

3. Use `describe` test function to describe test suite file objective like *get the currency value of yen on different banks*

4. Define (at least) the following test cases:
- Avoid getting NaN
- get the value of \<currency\> from \<the-source\>

5. Run the test with `yarn run test`

**NOTE**: Expected test results will be susceptible to changes due the constant currency value changes.

If you want to re run the tests, please read this and make sure the currency values are properly updated and fixed (replace the "," character for the "." one)