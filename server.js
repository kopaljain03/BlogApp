const express=require('express');
const mongoose=require('mongoose');
const Article=require('./models/article')
const app=express();
const methodOverride=require('method-override');
const articleRouter=require('./routes/articles')


mongoose
    .connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true})
    .then(()=> console.log('connection susessful'))
    .catch(err=>console.log('connection unsuccessful',err))
app.set('view engine','ejs'); ///pug?
app.use(methodOverride('_method'))
app.use(express.urlencoded())
app.use(express.json())

app.get('/',async(req,res)=>{
    const articles= await Article.find().sort({date:'desc'});
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(5000);
