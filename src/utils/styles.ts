import type { INodeOptions, INodeStyle } from "../components"

import { getValidValue } from "./value"


export const nodeStyle2Options = (defaultStyle: INodeStyle): INodeOptions => {
  return {
    padding: defaultStyle.padding,
    width: defaultStyle.width,
    height: defaultStyle.height,
    backgroundColor: defaultStyle.backgroundColor,
    label: {
      color: defaultStyle.color,
      fontSize: defaultStyle.fontSize,
      fontStyle: defaultStyle.fontStyle ?? defaultStyle.fontWeight ?? defaultStyle.textDecoration
    },
    border: {
      color: defaultStyle.borderColor,
      width: defaultStyle.borderWidth,
      style: defaultStyle.borderStyle,
      radius: defaultStyle.borderRadius,
    }
  }
}

export const nodeOptions2Style = (options: INodeOptions): INodeStyle => {
  const labelOptions = options.label
  const borderOptions = options.border
  return {
    padding: options.padding,
    width: options.width,
    height: options.height,
    fontSize: labelOptions.fontSize,
    backgroundColor: options.backgroundColor,
    fontStyle: getValidValue(labelOptions.fontStyle, "italic"),
    fontWeight: getValidValue(labelOptions.fontStyle, "bold"),
    textDecoration: getValidValue(labelOptions.fontStyle, "line-through"),
    color: labelOptions.color,
    borderWidth: borderOptions.width,
    borderColor: borderOptions.color,
    borderRadius: borderOptions.radius,
    borderStyle: borderOptions.style
  }
}