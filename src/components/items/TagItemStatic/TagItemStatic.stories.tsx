import React from "react";
import { storiesOf } from "@storybook/react";
import { text, object, color, dom, array } from "@storybook/addon-knobs";

import TagItem from "./TagItemStatic";

storiesOf("newComponents/TagItemStatic", module).add("Default", () => (
  <TagItem />
));
