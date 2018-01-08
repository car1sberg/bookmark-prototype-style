(function () {
    $(document).ready(function () {
        loadCategoryForm();
        initListener();
    });
} ());

function generateCategoryTemplate(category) {
    return `<button type="button" class="list-group-item activeCategory" onclick="activeCategory(${category.id})">
        ${category.name}
        <a>
            <span id="categoryID" class="glyphicon glyphicon-remove close" onclick="deleteCategory(${category.id})"></span>
        </a>
    </button>`;
}

function addCategoryForm() {
    return `<button class="btn btn-primary" id="addCategoryBtn" data-toggle="collapse" data-target="#addCategory">Add Category</button>
            <form id="addCategory" class="collapse">
                <div class="form-group">
                    <label for="addCategoryName">Category Name</label>
                    <input id="addCategoryName" type="text" class="form-control" name="nameCategory" maxlength="20" required>
                </div>
                <button class="btn btn-primary saveCategory" type="button">Save</button>
                <button class="btn btn-danger cancelCategory" type="button" data-toggle="collapse" data-target="#addCategory">Cancel</button>
            </form>`;
}

function activeCategory(id) {
    let newArr = [];

    for (let item of myData){
        if (item.categoryid == id){
            newArr = newArr.concat(item);
        }
    }
    getBookmarksList(newArr);
}


let listCategories = [];
$.get('app/categories.php', function (data) {
    listCategories = data.categories.map(item => item);
    refreshCategories(listCategories);
});

function loadCategoryForm() {
    document.getElementById('categoryForm').innerHTML = addCategoryForm();
}

function refreshCategories(data) {
    document.getElementById('categoriesView').innerHTML = data.map(item => generateCategoryTemplate(item)).join('');
}

function initListener() {
    const addCategoryBtn = document.getElementsByClassName('saveCategory')[0];

    addCategoryBtn.addEventListener('click', function () {
        const categoryForm= document.querySelector('#addCategory');
        const nameCategoryElm = categoryForm.querySelector('input[name="nameCategory"]');
        let inputValue = nameCategoryElm.value;
        let newValue = inputValue.trim();

        if (newValue.length === 0){
            nameCategoryElm.value = "";
            alert('Enter a category name');
        }
        else {
            categoryForm.classList.remove('in');
            nameCategoryElm.value = "";

            $.post('app/categories.php', {name: newValue, action: 'add'}, function(data){
                listCategories = data.categories.map(item => item);
                refreshCategories(listCategories);
                refreshSelectList(listCategories);
            });
        }
    });
}

function deleteCategory(id) {
    let confirmStatus = confirm('It will delete the category, including all its bookmarks.');
    if (confirmStatus) {
        $.post('app/categories.php', {id: id, action: 'delete'}, function (data) {
            listCategories = data.categories.map(item => item);
            refreshCategories(listCategories);
        });
    }
}

