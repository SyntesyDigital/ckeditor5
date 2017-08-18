/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewPosition from './position';
import ViewTreeWalker from './treewalker';

/**
 * Contains utility functions for working on view.
 *
 * @module engine/view/utils
 */

/**
 * For given {@link module:engine/view/text~Text view text node}, it finds previous or next sibling that is contained
 * in the same container element. If there is no such sibling, `null` is returned.
 *
 * @param {module:engine/view/text~Text} node Reference node.
 * @param {Boolean} getNext If `true` next touching sibling will be returned. If `false` previous touching sibling will be returned.
 * @returns {module:engine/view/text~Text|null} Touching text node or `null` if there is no next or previous touching text node.
 */
export function getTouchingTextNode( node, getNext ) {
	const treeWalker = new ViewTreeWalker( {
		startPosition: getNext ? ViewPosition.createAfter( node ) : ViewPosition.createBefore( node ),
		direction: getNext ? 'forward' : 'backward'
	} );

	for ( const value of treeWalker ) {
		if ( value.item.is( 'containerElement' ) ) {
			// ViewContainerElement is found on a way to next ViewText node, so given `node` was first/last
			// text node in it's container element.
			return null;
		} else if ( value.item.is( 'text' ) ) {
			// Found a text node in the same container element.
			return value.item;
		}
	}

	return null;
}
