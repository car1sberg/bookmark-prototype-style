    'use strict';

    let Category = function () {

    };

    Category.static = {
        URLS: {
            FETCH: 'app/categories.php'
        }
    };


    Category.prototype = Object.create(Dom.prototype);
    Dom.prototype.categoryClass = Category;


    let category = new Category();
    console.log(category);

    category.categoryList = [];

    Category.prototype.getCategories = function () {
        $.get(this.static.URLS.FETCH, function (data) {
            this.categoryList = data.categories.map(item => item);
            category.getDomCategoryList(this.categoryList);
        });
    };

    Category.prototype.addCategory = function (data) {
        $.post(this.static.URLS.FETCH, data, function (data) {
            this.categoryList = data.categories.map(item => item);
            category.getDomCategoryList(this.categoryList);
        });
    };

    Category.prototype.removeCategory = function (data) {
        $.post(this.static.URLS.FETCH, data, function (data) {
            this.categoryList = data.categories.map(item => item);
            category.getDomCategoryList(this.categoryList);
            dom.bookmarkClass.prototype.getBookmarks();
        });
    };



    // static methods
    Category.prototype.static = Category.static;

    Category.prototype.init = function () {
        this.getCategories();
    };

    $(document).ready(function() {
        category.init();
    });
