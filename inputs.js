var addid = 0;

function addInput(id) {
    
    var addList = document.getElementById('addlist');
    var docstyle = addList.style.display;
    if (docstyle == 'none') addList.style.display = '';

    addid++;
    
    var text = document.createElement('div');
    text.id = 'additem_' + addid;
    text.innerHTML = "<input type='text' value='' class='buckinput' name='items[]' style='padding:5px;' /> <a href='javascript:void(0);' onclick='addInput(" + addid + ")' id='addlink_" + addid + "'>add more</a>";

    addList.appendChild(text);
}

addInput(1);
