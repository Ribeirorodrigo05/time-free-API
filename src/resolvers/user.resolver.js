import { register } from '../services/UserServices';

export default {
  Mutation: {
    RegisterUser: async (parent, args, context, info) => {
      const res = await register(args, context);
      return res;
    },
  },
};
