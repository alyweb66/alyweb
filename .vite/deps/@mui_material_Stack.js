import {
  useDefaultProps
} from "./chunk-AIZVQEV2.js";
import {
  createStack,
  generateUtilityClasses,
  styled_default
} from "./chunk-6LCDYKL7.js";
import {
  require_prop_types
} from "./chunk-PHFSEZYT.js";
import "./chunk-RGNGTCU6.js";
import "./chunk-6H6IX42F.js";
import "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/Stack/Stack.js
var import_prop_types = __toESM(require_prop_types());
var Stack = createStack({
  createStyledComponent: styled_default("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (props, styles) => styles.root
  }),
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiStack"
  })
});
true ? Stack.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types.default.object]),
  /**
   * Add an element between each child.
   */
  divider: import_prop_types.default.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: import_prop_types.default.bool
} : void 0;
var Stack_default = Stack;

// node_modules/@mui/material/Stack/stackClasses.js
var stackClasses = generateUtilityClasses("MuiStack", ["root"]);
var stackClasses_default = stackClasses;
export {
  Stack_default as default,
  stackClasses_default as stackClasses
};
//# sourceMappingURL=@mui_material_Stack.js.map
