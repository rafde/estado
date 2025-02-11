import type { Draft, } from 'mutative';
import type { DS, } from './DS';
import type { EstadoHistory, } from './EstadoHistory';
import type { GetArrayPathValue, } from './GetArrayPathValue';
import type { GetStringPathValue, } from './GetStringPathValue';
import type { Immutable, } from './Immutable';
import type { NestedRecordKeys, } from './NestedRecordKeys';
import type { StringPathToArray, } from './StringPathToArray';

type NextState<
	S extends DS,
> = Pick<EstadoHistory<S>, 'state' | 'initial'>;

type StringPathProps<
	S extends DS,
	NS extends NextState<S> | S,
	SP extends NestedRecordKeys<NS>,
> = Immutable<
	EstadoHistory<S> & {
		changesProp: GetStringPathValue<NS, SP> | undefined
		initialProp: GetStringPathValue<NS, SP>
		priorInitialProp: GetStringPathValue<NS, SP> | undefined
		priorStateProp: GetStringPathValue<NS, SP> | undefined
		stateProp: GetStringPathValue<NS, SP>
	}> & {
		draft: GetStringPathValue<NS, SP>
	};

type ArrayPathProps<
	S extends DS,
	NS extends NextState<S> | S,
	SP extends StringPathToArray<NestedRecordKeys<NS>>,
> = Immutable<EstadoHistory<S> & {
	changesProp: GetArrayPathValue<NS, SP> | undefined
	initialProp: GetArrayPathValue<NS, SP>
	priorInitialProp: GetArrayPathValue<NS, SP> | undefined
	priorStateProp: GetArrayPathValue<NS, SP> | undefined
	stateProp: GetArrayPathValue<NS, SP>
}> & {
	draft: GetArrayPathValue<NS, SP>
};

type CallbackDraftProps<
	S extends DS,
	NS extends NextState<S> | S,
> = EstadoHistory<S> & Readonly<{
	draft: Draft<NS>
}>;

type SetHistory<
	S extends DS,
	NS extends NextState<S> = NextState<S>,
	RK extends NestedRecordKeys<NS> = NestedRecordKeys<NS>,
> = {
	setHistory(
		nextState: NS | ( (
			props: CallbackDraftProps<S, NS>,
		) => void )
	): EstadoHistory<S>
	setHistory<
		SP extends RK,
	>(
		statePath: SP,
		nextState: GetStringPathValue<NS, SP> | (
			(
				props: StringPathProps<S, NS, SP>
			) => void
		),
	): EstadoHistory<S>
	setHistory<
		SP extends StringPathToArray<RK>,
	>(
		statePath: SP,
		nextState: GetArrayPathValue<NS, SP> | (
			(
				props: ArrayPathProps<S, NS, SP>
			) => void
		),
	): EstadoHistory<S>
};

type CurrySetHistory<
	S extends DS,
	NS extends NextState<S> = NextState<S>,
	RK extends NestedRecordKeys<NS> = NestedRecordKeys<NS>,
> = {
	currySetHistory<
		SP extends RK,
	>( statePath: SP, ): (
		nextState: GetStringPathValue<NS, SP> | (
			(
				props: StringPathProps<S, NS, SP>
			) => void
		)
	) => EstadoHistory<S>
	currySetHistory<
		SP extends StringPathToArray<RK>,
	>( statePath: SP, ): (
		nextState: GetArrayPathValue<NS, SP> | (
			(
				props: ArrayPathProps<S, NS, SP>
			) => void
		)
	) => EstadoHistory<S>
};

type SetHistoryWrap<
	S extends DS,
	NS extends NextState<S> = NextState<S>,
	RK extends NestedRecordKeys<NS> = NestedRecordKeys<NS>,
> = {
	setHistoryWrap<A extends unknown[],>(
		nextState: (
			props: CallbackDraftProps<S, NS>,
			...args: A
		) => void
	): ( ...args: A ) => EstadoHistory<S>
	setHistoryWrap<
		SP extends StringPathToArray<RK>,
		A extends unknown[],
	>(
		statePath: SP,
		nextState: (
			(
				props: ArrayPathProps<S, NS, SP>,
				...args: A
			) => void
		),
	): ( ...args: A ) => EstadoHistory<S>
	setHistoryWrap<
		SP extends RK,
		A extends unknown[],
	>(
		statePath: SP,
		nextState: (
			(
				props: StringPathProps<S, NS, SP>,
				...args: A
			) => void
		),
	): ( ...args: A ) => EstadoHistory<S>
};

type SetState<
	S extends DS,
	RK extends NestedRecordKeys<S> = NestedRecordKeys<S>,
> = {
	set(
		nextState: S | ( (
			props: CallbackDraftProps<S, S>,
		) => void )
	): EstadoHistory<S>
	set<
		SP extends RK,
	>(
		statePath: SP,
		nextState: GetStringPathValue<S, SP> | (
			(
				props: StringPathProps<S, S, SP>
			) => void
			),
	): EstadoHistory<S>
	set<
		SP extends StringPathToArray<RK>,
	>(
		statePath: SP,
		nextState: GetArrayPathValue<S, SP> | (
			(
				props: ArrayPathProps<S, S, SP>
			) => void
			),
	): EstadoHistory<S>
};

type CurrySet<
	S extends DS,
	RK extends NestedRecordKeys<S> = NestedRecordKeys<S>,
> = {
	currySet<
		SP extends NestedRecordKeys<S>,
	>( statePath: SP, ): (
		nextState: GetStringPathValue<S, SP> | (
			(
				props: StringPathProps<S, S, SP>
			) => void
			)
	) => EstadoHistory<S>
	currySet<
		SP extends StringPathToArray<RK>,
	>( statePath: SP, ): (
		nextState: GetArrayPathValue<S, SP> | (
			(
				props: ArrayPathProps<S, S, SP>
			) => void
			)
	) => EstadoHistory<S>
};

type SetWrap<
	S extends DS,
	RK extends NestedRecordKeys<S> = NestedRecordKeys<S>,
> = {
	setWrap<A extends unknown[],>(
		nextState: (
			props: CallbackDraftProps<S, S>,
			...args: A
		) => void
	): ( ...args: A ) => EstadoHistory<S>
	setWrap<
		SP extends StringPathToArray<RK>,
		A extends unknown[],
	>(
		statePath: SP,
		nextState: (
			(
				props: ArrayPathProps<S, S, SP>,
				...args: A
			) => void
		),
	): ( ...args: A ) => EstadoHistory<S>
	setWrap<
		SP extends NestedRecordKeys<S>,
		A extends unknown[],
	>(
		statePath: SP,
		nextState: (
			(
				props: StringPathProps<S, S, SP>,
				...args: A
			) => void
		),
	): ( ...args: A ) => EstadoHistory<S>
};

export type EstadoSetters<
	S extends DS,
> = {
	reset(): EstadoHistory<S>
}
& CurrySet<S>
& CurrySetHistory<S>
& SetHistory<S>
& SetHistoryWrap<S>
& SetState<S>
& SetWrap<S>;
