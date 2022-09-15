import { merge } from 'lodash';

import loginResolver from './login.resolver';
import userResolver from './user.resolver';

export const resolvers = merge(loginResolver, userResolver);
