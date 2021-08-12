const { AuthenticationError } = require('apollo-server-express');
const {  User } = require("../models");
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: context.user._id });
          return user;
        } catch (err) {
          console.log("Unable to find data", err);
        }
      }
      throw new AuthenticationError('Must be logged in');
    }

  },
  Mutation: {
      login: async (_, { email, password }) => {
          try {
              const user = await User.findOne({ email });
              if (!user) {
                  throw new AuthenticationError('No user with this email');
              }
              const validPw = await user.isCorrectPassword(password);
              if(!validPw) {
                  throw new AuthenticationError('Password Invalid');
              }
              const token = signToken(user);
              return { token, user };
          } catch (err) {
 console.log('Login error', err)
          }
      },
    createUser: async (parent, { username, email, password }) => {
     try {
         const user = await User.create({ username, email, password });
         const token = signToken(user);
         return { token, user };
     } catch (err) {
         console.log('Sign up err', err);
         
     }
    },
    saveBook: async (parent, { bookToSave }, context) => {
     if( context.user) {
         try {
             const user = await User.findOneAndUpdate(
                 {_id: context.user._id },
                 { $addToSet: { savedBooks: bookToSave }},
                 { new: true, runValidators: true}
             );
             return user;
         } catch (error) {
             console.log("Save book error", error);
         }
     }
     throw new AuthenticationError('Login please')
    },
    deleteBook: async (parent, { bookId }, context) => {
        if(context.user) {
            try {
                const user = await User.findOneAndUpdate(
                    {_id: context.user._id },
                    { $pull: { savedBooks: {bookid: bookId }}},
                    {new: true }
                );
                // returns updated user
                return user;
            } catch (err) {
                console.log('Delete book error', err);
            }
        }
        throw new AuthenticationError("login please")
    }
  },
};

module.exports = resolvers;
