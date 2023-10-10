import React, { createContext, useState } from 'react'
import TreeviewItemChild, {
	TreeViewItemChildProps,
} from '@/components/treeview/components/TreeViewItemChild'
import { TreeViewItemDataType } from '@/helpers/types'
import LugatButton from '@/components/form/LugatButton'

const TreeviewItemContextDefaultValues = {
	open: false,
	toggle: () => {},
}
const TreeviewItemContext = createContext<{
	open: boolean
	toggle: Function
}>(TreeviewItemContextDefaultValues)

export type TreeViewItemComposition = {
	Child: React.FC<TreeViewItemChildProps>
}

type TreeviewItemChildrenFunctionType = {
	open: boolean
	toggle: Function
}

export type TreeviewItemProps = {
	children?:
		| React.ReactNode
		| React.ReactNode[]
		| (({ open, toggle }: TreeviewItemChildrenFunctionType) => React.ReactNode | React.ReactNode[])
}

const TreeviewItem: React.FC<TreeviewItemProps> & TreeViewItemComposition = (props) => {
	const [open, setOpen] = useState(false)
	if (typeof props.children == 'function') {
		return (
			<TreeviewItemContext.Provider value={TreeviewItemContextDefaultValues}>
				{props.children({ open, toggle: () => setOpen((prev) => !prev) })}
			</TreeviewItemContext.Provider>
		)
	}
	return (
		<TreeviewItemContext.Provider value={TreeviewItemContextDefaultValues}>
			{props.children}
		</TreeviewItemContext.Provider>
	)
}

TreeviewItem.Child = TreeviewItemChild
export default TreeviewItem
