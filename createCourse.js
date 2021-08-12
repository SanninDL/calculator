var coursesAPI = 'http://localhost:3000/courses'
// var courseContainer = document.getElementById('course-container')

function start(){
    getCourses(renderCourses)
    handleCreatForm()
}

start()


function getCourses(callback){
    fetch(coursesAPI)
    .then(function(response){
        return response.json()
    })
    .then(callback)
}

function renderCourses(courses){
    courses.map(function(course,index){
        var courseHtml = document.createElement("div")
        document.body.appendChild(courseHtml)
        courseHtml.className = `course-container${course.id}`
        courseHtml.innerHTML = `
        <h2 class="title">${course.name}</h2>
        <h3 class="desc">${course.description}</h3>
        <button onclick="handleDeleteCourses(${course.id})">Xóa</button>
        <button onclick="handleUpdateCourses(${course.id})">Sửa</button>
        `
    })

}    

function handleCreatForm(){
    var createBtn = document.getElementById('create')
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value,
            description = document.querySelector('input[name="desc"]').value
        var formData = {
            name : name,
            description: description
        }
            handleCreatCourses(formData) 
            //     , function(){
            // getCourses(renderCourses)
            // })
    }
}

function handleCreatCourses(data) {
    fetch(coursesAPI, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header

    })
    .then(function(response){
        return response.json()
        
    })
    
}

function handleDeleteCourses(id){
    var options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
    },

    }
    fetch(coursesAPI + "/" + id, options)
    .then(function(response){
        return response.json()
    })
    .then(function(){
        var courseDeleteItem = document.querySelector(`.course-container${course.id}`)
        if (courseDeleteItem) {
            courseDeleteItem.remove()
        }
    })
}

// Update
function handleUpdateCourses(id){
    var courseUpdateItem = document.querySelector(`.course-container${id}`)
    const courseCurrentItem = courseUpdateItem.outerHTML
    var title = courseUpdateItem.querySelector('.title')
    var desc = courseUpdateItem.querySelector('.desc')
    
    courseUpdateItem.innerHTML = `
    <div>
    <label for="name">Name</label>
    <input name="updateName" type="text" value="${title.textContent}">
    </div>
    <div>
    <label for="desc">Description</label>
    <input name="updateDesc" style="width: 500px; height: 30px" type="text" value="${desc.textContent}">
    <button id="cancel-update" onclick="">Hủy</button>
    <button id="submit-update" onclick="submitUpdate(${id})">Cập nhật</button>
    </div>`
    var cancelBtn = document.getElementById('cancel-update')
    cancelBtn.onclick = function cancelUpdate(){
        courseUpdateItem.innerHTML = courseCurrentItem
        console.log(courseCurrentItem)
    }
}

function submitUpdate(id){
    var options = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
        },

    }
    fetch(coursesAPI + "/" + id, options)
    .then(function(response){
        return response.json()
    })

    var newName = document.querySelector('input[name="updateName"]').value,
        description = document.querySelector('input[name="updateDesc"]').value
    var formData = {
            name : newName,
            description: description
        }
        
            handleCreatCourses(formData) 

    // handleDeleteCourses(id)
} 

/* <label for="name">Name</label>
<input type="text" name="name" >
<label for="desc">Description</label>
<input type="text" name="desc">
<button id="create">Create</button> */



    
