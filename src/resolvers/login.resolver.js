import { checkUserLogin } from '../services/LoginServices';

export default {
  Mutation: {
    login: async (parent, args, context, info) => {
      const res = await checkUserLogin(args, context);
      return res;
    },
  },
};
