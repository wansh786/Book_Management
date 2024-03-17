const express=require("express");
const jwt=require("jsonwebtoken")
const { graphqlHTTP } = require("express-graphql");
const { connection } = require("./db");
const { schema, root } = require("./graphQL/resolvers");
const app=express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));



app.get("regnerate",(req,res)=>{
    const refresh_token=req.headers.authorization?.split(" ")[1]
    const decoded=jwt.verify(refresh_token,"masai");
    if(decoded){
        const accsess_token=jwt.sign({userID:userRouter._id},"masai",{expiresIn:5000});
        res.send(accsess_token)
    }
    else{
        res.send("Invalid refresh_token")
    }
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("server is running")
    } catch (error) {
        console.log(error.message)
    }
})