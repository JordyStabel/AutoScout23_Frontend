import { add } from "./App";
import React from "react";
import { shallow } from "enzyme";
import Header from "./Layouts/Header";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('Header', () => {
    test('Rendering header', () =>{
        const wrapper = shallow(
            <Header/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

test('Adding numbers', () => {
    expect(add(4,6)).toBe(10);
});

test("Fake Test", () => {
    expect(true).toBeTruthy();
});

test("Fake Test II", () => {
    expect(false).toBeFalsy();
});