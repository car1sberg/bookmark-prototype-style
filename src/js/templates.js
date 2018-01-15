function templateTitleAndSearch() {
    return `<div class="row headerInfo">
                <div class="col-md-4">
                    <h3>Bookmark Manager</h3>
                    <p id="copyright">created by Volodymyr Ersteniuk</p>
                </div>
                <div class="col-md-8 searchField">
                    <input class="form-control" type="text" id="myInput" onkeyup="dom.onSearch()" 
                    placeholder="Search bookmarks..">
                    <button class="btn clearSearchFieldBtn" onclick="dom.clearSearchField()">Clear Up</button>
                </div>
            </div>`
}

function generateTemplateItem(bookmark) {
    return `<div class="container wholeForm" id="emptyCategory">
                   <div class="panel-group">
                      <div class="panel panel-default">
                           <div class="panel-heading">
                               <div class="panel-title panelToDelete">
                                   <a href="${bookmark.link}">${bookmark.name}</a>
                                   <a><span class="glyphicon glyphicon-remove close" onclick="dom.onDeleteBookmark(${bookmark.id})"></span></a>
                                   <a data-toggle="collapse" href="#collapse${bookmark.id}"><span class="glyphicon glyphicon-pencil edit" onclick="dom.switchToUpdate()"></span></a>
                               </div>
                           </div>
                           <div id="collapse${bookmark.id}" class="panel-collapse collapse">
                               <ul class="list-group" id="inputValues">
                                   <li class="list-group-item"><input class="form-control updateBookmarkName" type="text" value="${bookmark.name}"></li>
                                   <li class="list-group-item"><input class="form-control updateBookmarkLink" type="text" value="${bookmark.link}"></li>
                               </ul>
                               <button class="btn btn-primary updateButton" onclick="dom.bookmarkOnUpdate(${bookmark.id})">Update</button>
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
                                    <button class="btn btn-primary saveBookmark" onclick="dom.onAddNewBookmark()" type="button">Save</button>
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

function generateCategoryTemplate(category) {
    return `<button type="button" class="list-group-item activeCategory" onclick="dom.activeCategory(${category.id})">
        ${category.name}
        <a>
            <span id="categoryID" class="glyphicon glyphicon-remove close" onclick="dom.deleteCategory(${category.id})"></span>
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