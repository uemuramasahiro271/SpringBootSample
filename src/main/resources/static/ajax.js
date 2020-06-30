
window.onload = function() {
    ajaxGet("/loadAjax", function(data) { loadSuccess(data); });
}

function loadSuccess(dataArray) {

    for (let index = 0; index < dataArray.length; index++) {
        const data = dataArray[index];
        addRecord(data.id, data.userName, data.password);
    }
}

function addRecord(id, userName, password) {
    var $tr = $("<tr></tr>")
    $tr.append(createTdTag("id", id, id));
    $tr.append(createTdTag("userName", id, userName));
    $tr.append(createTdTag("password", id, password));
    $tr.append(createDeleteBtn("deleteBtn", id));
    $("#result_data").append($tr);
}

function createTdTag(name, id, text) {
    return $("<td></td>", {
        id: name + id,
        text: text
    })
}

function createDeleteBtn(name, id) {
    var $btn = $("<button></button>", {
        id: name + id,
        text: "削除"
    });

    $btn.click(function() {
        var $tr = $(this).parents("tr");
        var deleteId = $tr.children("#id" + id).text();
        var data = {id:deleteId};
        let json = JSON.stringify(data);
        console.log(json);
        ajaxPost("/deleteAjax", json, function() {
            $tr.remove();
         });
    });

    return $("<td></td>").append($btn);
}

$(function() {
    $("#ajax_btn").click(function() {
        $("#output_data").text("");
        ajaxGet("/test", function(data) { successTest(data); });
    });
});

function successTest(data) {
    console.log("success" + data.id);
    console.log("success" + data.userName);
    console.log("success" + data.password);

    $("#output_data").text("");
    for (let cnt = 0; cnt < data.length; cnt++) {
    	var text = "id[" + data[cnt].id + "] : " + "userName[" + data[cnt].userName + "] : " + "password[" + data[cnt].password + "] ; ";
    	var child = $("#list").append("<li>" + text + "</li>");
    }
}

$(function() {
    $("#addBtn").click(function() {
        var userName = $("#add_userName").val();
        var password = $("#add_password").val();

        $("#add_userName").val("");
        $("#add_password").val("");

        var data = {userName:userName, password:password};
        let json = JSON.stringify(data);

        ajaxPost("/addAjax", json, function(data) { addSuccess(data); });
    });
});

function addSuccess(data) {
    addRecord(data.id, data.userName, data.password);
}

function error(XMLHttpRequest, textStatus, errorThrown) {
    console.log("error" + XMLHttpRequest);
    console.log("status" + textStatus);
    console.log("thrown" + errorThrown);
}

function ajaxGet(url, successFuction) {
    $.ajax({
        type     : "GET",
        url      : url,
        dataType : "json",
        success  : successFuction,
        error    : function(XMLHttpRequest, textStatus, errorThrown) { error(XMLHttpRequest, textStatus, errorThrown); }
    });
}

function ajaxPost(url, data, successFuction) {
    $.ajax({
        type     : "POST",
        url      : url,
        contentType: 'application/json',
        dataType : "json",
        data     : data,
        success  : successFuction,
        error    : function(XMLHttpRequest, textStatus, errorThrown) { error(XMLHttpRequest, textStatus, errorThrown); }
    });
}