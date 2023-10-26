export default {
  Mutation: {
    createUsers: async (obj, args, context, requestInfo) => {
      console.log(obj, args, context, requestInfo);
    },
  },
};
