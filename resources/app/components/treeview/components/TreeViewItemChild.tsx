import React from 'react'

export type TreeViewItemChildProps = {
  children?: React.ReactNode | React.ReactNode[]
}

const TreeviewItemChild: React.FC<TreeViewItemChildProps> = (props) => {
  return props.children
}
export default TreeviewItemChild
