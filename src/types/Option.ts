import type { Draft, } from 'mutative';
import type { ActRecord, } from './ActRecord';
import type { CreateActsProps, } from './CreateActsProps';
import type { History, } from './History';
import type { HistoryState, } from './HistoryState';
import type { Immutable, } from './Immutable';
import type { MutOptions, } from './MutOptions';
import type { DS, } from './DS';

export type Option<
	S extends DS,
	AR extends ActRecord,
	MO extends MutOptions = MutOptions,
> = {
	/**
	 * Optional factory function for creating action handlers and state transformations.
	 *
	 * @template S - The state type
	 * @template AR - The action record type
	 * @param {CreateActsProps<S>} props - Accessing state {@link CreateActsProps setters and getters}
	 * @returns Record of keys with {@link ActRecord sync and async functions}
	 * @example
	 * ```ts
	 * const options = {
	 *   acts: (controls) => ({
	 *     increment: () => controls.set(({ draft }) => {
	 *       draft.count += 1
	 *     }),
	 *     addItem: (item) => controls.set(['items'], ({ draft }) => {
	 *       draft.push(item)
	 *     })
	 *   })
	 * }
	 * ```
	 */
	acts?: ( props: CreateActsProps<S> ) => AR
	/**
	 * Post-change callback function executed after state changes are applied.
	 * Provides access to the updated history state and previous values.
	 *
	 * @template S - The state type
	 * @param {Immutable<History<S>>} history - The updated immutable history state
	 * @returns {Promise<void> | void} Optional promise if async operations needed
	 *
	 * @example
	 * ```ts
	 * const options = {
	 *   afterChange: (history) => {
	 *     console.log('State updated:', history.state)
	 *     console.log('Previous state:', history.prev)
	 *     localStorage.setItem('appState', JSON.stringify(history.state))
	 *   }
	 * }
	 * ```
	 *
	 * @example
	 * ```ts
	 * const options = {
	 *   afterChange: ({ state, prev, initial }) => {
	 *     if (state.count !== prev?.count) {
	 *       analytics.track('count_changed', {
	 *         from: prev?.count,
	 *         to: state.count,
	 *         initial: initial.count
	 *       })
	 *     }
	 *   }
	 * }
	 * ```
	 * @example
	 * ```ts
	 * const options = {
	 *   afterChange: async (history) => {
	 *     // Async operations
	 *     await api.saveState(history.state)
	 *     await db.recordChanges(history.changes)
	 *     await notifications.send({
	 *       type: 'state_updated',
	 *       data: history.state
	 *     })
   *   }
	 * }
	 * ```
	 */
	afterChange?: (
		history: Immutable<History<S>>,
	) => Promise<void> | void
	/**
	 * Additional mutation options that can be passed to control state updates.
	 * Allows customizing how mutations are handled and processed.
	 *
	 * @template MO - Mutation options type
	 * @property {MO} mutOptions - Configuration options for mutations
	 *
	 * @example
	 * ```ts
	 * const options = {
	 *   mutOptions: {
	 *     freeze: true, // Freeze objects after mutations
	 *     strict: true, // Enforce strict mode for mutations
	 *   }
	 * }
	 * ```
	 */
	mutOptions?: MO
	/**
	 * Transform function to modify state before it's committed to history.
	 * Enables validation, normalization, or transformation of state updates.
	 *
	 * @template S - The state type
	 * @param {Draft<HistoryState>} draft - Mutable draft of the {@link HistoryState history state}
	 * @param {History} history - Current immutable {@link History history}
	 * @param {'set' | 'reset'} type - The type ('set' | 'reset') of operation being performed
	 *
	 * @example
	 * ```ts
	 * const options = {
	 *   transform: (draft) => {
	 *     // Ensure count never goes negative
	 *     draft.state.count = Math.max(0, draft.state.count)
	 *     // Format all names to title case
	 *     draft.state.users.forEach(user => {
	 *       user.name = user.name.split(' ')
	 *         .map(w => w[0].toUpperCase() + w.slice(1))
	 *         .join(' ')
	 *     })
	 *   }
	 * }
	 *```
	 * @example
	 * ```ts
	 * const options = {
	 *   transform: (draft) => {
	 *     // Add timestamps to all updates
	 *     draft.state.lastModified = Date.now()
	 *     // Maintain sorted order of items
	 *     draft.state.items.sort((a, b) => a.priority - b.priority)
	 *   }
	 * }
	 * ```
	 */
	transform?: ( draft: Draft<HistoryState<S>>, history: History<S>, type: 'set' | 'reset' ) => void
};
