import type { ArrayPathDraftProps, } from '../types/ArrayPathDraftProps';
import type { DS, } from '../types/DS';
import type { EstadoHistory, } from '../types/EstadoHistory';
import type { NestedObjectKeys, } from '../types/NestedObjectKeys';
import type { StringPathToArray, } from '../types/StringPathToArray';
import getDeepValueParentByArray from './getDeepValueParentByArray';

export default function createArrayPathProxy<
	State extends DS,
	TargetState extends object,
>(
	targetState: TargetState,
	history: EstadoHistory<State>,
	arrayPath: string[],
	stateProp?: string,
) {
	return new Proxy(
		{
			...history,
			draft: targetState,
		} as ArrayPathDraftProps<State, DS, StringPathToArray<NestedObjectKeys<DS>>>,
		{
			get( target, prop, ) {
				switch ( prop ) {
					case 'changesProp': {
						const [
							prop,
						] = getDeepValueParentByArray( history.changes, arrayPath, );
						target.changesProp = prop as never;
						return prop;
					}
					case 'initialProp': {
						const [
							prop,
						] = getDeepValueParentByArray( history.initial, arrayPath, );
						target.initialProp = prop as never;
						return prop;
					}
					case 'priorInitialProp': {
						const [
							prop,
						] = getDeepValueParentByArray( history.priorInitial, arrayPath, );
						target.priorInitialProp = prop as never;
						return prop;
					}
					case 'priorStateProp': {
						const [
							prop,
						] = getDeepValueParentByArray( history.priorState, arrayPath, );
						target.priorStateProp = prop as never;
						return prop;
					}
					case 'stateProp': {
						const [
							prop,
						] = getDeepValueParentByArray( history.state, arrayPath, );
						target.stateProp = prop as never;
						return prop;
					}
					case 'draft': {
						if ( typeof stateProp !== 'undefined' ) {
							return Reflect.get( target.draft, stateProp, );
						}
						return Reflect.get( target, prop, );
					}
					default:
						return Reflect.get( target, prop, );
				}
			},
			set( target, prop, value, ) {
				if ( prop === 'draft' && typeof stateProp !== 'undefined' ) {
					return Reflect.set( target.draft, stateProp, value, );
				}
				return false;
			},
		},
	);
}
