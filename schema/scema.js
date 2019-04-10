const graphql = require('graphql')
const _ = require("lodash")

const{GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID, GraphQLInt, GraphQLList} = graphql

// dummy data

var book =[
    {name: "gaga addara", genre: "2014.05.22", id: '1', autherId: "1"},
    {name: "lokantaya", genre: "1992.05.06" ,id: '2', autherId: "2"},
    {name: "liya", genre: "1996.02.11", id: '3', autherId: "2"}
]


var auther =[
    {name: "kamal", age: 56, id: '1'},
    {name: "amal", age: 35 ,id: '2'},
    {name: "liyanage", age: 25, id: '3'}
]

const BookType = new GraphQLObjectType(
    {
        name: 'Book',
        fields: ()=>({
            id:{type: GraphQLID},
            name: {type: GraphQLString},
            genre:{type:GraphQLString},
            auther:{
                type: AutherType,
                resolve(parent,args){
                    return _.find(auther, {id: parent.autherId})
                }

             }

        })
    }
)

const AutherType = new GraphQLObjectType(
    {
        name: 'Auther',
        fields: ()=>({
            id:{type: GraphQLID},
            name: {type: GraphQLString},
            age:{type:GraphQLInt},
            book:{
                type: GraphQLList(BookType),
                resolve(parent,args){
                    return _.filter(book,{autherId: parent.id})
                }
            }

        })
    }
)

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(book, {id: args.id})
            }
        },
        auther:{
            type:AutherType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(auther, {id: args.id})
            }
        },
        books:{
            type: GraphQLList(BookType),
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return book
            }
        },
        authers:{
            type:GraphQLList(AutherType),
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return auther
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})