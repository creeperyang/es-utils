import test from 'ava';
import sinon from 'sinon';
import throttle from '../src/throttle';

test('throttle should work correctly when called single/multiple times', t => {
    const clock = sinon.useFakeTimers();
    const cb = sinon.spy();
    const throttled = throttle(cb, 100);

    // Normal call
    throttled(1, 2, 3);
    clock.tick(99);
    t.true(cb.notCalled);
    clock.tick(1);
    t.true(cb.calledOnceWith(1, 2, 3));

    // Multiple calls
    cb.resetHistory();
    for(let i = 0; i < 10; i++) {
        throttled('1', '2');
    }
    t.true(cb.notCalled);
    clock.tick(100);
    t.true(cb.calledOnceWith('1', '2'));

    clock.restore();
});

test('throttle should work correctly when called and time changed', t => {
    const clock = sinon.useFakeTimers();
    const cb = sinon.fake();
    const throttled = throttle(cb, 100);

    for (let i = 0; i < 10; i++) {
        throttled();
        clock.tick(50);
    }
    t.is(cb.callCount, 5);

    clock.restore();
});
