import { createAction, props } from '@ngrx/store';
import { Friend } from './friend.model'


export const addFriend = createAction(
    '[Friend] Add Friend',
    (friend: Friend) => ({friend})
);