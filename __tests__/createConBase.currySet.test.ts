import createConBase from '../src/_internal/createConBase';

describe( 'createConBase - currySet', () => {
	it( 'should return a curried set function', () => {
		// Arrange
		const initial = {
			user: {
				name: 'John',
				age: 25,
			},
		};
		const con = createConBase( initial, );

		// Act
		const setUserName = con.currySet( 'state.user.name', );
		const result = setUserName( 'Jane', );
		const history = con.get();

		// Assert
		expect( history.state.user.name, ).toBe( 'Jane', );
		expect( history.state.user.age, ).toBe( 25, ); // Other values unchanged
		expect( history, ).toBe( result, ); // Other values unchanged
		expect( result, ).toBeDefined(); // Should return result from set
	}, );

	it( 'should work with array paths', () => {
		// Arrange
		const initial = {
			users: ['John', 'Jane',],
		};
		const con = createConBase( initial, );

		// Act
		const setFirstUser = con.currySet( ['state', 'users', 0,], );
		const result = setFirstUser( 'Jim', );
		const history = con.get();

		// Assert
		expect( history.state.users[ 0 ], ).toBe( 'Jim', );
		expect( history.state.users[ 1 ], ).toBe( 'Jane', ); // Other values unchanged
		expect( result, ).toBeDefined();
	}, );

	it( 'should handle function updates', () => {
		// Arrange
		const initial = { count: 0, };
		const con = createConBase( initial, );

		// Act
		const setCount = con.currySet( 'state.count', );
		const result = setCount( ( props, ) => {
			props.draft += 1;
		}, );
		const history = con.get();

		// Assert
		expect( history.state.count, ).toBe( 1, );
		expect( result, ).toBeDefined();
	}, );

	it( 'should maintain immutability', () => {
		// Arrange
		const initial = {
			nested: { value: 42, },
		};
		const con = createConBase( initial, );

		// Act
		const setNestedValue = con.currySet( 'state.nested.value', );
		const originalState = con.get();
		setNestedValue( 100, );
		const newState = con.get();

		// Assert
		expect( originalState, ).not.toBe( newState, );
		expect( originalState.state.nested, ).not.toBe( newState.state.nested, );
		expect( newState.state.nested.value, ).toBe( 100, );
	}, );
}, );
