(function () {
    $(document).ready(function () {
        document.getElementById('categoryForm').innerHTML = addCategoryForm();
        initListener();
        refreshCategories();

    });
} ());


const listCategories = [
    {
        "id": 1,
        "name": "Favorite"
    }, {
        "id": 2,
        "name": "Job"
    }, {
        "id": 3,
        "name": "Films"
    }, {
        "id": 4,
        "name": "Fun"
    }, {
        "id": 5,
        "name": "TODO"
    }, {
        "id": 6,
        "name": "Other"
    }
];

// GENERATING TEMPLATE FOR CATEGORIES
function generateCategoryTemplate(category) {
    return `<button type="button" class="list-group-item" attr-id="${category.id}">
        ${category.name}
        <a>
            <span id="categoryID" class="glyphicon glyphicon-remove close" onclick="deleteCategory(${category.id})"></span>
        </a>
    </button>`;
}

    // Adding Form
function addCategoryForm() {
    return `<button class="btn btn-primary" id="addCategoryBtn" data-toggle="collapse" data-target="#addCategory">Add Category</button>
            <form id="addCategory" class="collapse">
                <div class="form-group">
                    <label for="addCategoryName">Category Name</label>
                    <input id="addCategoryName" type="text" class="form-control" name="nameCategory">
                </div>
                <button class="btn btn-primary saveCategory" type="button">Save</button>
                <button class="btn btn-danger cancelCategory" type="button" data-toggle="collapse" data-target="#addCategory">Cancel</button>
            </form>`;
}

function add(category) {
    let obj = Object.assign({}, category, {id: listCategories.length + 1});

    listCategories.push(obj);
    let inp = document.querySelector('#addCategory').querySelector('input[name="nameCategory"]');
    inp = inp.value;

    inp = "";
    return obj;
}

function initListener() {
    const addCategoryBtn = document.getElementsByClassName('saveCategory')[0];

    addCategoryBtn.addEventListener('click', function (elem) {
        const categoryForm= document.querySelector('#addCategory');
        const nameCategoryElm = categoryForm.querySelector('input[name="nameCategory"]');
        const name = nameCategoryElm.value;
        categoryForm.classList.remove('in');

        nameCategoryElm.value = "";

        listCategories.push({name: name, id: listCategories.length +1});
        refreshCategories();
    })
}

function refreshCategories() {
    document.getElementById('categoriesView').innerHTML = listCategories.map(item => generateCategoryTemplate(item)).join('');
}

// Deleting a category
function deleteCategory(id) {
    let confirmStatus;

    for (let i = 0; i < listCategories.length; i++) {
        if (listCategories[i].id === id) {
            confirmStatus = confirm('It will delete the category, including all its bookmarks.');
            if (confirmStatus){
                listCategories.splice(i, 1);
            }
        }
    }
    refreshCategories();
}

























// class Categories {
//     constructor(){
//         this.listCategories = [
//             {
//                 "id": 1,
//                 "name": "Favorite"
//             },{
//                 "id": 2,
//                 "name": "Job"
//             },{
//                 "id": 3,
//                 "name": "Films"
//             },{
//                 "id": 4,
//                 "name": "Fun"
//             },{
//                 "id": 5,
//                 "name": "TODO"
//             },{
//                 "id": 6,
//                 "name": "Other"
//             }
//         ];
//     }
//
//     add(category){
//         let obj = Object.assign({}, category, {id: this.listCategories.length + 1});
//
//         this.listCategories.push(obj);
//         return obj;
//     }
//
//     remove(id){
//         let current = this.listCategories;
//
//         for (let i = 0; i < current.length; i++){
//             if (current[i].id === id)
//                 current.splice(i, 1);
//         }
//         this.list();
//     }
//
//     list(){
//         return this.listCategories;
//     }
// }
