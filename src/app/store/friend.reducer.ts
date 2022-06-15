import { Action, createReducer, on } from '@ngrx/store';
import * as FriendActions from './friend.actions';
import { Friend } from './friend.model';

export const customerFeatureKey = 'customer';

export interface FriendState {
  customers: Friend[];
}

export const initialState: FriendState = {
  customers: [
    {id: Date.now(), name: "Curtis Mcmahon", weight: 200, age: 34, friendID: [2]},
  ],
};

export const customerReducer = createReducer(
  initialState,
  on(FriendActions.addFriend, (state: FriendState, { friend }) => ({
    ...state,
    customers: [...state.customers, friend],
  }))
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return customerReducer(state, action);
}
