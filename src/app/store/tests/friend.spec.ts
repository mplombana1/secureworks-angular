import * as fromReducer from '../friend.reducer';
import * as fromActions from '../friend.actions';
import * as fromSelectors from '../friend.selector';

describe('data reducer', () => {
  afterEach(() => {
    fromReducer.initialState.friends = [
      { id: 1, name: 'Matthew Lombana', age: 34, weight: 200, friendID: [3] },
      { id: 2, name: 'Curtis Mcmahon', weight: 150, age: 20, friendID: [2] },
      { id: 3, name: 'John Doe', weight: 120, age: 25, friendID: [3, 4] },
      { id: 4, name: 'Reo Bernard', weight: 200, age: 50, friendID: [4, 3] },
      { id: 5, name: 'Chiara Corbett', weight: 250, age: 40, friendID: [1, 3] },
      { id: 6, name: 'Mikolaj Savage', weight: 300, age: 18, friendID: [3, 4] },
    ];
  });

  it('SHOULD return initial state', () => {
    const { initialState } = fromReducer;
    const state = fromReducer.friendReducer(undefined, { type: '' });
    expect(state).toBe(initialState);
  });

  describe('SHOULD dispatch action', () => {
    it('should create object', () => {
      expect(
        fromActions.addFriend({
          id: 1,
          name: 'Curtis Mcmahon',
          weight: 150,
          age: 20,
          friendID: [2],
        })
      ).toBeTruthy();
    });
  });

  it('SHOULD load data', () => {
    const { initialState } = fromReducer;
    const payload = {
      id: 7,
      name: 'John Dear',
      weight: 150,
      age: 20,
      friendID: [2],
    };
    const action = fromActions.addFriend(payload);
    const state = fromReducer.friendReducer(initialState, action);
    console.log('🚀 : state', state);
    expect(state.friends).toContain(payload);
  });

  it('SHOULD select data', () => {
    const { initialState } = fromReducer;
    const result = fromSelectors.selectFriendState.projector(
      initialState.friends
    );
    expect(result).toBeTruthy();
  });
});
