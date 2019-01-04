import { add } from "./App";
import React from "react";
//import { shallow } from "enzyme";

test('Adding numbers', () => {
    expect(add(4,6)).toBe(10);
});

const sum = require('./ForTesting');

test("Fake Test", () => {
    expect(true).toBeTruthy();
});

console.log(sum(2, 2));

test("Fake Test II", () => {
    expect(true).toBeFalsy();
});