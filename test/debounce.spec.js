import test from 'ava';
import sinon from 'sinon';
import debounce from '../src/debounce';

test('debounce should work correctly when get called only once', t => {
    const clock = sinon.useFakeTimers();
    const cb = sinon.fake();

    const debounced = debounce(cb, 100);
    debounced(1, 2, 3);

    clock.tick(99);
    t.true(cb.notCalled);

    clock.tick(1);
    t.true(cb.calledOnceWithExactly(1, 2, 3));

    clock.restore();
});

test('debounce should work correctly when get called multiple times', t => {
    const clock = sinon.useFakeTimers();
    const cb = sinon.fake();

    const debounced = debounce(cb, 100);
    debounced();

    for(let i = 0; i < 10; i++) {
        clock.tick(99);
        t.true(cb.notCalled);
        debounced();
    }

    clock.tick(99);
    t.true(cb.notCalled);
    clock.tick(1);
    t.true(cb.calledOnce);

    clock.restore();
});

test('debounce should throws when argument `fn` is not a function', t => {
    const clock = sinon.useFakeTimers();

    t.throws(() => {
        const debounced = debounce('invalid', 100);
        debounced();
        clock.tick(100);
    }, ReferenceError);

    clock.restore();
});
