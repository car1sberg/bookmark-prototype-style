// let myData = JSON.parse(dataFromJson);

let myData = [
    {
        "id": "0",
        "name": "Google",
        "link": "https://www.google.com",
        "description": "I love it"
    },
    {
        "id": "1",
        "name": "Facebook",
        "link": "https://www.facebook.com",
        "description": "I love it"
    },
    {
        "id": "2",
        "name": "Twitter",
        "link": "https://www.twitter.com",
        "description": "I love it"
    },
    {
        "id": "3",
        "name": "Youtube",
        "link": "https://www.youtube.com",
        "description": "I love it"
    }
];
// let myData = [];

// Add a list
$(document).ready(function () {
    // $.get('app/bookmarks.php', function (data) {
    //    console.log(data);
    //     myData = data;
    // });
    getBookmarksList();
});



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
                                   <li class="list-group-item"><textarea class="form-control updateDescription">${bookmark.description}</textarea></li>
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
                                    <input id="BkmName" type="text" class="form-control addBookmarkName">
                                </div>
                                <div class="form-group">
                                    <label for="BkmLink">Bookmark Link</label>
                                    <input id="BkmLink" type="text" class="form-control addBookmarkLink">
                                </div>
                                <div class="form-group">
                                    <label for="Descr">The Description</label>
                                    <textarea id="Descr" type="text" class="form-control addBookmarkDescription"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer button-holder">
                        <button class="btn btn-primary saveBookmark" onclick="onAddNewBookmark()">Save</button>
                        <button class="btn btn-danger cancelCreatingBookmark" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

document.getElementById('bookmarkForm').innerHTML = addBookmarkForm();



// Updating a bookmark
function onUpdate(id) {
    let form = document.getElementById(`collapse${id}`);
    let nameElem = form.querySelector('.updateBookmarkName');
    let linkElem = form.querySelector('.updateBookmarkLink');
    let descriptionElem = form.querySelector('.updateDescription');
    let name = nameElem.value;
    let link = linkElem.value;
    let description = descriptionElem.value;

    id = id.toString();
    for (let i = 0; i < myData.length; i++) {
        if (myData[i].id === id) {
            myData[i].name = name;
            myData[i].link = link;
            myData[i].description = description;
        }
    }
    getBookmarksList();
}

    // Close other opened bookmarks if edit is pressed
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


    // Add a Bookmark
function onAddNewBookmark() {
    let addBookmark = document.getElementById('addBookmarkForm');
    let nameElem = addBookmark.querySelector('.addBookmarkName');
    let linkElem = addBookmark.querySelector('.addBookmarkLink');
    let descriptionElem = addBookmark.querySelector('.addBookmarkDescription');
    let name = nameElem.value;
    let link = linkElem.value;
    let description = descriptionElem.value;

    myData.push({id: myData.length.toString(), name: name, link: link, description: description});
    getBookmarksList();
}


function getBookmarksList() {
    document.getElementById('bookmarkList').innerHTML = myData.map(item => generateTemplateItem(item)).join('');
}


    // Deleting a bookmark
function onDeleteBookmark(id) {
    id = id.toString();
    for (let i = 0; i < myData.length; i++) {
        if (myData[i].id === id) {
            myData.splice(i, 1);
        }
    }
    getBookmarksList();
}

/*
Додати спливаюче вікно з полями для додавання букмарки +
функції з дом елем вгорі, інші внизу  +
уникнути дублікату +
додати функцію для генерації масиву +
додати поле дескріпшн +
Доробити лінк ксс +-
пофіксив баг з видаленням нових букмарок +
при додаванні зникає форма +
додав плейсхолдери +
верстка кнопок і верстка полів +


збільшити кнопку додавання і в формі апдейта і кенсел +
сейв і кенсел по половині ширини +
додати дескріпшн +
 */


