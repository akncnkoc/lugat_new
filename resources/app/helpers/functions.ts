import { VariantDataType } from '@/types/variant-types'

interface VariantItem {
	parent_id: string
	name: string
	id: string
}

// Function to group data by a specified key
function groupBy(key: string, data: VariantItem[]): Record<string, VariantItem[]> {
	const result: Record<string, VariantItem[]> = {}

	data.forEach((item: any) => {
		const groupKey = item.hasOwnProperty(key) ? item[key] : ''
		if (!result[groupKey]) {
			result[groupKey] = []
		}
		result[groupKey].push(item)
	})

	return result
}

// Function to generate all possible combinations of variant texts
function getAllVariantCombinations(
	variantGroups: VariantItem[][],
): { combination: string; variant_ids: string[] }[] {
	const combinations: { combination: string; variant_ids: string[] }[] = []

	function generateCombinations(index: number, currentCombination: string, variant_ids: string[]) {
		if (index === variantGroups.length) {
			combinations.push({ combination: currentCombination.trim(), variant_ids })
			return
		}

		for (const variant of variantGroups[index]) {
			const updatedCombination = `${currentCombination} ${variant.name}`
			const updatedVariantIds = [...variant_ids, variant.id]
			generateCombinations(index + 1, updatedCombination, updatedVariantIds)
		}
	}

	generateCombinations(0, '', [])
	return combinations
}

// Function to get a variant preview
export function getVariantPreview(
	productName: string,
	variantGroups: VariantItem[],
): Array<{ name: string; variants: string[] }> {
	const variantGroupedByParentId = groupBy('parent_id', variantGroups)
	const variantArrays: VariantItem[][] = Object.values(variantGroupedByParentId)
	const variantCombinations = getAllVariantCombinations(variantArrays)

	return variantCombinations.map((combination) => ({
		name: `${productName} ${combination.combination}`,
		variants: combination.variant_ids,
	}))
}

export function flattenArray(arr: any[]): any[] {
	let flattened: any[] = []

	function recursiveFlatten(subArray: any[]) {
		for (let i = 0; i < subArray.length; i++) {
			if (Array.isArray(subArray[i])) {
				recursiveFlatten(subArray[i])
			} else {
				flattened.push(subArray[i])
			}
		}
	}

	recursiveFlatten(arr)
	return flattened
}

interface MappedVariantType {
	label: string;
	value: string;
	childrens: MappedVariantType[];
}

export const recursiveMappingForVariantType = (variants: VariantDataType[]): MappedVariantType[] => {
	return variants.map((variant: VariantDataType) => ({
		label: variant.name,
		value: variant.id,
		childrens: variant.childrens ? recursiveMappingForVariantType(variant.childrens) : [],
	}));
};
