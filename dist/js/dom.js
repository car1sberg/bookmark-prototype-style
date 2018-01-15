'use strict';

var Dom = function Dom() {
    this.AUTHOR = "Volodymyr Ersteniuk";
};

Dom.prototype.getDomBookmarkList = function (data) {
    document.getElementById('bookmarkList').innerHTML = data.map(function (item) {
        return generateTemplateItem(item);
    }).join('');
};

// Dom.prototype.getDomSelectList = function(data) {
//     document.getElementById('select').innerHTML = data
//                         .map(item => createSelectForm(item)).join('');
// };


Dom.prototype.getDomCategoryList = function (data) {
    document.getElementById('categoriesView').innerHTML = data.map(function (item) {
        return generateCategoryTemplate(item);
    }).join('');
    document.getElementById('select').innerHTML = data.map(function (item) {
        return createSelectForm(item);
    }).join('');
};

var dom = new Dom();
console.log(dom);

$(document).ready(function () {
    dom.loadNameAndSearch();
    dom.loadBookmarkAddingForm();
    dom.loadCategoryAddingForm();
    dom.initListener();
});

dom.loadNameAndSearch = function () {
    document.getElementById('title').innerHTML = templateTitleAndSearch();
};

dom.loadBookmarkAddingForm = function () {
    document.getElementById('bookmarkForm').innerHTML = addBookmarkForm();
};

dom.loadCategoryAddingForm = function () {
    document.getElementById('categoryForm').innerHTML = addCategoryForm();
};

dom.bookmarkOnUpdate = function (id) {
    var form = document.getElementById('collapse' + id);
    var nameElem = form.querySelector('.updateBookmarkName');
    var linkElem = form.querySelector('.updateBookmarkLink');
    var name = nameElem.value;
    var link = linkElem.value;

    dom.bookmarkClass.prototype.updateBookmark({
        id: id,
        name: name,
        link: link,
        action: 'edit'
    });
};

dom.onAddNewBookmark = function () {
    var addBookmark = document.getElementById('addBookmarkForm');
    var nameElem = addBookmark.querySelector('.addBookmarkName');
    var linkElem = addBookmark.querySelector('.addBookmarkLink');
    var name = nameElem.value.trim();
    var link = linkElem.value.trim();
    var categoryId = $('#select').find('option:checked').val();

    if (name.length === 0) {
        nameElem.value = "";
        alert('Enter a bookmark name');
    } else if (link.length === 0) {
        linkElem.value = "";
        alert('Enter a bookmark link');
    } else {
        nameElem.value = "";
        linkElem.value = "";
        this.hideModal();
        dom.bookmarkClass.prototype.addBookmark({
            name: name,
            link: link,
            categoryid: categoryId,
            action: 'add'
        });
    }
};

dom.onDeleteBookmark = function (id) {
    dom.bookmarkClass.prototype.deleteBookmark({
        id: id,
        action: 'delete'
    });
};

dom.onSearch = function () {
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var panelDefault = document.getElementById("bookmarkList");
    var wholeForm = panelDefault.getElementsByClassName('wholeForm');

    for (var i = 0; i < wholeForm.length; i++) {
        var bookmarkName = wholeForm[i].getElementsByTagName("a")[0];
        if (bookmarkName.innerHTML.toUpperCase().indexOf(filter) > -1) {
            wholeForm[i].style.display = "";
        } else {
            wholeForm[i].style.display = "none";
        }
    }
};

dom.clearSearchField = function () {
    var userValue = document.getElementById('myInput');

    if (userValue.value !== "") {
        userValue.value = "";
        // this.getDomBookmarkList(bookmark.init());
        dom.bookmarkClass.prototype.getBookmarks();
    }
};

dom.hideModal = function () {
    $('#myModal').modal('hide');
};

dom.activeCategory = function (id) {
    id = id.toString();
    dom.bookmarkClass.prototype.switchCategory(id);

    // let newArr = [];
    //
    // for (let item of this.getDomBookmarkList()){
    //     if (item.categoryid === id){
    //         newArr = newArr.concat(item);
    //     }
    // }
    // this.getDomBookmarkList(newArr);
};

// Adding Category
dom.initListener = function () {
    var addCategoryBtn = document.getElementsByClassName('saveCategory')[0];

    addCategoryBtn.addEventListener('click', function () {
        var categoryForm = document.querySelector('#addCategory');
        var nameCategoryElm = categoryForm.querySelector('input[name="nameCategory"]');

        var inputValue = nameCategoryElm.value;
        var newValue = inputValue.trim();

        if (newValue.length === 0) {
            nameCategoryElm.value = "";
            alert('Enter a category name');
        } else {
            categoryForm.classList.remove('in');
            nameCategoryElm.value = "";

            dom.categoryClass.prototype.addCategory({
                name: newValue,
                action: 'add'
            });
        }
    });
};

// Deleting Category
dom.deleteCategory = function (id) {
    var confirmStatus = confirm('It will delete the category, press "Yes" to continue');

    if (confirmStatus) {

        dom.categoryClass.prototype.removeCategory({
            id: id,
            action: 'delete'
        });
    } else {
        dom.bookmarkClass.prototype.getBookmarks();
    }
};

dom.switchToUpdate = function () {
    var panelsCollapse = document.getElementsByClassName('collapse');

    for (var i = 0; i < panelsCollapse.length; i++) {
        var classes = panelsCollapse[i].className;
        classes = classes.trim().split(' ');

        for (var j = 0; j < classes.length; j++) {
            if (classes[j] === 'in') {
                delete classes[j];
                break;
            }
        }
        panelsCollapse[i].className = classes.join(' ');
    }
};