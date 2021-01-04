import React from "react";
import { shallow } from "enzyme";
import TagItem from "./TagItemStatic";

describe("TagItem", () => {
  it("should render without crashing", () => {
    shallow(<TagItem />);
  });
});
