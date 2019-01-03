//import { add } from "./App";

const sum = require('./ForTesting');

test("Fake Test", () => {
    expect(true).toBeTruthy();
});

console.log(sum(2, 2));

test("Fake Test II", () => {
    expect(true).toBeFalsy();
});