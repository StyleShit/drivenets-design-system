import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import { unwrapExpression } from './unwrap-expression';

type PropertyValue = TSESTree.Property['value'];

type Args<T extends PropertyValue> = {
	obj: TSESTree.ObjectExpression;
	name: string;
	predicate?: (value: TSESTree.Node) => value is T;
};

export type ObjectPropertyResult<T extends PropertyValue> = {
	node: TSESTree.Property;
	value: T;
};

/**
 * Get an object property by name and optional value predicate.
 *
 * Returns the property node and the unwrapped value (see {@link unwrapExpression}).
 */
export function getObjectProperty<T extends PropertyValue = PropertyValue>(
	args: Args<T>,
): ObjectPropertyResult<T> | null {
	const { obj, name, predicate = () => true } = args;

	const property = obj.properties.find((property) => {
		return (
			property.type === AST_NODE_TYPES.Property &&
			property.key.type === AST_NODE_TYPES.Identifier &&
			property.key.name === name &&
			predicate(unwrapExpression(property.value))
		);
	}) as TSESTree.Property | null;

	if (!property) {
		return null;
	}

	return {
		node: property,
		value: unwrapExpression(property.value) as T,
	};
}
