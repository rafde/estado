import type { DS, } from '../types/DS';
import type { History, } from '../types/History';

export default function createHistory<
	S extends DS,
>( history: Omit<Partial<History<S>>, 'initial'> & { initial: S }, ): History<S> {
	const {
		changes = undefined,
		initial,
		state = initial,
		prev = undefined,
		prevInitial = undefined,
	} = history;
	return {
		changes,
		initial,
		prev,
		prevInitial,
		state,
	};
}
