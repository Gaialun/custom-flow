import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import type { ButtonProps } from "antd/es/button/button"

import { Button } from "antd"

export type IconButtonProps = {
  Icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>>
  selected?: boolean
} & Omit<ButtonProps, "icon">

export function IconButton(props: IconButtonProps) {
  const { Icon, selected, ...rest } = props

  return <Button icon={<Icon />} type={selected ? "primary" : "default"} {...rest} />
}