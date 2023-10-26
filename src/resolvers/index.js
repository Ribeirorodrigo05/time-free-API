import { merge } from 'lodash';

import userMutation from './user/mutation/user';

export const resolvers = merge(userMutation);
