const express=require('express');
const Article=require('./../models/article');

const router=express.Router();
router.get('/new',(req,res)=>{
    res.render('articles/new' , {article:new Article()})
})

router.get('/edit/:id',async(req,res)=>{
    const article=await Article.findById(req.params.id)
    res.render('articles/edit',{article:article})
})

router.get('/:id',async(req,res)=>{
const article=await Article.findById(req.params.id)
if(article==null) res.redirect('/');
res.render('articles/show',{article:article})
})
// router.get('/:id',(req,res)=>{
//     const article= Article.findById(req.params.id)
//     // res.send(req.params.id)
//     res.render('articles/show',{article:article})
//     })

router.post('/', async(req,res)=>{
    let article=new Article({
    title : req.body.title,
    desc : req.body.desc,
    markdown : req.body.markdown
    })
    try{
        console.log(article)
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log('not saved',e)
        res.render(`articles/new`, { article: article })
    }
})

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id',async(req,res)=>{
await Article.findByIdAndDelete(req.params.id)
res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.desc = req.body.desc
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.id}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

// router.post('/', (req,res)=>{
//     const article=new Article(req.body)
//     article.save((err,article)=>{
//         if(err) console.error(err)
//         else console.log("note saved")
//     })
//     res.render('articles/new')
// })
module.exports=router;




// const express = require('express')
// const Article = require('./../models/article')
// const router = express.Router()

// router.get('/new', (req, res) => {
//   res.render('articles/new', { article: new Article() })
// })

// // router.get('/edit/:id', async (req, res) => {
// //   const article = await Article.findById(req.params.id)
// //   res.render('articles/edit', { article: article })
// // })

// // router.get('/:slug', async (req, res) => {
// //   const article = await Article.findOne({ slug: req.params.slug })
// //   if (article == null) res.redirect('/')
// //   res.render('articles/show', { article: article })
// // })

// router.post('/', async (req, res, next) => {
//   req.article = new Article()
//   next()
// }, saveArticleAndRedirect('new'))

// router.put('/:id', async (req, res, next) => {
//   req.article = await Article.findById(req.params.id)
//   next()
// }, saveArticleAndRedirect('edit'))

// router.delete('/:id', async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id)
//   res.redirect('/')
// })

// function saveArticleAndRedirect(path) {
//   return async (req, res) => {
//     let article = req.article
//     article.title = req.body.title
//     article.description = req.body.description
//     article.markdown = req.body.markdown
//     try {
//       article = await article.save()
//       res.redirect(`/articles/${article.slug}`)
//     } catch (e) {
//       res.render(`articles/${path}`, { article: article })
//     }
//   }
// }

// module.exports = router