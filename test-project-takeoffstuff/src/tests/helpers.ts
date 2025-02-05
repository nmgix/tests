import Enzyme from "enzyme";

export const findTestNode = (wrapper: Enzyme.ShallowWrapper, searchString: string) => {
  return wrapper.find(`[data-test="${searchString}"]`);
};
