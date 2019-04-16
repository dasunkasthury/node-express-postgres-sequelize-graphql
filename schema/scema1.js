const graphql = require("graphql");
const _ = require("lodash");
const axiyo = require("axios")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const Db = require("../db")

const Post = new GraphQLObjectType({
  name: "Post",
  description: "Blog post",
  fields: () => {
    return {
      title: {
        type: GraphQLString,
        resolve(parent, args, ctx, info) {
          return parent.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve(parent, args, ctx, info) {
          return parent.content;
        }
      },
      person: {
        type: Person,
        resolve(parent, args, ctx, info) {
          return parent.getPerson();
        }
      }
    };
  }
});

const flights = new GraphQLObjectType({
  name: "flights",
  fields: ()=>{
    return{
      flight_number: {
        type: GraphQLString,
        resolve(parent, args, ctx, info){
          return parent.flight_number
        }
      },
      mission_name: {
        type: GraphQLString,
        resolve(parent, args, ctx, info){
          return parent.mission_name
        }
      }
    }
    
    rocket_name: {type: GraphQLString}
  }
})

const Person = new GraphQLObjectType({
  name: "Person",
  description: "This represents a Person",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(parent, args, ctx, info) {
          return parent.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(parent, args, ctx, info) {
          return parent.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(parent, args, ctx, info) {
          return parent.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(parent, args, ctx, info) {
          return parent.email;
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(parent, args, ctx, info) {
          return parent.getPosts();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Root query object",
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(parent, args, ctx, info) {
          return Db.models.person.findAll({ where: args });
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(parent, args, ctx, info) {
          return Db.models.post.findAll({ where: args });
        }
      },
      flights: {
        type: new GraphQLList(flights),
        resolve(parent, args, ctx, info){
         return axiyo.get('https://api.spacexdata.com/v3/launches').then(res=>res.data)
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  description: "Functions to set stuff",
  fields() {
    return {
      addPerson: {
        type: Person,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(source, args) {
          return Db.models.person.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase()
          });
        }
      },
      addPost: {
        type: Post,
        args: {
          userId: {
            type: GraphQLNonNull(GraphQLInt)
          },
          title: {
            type: GraphQLNonNull(GraphQLString)
          },
          content: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve(source, args) {
          return Db.models.user.findById(args.userId).then(user => {
            return user.createPost({
              title: args.title,
              content: args.content
            });
          });
        }
      }
    };
  }
});


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
