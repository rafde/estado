import type { EstadoDS, } from '../types/EstadoDS';
import type { EstadoHistory, } from '../types/EstadoHistory';
import type { StateArrayPathProps, } from '../types/EstadoSetters';
import type { NestedObjectKeys, } from '../types/NestedObjectKeys';
import type { StringPathToArray, } from '../types/StringPathToArray';
import getDeepValueParentByArray from './getDeepValueParentByArray';

export default function createArrayPathProxy<
	State extends EstadoDS,
	TargetState extends object,
>( targetState: TargetState, history: EstadoHistory<State>, arrayPath: string[], ) {
	return new Proxy(
		{
			...history,
			draft: targetState,
		} as StateArrayPathProps<State, EstadoDS, StringPathToArray<NestedObjectKeys<EstadoDS>>>,
		{
			get( target, prop, ) {
				if ( prop in target ) {
					return Reflect.get( target, prop, );
				}
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
					default:
						return Reflect.get( target, prop, );
				}
			},
		},
	);
}
