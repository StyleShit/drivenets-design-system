import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { resolveDefaultExport } from './resolve-default-export';
import { unwrapExpression } from './unwrap-expression';

/**
 * Resolve the meta object of a story file either from a variable declaration or an inline export default:
 *
 * ```ts
 * const meta = {...};
 * export default meta;
 * ```
 * or
 * ```ts
 * export default {...};
 * ```
 */
export function resolveStoryMeta(
	context: RuleContext<string, readonly unknown[]>,
	declaration: TSESTree.DefaultExportDeclarations,
): TSESTree.ObjectExpression | null {
	const expression = resolveDefaultExport(context, unwrapExpression(declaration));

	return asObjectExpression(unwrapExpression(expression));
}

function asObjectExpression(node: TSESTree.Node | null): TSESTree.ObjectExpression | null {
	return node?.type === AST_NODE_TYPES.ObjectExpression ? node : null;
}
