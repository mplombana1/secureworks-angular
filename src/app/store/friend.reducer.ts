import { Action, createReducer, on } from '@ngrx/store';
import * as FriendActions from './friend.actions';
import { Friend } from './friend.model';

export const customerFeatureKey = 'customer';

export interface FriendState {
  customers: Friend[];
}

export const initialState: FriendState = {
  customers: [
    {id: 1, name: "Curtis Mcmahon", weight: 150, age: 20, friendID: [2]},
    {id: 2, name: "John Doe", weight: 120, age: 25, friendID: [3,4]},
    {id: 3, name: "Reo Bernard", weight: 200, age: 50, friendID: [4,3]},
    {id: 4, name: "Chiara Corbett", weight: 250, age: 40, friendID: [1,3]},
    {id: 5, name: "Mikolaj Savage", weight: 300, age: 18, friendID: [3,4]},
    {id: 6, name: "Aliya Roche", weight: 275, age: 21, friendID: [1,2,3,4,5,1,1,1,1]},
    
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
