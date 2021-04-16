Model = require('../models/Task')

obj = {
  renderTodos: async (req, res)=>{
    try{
      //console.log(req.user)
      tasks = await Model.find({microsoftId: req.user.microsoftId})
      // tasks = await Model.find({})
      tasksUncompleted = tasks.filter( task => task.completed==false)
      res.render('todos.ejs', {"tasks": tasks, 
                               "tasksLeft": tasksUncompleted.length,
                               "name": req.user.displayName  })
      // res.render('index.html')

    }catch(err){
    
      console.error(err)
    }
  },

  renderAllTodos: async (req, res)=>{
    try{
      //console.log(req.user)
      tasks = await Model.find({microsoftId: ""})
      tasksUncompleted = tasks.filter( task => task.completed==false)
      res.render('todos.ejs', {"tasks": tasks, 
                               "tasksLeft": tasksUncompleted.length,
                               "name": "Anonimus"  })
      // res.render('index.html')

    }catch(err){
    
      console.error(err)
    }
  },

  addTask: async (req, res)=>{
    
    //~ console.log(req.user)
    
     new_task = req.body
     new_task.completed = false

     if( req.user )
        new_task.microsoftId = req.user.microsoftId
     else
        new_task.microsoftId = ""


     try{
       await Model.create(new_task)
       if( req.user)
          res.redirect("/todos")
        else
          res.redirect("/public")

     }catch(err){
    
       console.error(err)
     }
  },
  
  deleteTask: async (req, res)=>{
    
    try{
      obj = await Model.deleteOne({_id : req.body._id })
      res.json( obj )

    }catch(err){
   
      console.error(err)
    }

  },
 
 toogleState: async (req, res)=>{
    
  try{
    task = await Model.findById({_id : req.body._id })
    task.completed = !task.completed
    task.save()
    res.json( task )

  }catch(err){
 
    console.error(err)
  }

 },
 
 updateTask: async (req, res)=>{

  try{
    task = await Model.findById({_id : req.params.id })
    task.todo = req.body.task_updated
    task.save()
    res.json( task )

  }catch(err){
 
    console.error(err)
  }

 },        
}

module.exports = obj
