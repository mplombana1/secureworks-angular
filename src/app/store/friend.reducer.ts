import { Action, createReducer, on } from '@ngrx/store';
import * as FriendActions from './friend.actions';
import { Friend } from './friend.model';

export const friendFeatureKey = 'friend';

export interface FriendState {
  friends: Friend[];
}

export const initialState: FriendState = {
  friends: [
    {id: 1, name: 'Matthew Lombana', age: 34, weight: 200, friendID: [3]},
    {id: 2, name: "Curtis Mcmahon", weight: 150, age: 20, friendID: [2,3]},
    {id: 3, name: "John Doe", weight: 120, age: 25, friendID: [3,4]},
    {id: 4, name: "Reo Bernard", weight: 200, age: 50, friendID: [4,3]},
    {id: 5, name: "Chiara Corbett", weight: 250, age: 40, friendID: [1,3]},
    {id: 6, name: "Mikolaj Savage", weight: 300, age: 18, friendID: [3,4]},
  ],
};

export const friendReducer = createReducer(
  // initial state
  initialState,
  // add new friend to friends array
  on(FriendActions.addFriend, (state: FriendState, { friend }) => ({
    ...state,
    friends: [...state.friends, friend],
  }))
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return friendReducer(state, action);
}
