import type { UpdateNodeOptionsParams } from './hook'

import { useEffect } from 'react'
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined } from '@ant-design/icons'
import { Button, ColorPicker, Divider, InputNumber } from 'antd'

import { IconButton } from '/@/libs'
import { useFlowStore } from '/@/store'
import { getValueIfInequality } from '/@/utils'

import { useNodeOptions } from './hook'

export function AddNode() {
  const { addNode } = useFlowStore()
  return <Button onClick={addNode}>新增节点</Button>
}

export function RemoveNode() {
  const { selectedNodes, removeSelectedNode } = useFlowStore()

  return <Button disabled={!selectedNodes.size} onClick={removeSelectedNode}>移除节点</Button>
}

export function ClearAllNodes() {
  const { nodes, clearAllEdges, clearAllNodes } = useFlowStore()
  return (
    <Button
      disabled={!nodes.length}
      onClick={() => {
        clearAllEdges()
        clearAllNodes()
      }}>
      清空画布
    </Button>
  )
}

export function NodeOptions() {
  const { nodeStyle: defaultStyle, focusNode, setNodeStyle, setNodesStyle } = useFlowStore()
  const { nodeStyleOptions, setNodeStyleOptions, reset } = useNodeOptions(defaultStyle)
  const { width, height, label, border, padding, backgroundColor } = nodeStyleOptions

  const handleChange = (options: UpdateNodeOptionsParams) => {
    setNodeStyle(setNodeStyleOptions(options))
  }

  useEffect(() => {
    reset()
  }, [focusNode?.id])
  return (
    <div className="options-container">
      <b className="options-title">外观</b>
      <div className='options-item'>
        <label>宽度(width)：</label>
        <InputNumber suffix="px" value={width} onChange={(width) => {
          if (width === null || width < 1) return
          handleChange(({ width }))
        }} />
      </div>
      <div className='options-item'>
        <label>高度(height)：</label>
        <InputNumber suffix="px" value={height} onChange={(height) => {
          if (height === null || height < 1) return
          handleChange({ height })
        }} />
      </div>
      <div className='options-item'>
        <label>背景色：</label>
        <ColorPicker value={backgroundColor}
          showText={(color) => <span>{color.toHexString()}</span>}
          onChangeComplete={(color) => {
            handleChange({ backgroundColor: color.toHexString() })
          }} />
      </div>
      <div className='options-item'>
        <label>内边距：</label>
        <InputNumber suffix="px" value={padding} onChange={(padding) => {
          if (padding === null || padding < 0) return
          handleChange({ padding })
        }} />
      </div>
      <Divider />
      <b className="options-title">文本</b>
      <div className='options-item'>
        <label>大小：</label>
        <InputNumber suffix="px" value={label.fontSize} onChange={(fontSize) => {
          if (fontSize === null) return
          handleChange({ label: { fontSize: Math.max(fontSize, 12) } })
        }} />
      </div>
      <div className='options-item'>
        <label>颜色：</label>
        <ColorPicker value={label.color}
          showText={(color) => <span>{color.toHexString()}</span>}
          onChangeComplete={(color) => {
            handleChange({ label: { color: color.toHexString() } })
          }} />
      </div>
      <div className="button-group">
        <IconButton
          Icon={BoldOutlined}
          selected={label.fontStyle === "bold"}
          onClick={() => {
            handleChange({ label: { fontStyle: getValueIfInequality(label.fontStyle, "bold") } })
          }}
        />
        <IconButton
          Icon={ItalicOutlined}
          selected={label.fontStyle === "italic"}
          onClick={() => handleChange({ label: { fontStyle: getValueIfInequality(label.fontStyle, "italic") } })}
        />
        <IconButton
          Icon={StrikethroughOutlined}
          selected={label.fontStyle === "line-through"}
          onClick={() => handleChange({ label: { fontStyle: getValueIfInequality(label.fontStyle, "line-through") } })}
        />
      </div>
      <Divider />
      <b className="options-title">边框</b>
      <div className='options-item'>
        <label>宽度：</label>
        <InputNumber suffix="px" value={border.width} onChange={(width) => {
          if (width === null || width < 1) return
          handleChange({ border: { width } })
        }} />
      </div>
      <div className='options-item'>
        <label>颜色：</label>
        <ColorPicker
          value={border.color}
          showText={(color) => <span>{color.toHexString()}</span>}
          onChangeComplete={(color) => {
            handleChange({ border: { color: color.toHexString() } })
          }}
        />
      </div>
      <div className='options-item'>
        <label>圆角：</label>
        <InputNumber suffix="px" value={border.radius} onChange={(radius) => {
          if (radius === null || radius < 0) return
          handleChange({ border: { radius } })
        }} />
      </div>
      <Divider />
      <Button onClick={() => {
        setNodesStyle(defaultStyle)
      }}>应用于全部节点</Button>
    </div>
  )
}