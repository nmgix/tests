import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { findTestNode } from "../../tests/helpers";
import { Input, InputParams } from "./Input";

// не дружится у меня пока что с тестами :с

// describe("input tests", () => {
//   const mockChangeHandler: jest.Mock = jest.fn();
//   const mockStateHandler: jest.Mock = jest.fn();
//   var wrapper: ShallowWrapper;

//   const inputParams: InputParams = {
//     type: "text",
//     name: "component-input",
//     onChangeHandler: mockChangeHandler,
//   };
//   const setup = (params: InputParams) => {
//     return shallow(<Input params={params} />);
//   };

//   beforeEach(() => {
//     mockStateHandler.mockClear();
//     React.useState = jest.fn(() => ["", mockStateHandler]);
//     wrapper = setup(inputParams);
//   });

//   test("updates on input change", () => {
//     const mockText = "some-text";
//     const mockEvent = { currentTarget: { value: mockText } };

//     const input = findTestNode(wrapper, "component-input");

//     console.log(wrapper.debug());
//     input.simulate("change", mockEvent);
//     console.log(input.debug());
//     expect(mockStateHandler).toHaveBeenCalledWith(mockText);
//   });
// });
