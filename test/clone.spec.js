import test from 'ava';
import clone from '../src/clone';

test('clone should work correctly with primitives', t => {
    t.is(clone(1), 1, 'number works');
    t.is(clone('hi'), 'hi', 'string works');
    t.is(clone(false), false, 'boolean works');
    t.is(clone(true), true, 'boolean works');
    t.is(clone(null), null, 'null works');
    t.is(clone(), undefined, 'undefined works');

    if (typeof Symbol === 'symbol') {
        const symbol = Symbol('t');
        t.is(clone(symbol), symbol, 'symbol works');
    }
});

test('clone should work correctly with plain objects', t => {
    t.deepEqual(clone({ x: 1 }), { x: 1 });

    const simple = {};
    const cloned = clone(simple);
    t.not(cloned, simple);
    t.deepEqual(cloned, simple);

    const complex = {
        x: 1,
        c: {
            x: 1,
            y: undefined
        },
        y: null
    };
    t.deepEqual(clone(complex), complex);
});

test('clone should not work with values other than primitives / plain objects', t => {
    // eslint-disable-next-line no-console
    t.is(clone(console.log), console.log);

    const date = new Date();
    t.notDeepEqual(clone(date), date);
});
