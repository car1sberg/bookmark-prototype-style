
function templateTitleAndSearch() {
    return `<div class="row headerInfo">
                <div class="col-md-4">
                    <h3>Bookmark Manager</h3>
                </div>
                <div class="col-md-8 searchField">
                    <input class="form-control" type="text" id="myInput" onkeyup="onSearch()" 
                    placeholder="Search bookmarks..">
                    <button class="btn clearSearchFieldBtn" onclick="clearSearchField()">Clear Up</button>
                </div>
            </div>`
}

function generateTemplateItem(bookmark) {
    return `<div class="container wholeForm">
                   <div class="panel-group">
                      <div class="panel panel-default">
                           <div class="panel-heading">
                               <div class="panel-title panelToDelete">
                                   <a href="${bookmark.link}">${bookmark.name}</a>
                                   <a><span class="glyphicon glyphicon-remove close" onclick="onDeleteBookmark(${bookmark.id})"></span></a>
                                   <a data-toggle="collapse" href="#collapse${bookmark.id}"><span class="glyphicon glyphicon-pencil edit" onclick="switchToUpdate()"></span></a>
                               </div>
                           </div>
                           <div id="collapse${bookmark.id}" class="panel-collapse collapse">
                               <ul class="list-group" id="inputValues">
                                   <li class="list-group-item"><input class="form-control updateBookmarkName" type="text" value="${bookmark.name}"></li>
                                   <li class="list-group-item"><input class="form-control updateBookmarkLink" type="text" value="${bookmark.link}"></li>
                               </ul>
                               <button class="btn btn-primary updateButton" onclick="onUpdate(${bookmark.id})">Update</button>
                               <button class="btn btn-danger cancelButton" data-toggle="collapse" href="#collapse${bookmark.id}">Cancel</button>
                           </div>
                       </div>
                   </div>
            </div>`;
}

function addBookmarkForm() {
    return `<div class="container">
        <!-- Trigger the modal with a button -->
        <div>
            <span class="glyphicon glyphicon-plus" data-toggle="modal" data-target="#myModal">Add</span>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-body">
                        <div id="show">
                            <form id="addBookmarkForm">
                                <div class="form-group cancelForm">
                                    <label for="BkmName">Bookmark Name</label>
                                    <input id="BkmName" type="text" class="form-control addBookmarkName" placeholder="required" maxlength="30">
                                </div>
                                <div class="form-group">
                                    <label for="BkmLink">Bookmark Link</label>
                                    <input id="BkmLink" type="text" class="form-control addBookmarkLink" placeholder="required" maxlength="30">
                                </div>
                                <div class="form-group">
                                    <label for="select">Choose a category</label>
                                    <select class="form-control" id="select"></select>
                                </div>
                            </form>
                            <div class="modal-footer button-holder">
                                    <button class="btn btn-primary saveBookmark" onclick="onAddNewBookmark()" type="button">Save</button>
                                    <button class="btn btn-danger cancelCreatingBookmark" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function createSelectForm(category) {
    return `<option value="${category.id}">${category.name}</option>`
}

function refreshSelectList(data) {
    document.getElementById('select').innerHTML = data.map(item => createSelectForm(item)).join('');
}

$.get('app/categories.php', function (data) {
    listCategories = data.categories.map(item => item);
    refreshSelectList(listCategories);
});
// $('#select').find('option:checked').val();

document.getElementById('bookmarkForm').innerHTML = addBookmarkForm();

let myData = [];

$.get('app/bookmarks.php', function (data) {
    myData = data.bookmarks.map(item => item);
    getBookmarksList(myData);
});

$(document).ready(function () {
    loadHeaderForm();
});

function getBookmarksList(data) {
    document.getElementById('bookmarkList').innerHTML = data.map(item => generateTemplateItem(item)).join('');
}

function loadHeaderForm() {
    document.getElementById('title').innerHTML = templateTitleAndSearch();
}

function clearSearchField() {
    document.getElementById('myInput').value = "";
    getBookmarksList(myData);
}

function onSearch() {
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
}

function onUpdate(id) {
    let form = document.getElementById(`collapse${id}`);
    let nameElem = form.querySelector('.updateBookmarkName');
    let linkElem = form.querySelector('.updateBookmarkLink');
    let name = nameElem.value;
    let link = linkElem.value;
    $.post('app/bookmarks.php', {id: id, name: name, link: link, categoryid: '1', action: 'edit'}, function(data){
        myData = data.bookmarks.map(item => item);
        getBookmarksList(myData);
    });
}

function switchToUpdate() {
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
}

function hideModal() {
    $('#myModal').modal('hide');
}

function onAddNewBookmark() {
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
        hideModal();
        $.post('app/bookmarks.php', {name: name, link: link, categoryid: categoryId, action: 'add'}, function(data){
            myData = data.bookmarks.map(item => item);
            getBookmarksList(myData);
        });
    }
}

function onDeleteBookmark(id) {
    $.post('app/bookmarks.php', {id: id, action: 'delete'}, function(data){
        myData = data.bookmarks.map(item => item);
        getBookmarksList(myData);
    });
}