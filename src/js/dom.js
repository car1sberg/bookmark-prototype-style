    'use strict';

    let Dom = function () {
        this.AUTHOR = "Volodymyr Ersteniuk";
    };


    Dom.prototype.getDomBookmarkList = function(data) {
        document.getElementById('bookmarkList').innerHTML = data
                            .map(item => generateTemplateItem(item)).join('');
    };


    // Dom.prototype.getDomSelectList = function(data) {
    //     document.getElementById('select').innerHTML = data
    //                         .map(item => createSelectForm(item)).join('');
    // };


    Dom.prototype.getDomCategoryList = function(data) {
        document.getElementById('categoriesView').innerHTML = data
                            .map(item => generateCategoryTemplate(item)).join('');
        document.getElementById('select').innerHTML = data
                            .map(item => createSelectForm(item)).join('');
    };


    let dom = new Dom();
    console.log(dom);


    $(document).ready(function () {
        dom.loadNameAndSearch();
        dom.loadBookmarkAddingForm();
        dom.loadCategoryAddingForm();
        dom.initListener();
    });


    dom.loadNameAndSearch = function() {
        document.getElementById('title').innerHTML = templateTitleAndSearch();
    };


    dom.loadBookmarkAddingForm = function() {
        document.getElementById('bookmarkForm').innerHTML = addBookmarkForm();
    };


    dom.loadCategoryAddingForm = function() {
        document.getElementById('categoryForm').innerHTML = addCategoryForm();
    };


    dom.bookmarkOnUpdate = function(id) {
        let form = document.getElementById(`collapse${id}`);
        let nameElem = form.querySelector('.updateBookmarkName');
        let linkElem = form.querySelector('.updateBookmarkLink');
        let name = nameElem.value;
        let link = linkElem.value;

        dom.bookmarkClass.prototype.updateBookmark({
            id: id,
            name: name,
            link: link,
            action: 'edit'
        });
    };


    dom.onAddNewBookmark = function() {
        let addBookmark = document.getElementById('addBookmarkForm');
        let nameElem = addBookmark.querySelector('.addBookmarkName');
        let linkElem = addBookmark.querySelector('.addBookmarkLink');
        let name = nameElem.value.trim();
        let link= linkElem.value.trim();
        let categoryId = $('#select').find('option:checked').val();

        if (name.length === 0) {
            nameElem.value = "";
            alert('Enter a bookmark name');
        }
        else if (link.length === 0) {
            linkElem.value = "";
            alert('Enter a bookmark link');
        }
        else {
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


    dom.onSearch = function() {
        let input = document.getElementById("myInput");
        let filter = input.value.toUpperCase();
        let panelDefault = document.getElementById("bookmarkList");
        let wholeForm = panelDefault.getElementsByClassName('wholeForm');

        for (let i = 0; i < wholeForm.length; i++) {
            let bookmarkName = wholeForm[i].getElementsByTagName("a")[0];
            if (bookmarkName.innerHTML.toUpperCase().indexOf(filter) > -1) {
                wholeForm[i].style.display = "";
            } else {
                wholeForm[i].style.display = "none";
            }
        }
    };


    dom.clearSearchField = function() {
        let userValue = document.getElementById('myInput');

        if (userValue.value !== ""){
            userValue.value = "";
            // this.getDomBookmarkList(bookmark.init());
            dom.bookmarkClass.prototype.getBookmarks();
        }
    };


    dom.hideModal = function() {
        $('#myModal').modal('hide');
    };


    dom.activeCategory = function(id) {
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
    dom.initListener = function() {
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

                dom.categoryClass.prototype.addCategory({
                    name: newValue,
                    action: 'add'
                });
            }
        })
    };

        // Deleting Category
    dom.deleteCategory = function(id) {
        let confirmStatus = confirm('It will delete the category, press "Yes" to continue');

        if (confirmStatus) {

            dom.categoryClass.prototype.removeCategory({
                id: id,
                action: 'delete'
            });
        }
        else {
            dom.bookmarkClass.prototype.getBookmarks();
        }

    };


    dom.switchToUpdate = function() {
        let panelsCollapse = document.getElementsByClassName('collapse');

        for (let i = 0; i < panelsCollapse.length; i++){
            let classes =  panelsCollapse[i].className;
            classes = classes.trim().split(' ');

            for (let j = 0; j < classes.length; j++){
                if (classes[j] === 'in'){
                    delete classes[j];
                    break;
                }
            }
            panelsCollapse[i].className = classes.join(' ');
        }
    };
