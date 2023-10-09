import React, { createContext, useEffect, useState } from 'react'
import TreeviewItem, {
	TreeViewItemComposition,
	TreeviewItemProps,
} from '@/components/treeview/components/TreeViewItem'
import { TreeViewItemDataType } from '@/helpers/types'

const TreeviewContextValues = {
	data: [],
}

const TreeviewContext = createContext<{ data: TreeViewItemDataType[] }>(TreeviewContextValues)

type TreeviewProps = {
	children?:
		| React.ReactNode
		| React.ReactNode[]
		| ((name: string) => React.ReactNode | React.ReactNode[])
	loadFn?: () => Promise<TreeViewItemDataType[]>
}
type TreeviewCompositionProps = {
	Item: React.FC<TreeviewItemProps> & TreeViewItemComposition
}

const Treeview: React.FC<TreeviewProps> & TreeviewCompositionProps = (props) => {
	const [data, setData] = useState<TreeViewItemDataType[]>([])

	useEffect(() => {
		if (props.loadFn) {
			props.loadFn().then((res) => {
				setData(res)
			})
		}
	}, [])

	if (typeof props.children == 'function') {
		return (
			<TreeviewContext.Provider value={TreeviewContextValues}>
				{props.children('test')}
			</TreeviewContext.Provider>
		)
	}
	return (
		<TreeviewContext.Provider value={TreeviewContextValues}>
			<ul>
				{data.map((item, index) => (
					<Treeview.Item
						key={index}
						value={item.value}
						label={item.label}
						data={item.childrens}
					/>
				))}
			</ul>
		</TreeviewContext.Provider>
	)
}
Treeview.Item = TreeviewItem

export default Treeview
