import type { CreateConSubLisReturn, } from '../types/createConSubLisReturn';
import type { ActRecord, } from '../types/ActRecord';
import type { DS, } from '../types/DS';
import type { GetSnapshot, } from '../types/GetSnapshot';
import type { Option, } from '../types/Option';
import createCon from './createCon';

export default function createConSubLis<
	S extends DS,
	AR extends ActRecord,
>(
	initial: S,
	getSnapshot: GetSnapshot<S, AR>,
	options?: Option<S, AR>,
): CreateConSubLisReturn<S, AR, ReturnType<typeof getSnapshot>> {
	const estado = createCon(
		initial,
		{
			...options,
			dispatcher( nextHistory, ) {
				const snapshot = getSnapshot( nextHistory, );
				listeners.forEach( listener => listener( snapshot, ), );
			},
		},
	);
	const listeners: CreateConSubLisReturn<S, AR, ReturnType<typeof getSnapshot>>['listeners'] = new Set();
	const subscribe: CreateConSubLisReturn<S, AR, ReturnType<typeof getSnapshot>>['subscribe'] = ( listener, ) => {
		listeners.add( listener, );
		return () => {
			listeners.delete( listener, );
		};
	};

	return {
		...estado,
		subscribe,
		listeners,
	};
}
