import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFriend from './friend.reducer'

export const selectFriendState = createFeatureSelector<fromFriend.FriendState>(
  fromFriend.customerFeatureKey,
);

export const selectFriend = createSelector(
  selectFriendState,
  (state: fromFriend.FriendState) => state.customers
);