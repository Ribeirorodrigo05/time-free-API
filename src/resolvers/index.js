import { merge } from 'lodash';

import loginResolver from './login.resolver';

export const resolvers = merge(loginResolver);
