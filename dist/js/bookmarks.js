'use strict';

var Bookmark = function Bookmark() {};

Bookmark.static = {
    URLS: {
        FETCH: 'app/bookmarks.php'
    }
};

Bookmark.prototype = Object.create(Dom.prototype);
Dom.prototype.bookmarkClass = Bookmark;

var bookmark = new Bookmark();
console.log(bookmark);

bookmark.bookmarkList = [];

Bookmark.prototype.getBookmarks = function () {
    $.get(this.static.URLS.FETCH, function (data) {
        this.bookmarkList = data.bookmarks.map(function (item) {
            return item;
        });
        bookmark.getDomBookmarkList(this.bookmarkList);
    });
};

Bookmark.prototype.updateBookmark = function (data) {
    $.post(this.static.URLS.FETCH, data, function (data) {
        this.bookmarkList = data.bookmarks.map(function (item) {
            return item;
        });
        bookmark.getDomBookmarkList(this.bookmarkList);
    });
};

Bookmark.prototype.addBookmark = function (data) {
    $.post(this.static.URLS.FETCH, data, function (data) {
        this.bookmarkList = data.bookmarks.map(function (item) {
            return item;
        });
        bookmark.getDomBookmarkList(this.bookmarkList);
    });
};

Bookmark.prototype.deleteBookmark = function (data) {
    $.post(this.static.URLS.FETCH, data, function (data) {
        this.bookmarkList = data.bookmarks.map(function (item) {
            return item;
        });
        bookmark.getDomBookmarkList(this.bookmarkList);
    });
};

Bookmark.prototype.switchCategory = function (id) {
    $.get(this.static.URLS.FETCH, function (data) {
        this.bookmarkList = data.bookmarks.filter(function (item) {
            return item.categoryid === id;
        });
        bookmark.getDomBookmarkList(this.bookmarkList);
    });
};

// // static methods
Bookmark.prototype.static = Bookmark.static;
Bookmark.prototype.getBookmarkArray = Bookmark.bookmarkList;

Bookmark.prototype.init = function () {
    this.getBookmarks();
};

$(document).ready(function () {
    bookmark.init();
});