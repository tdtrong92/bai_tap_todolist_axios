
function getAllTask() {
    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
        responeType: "json"

    });

    var arrTaskToDo = [];
    var arrTaskToDone = [];


    // Ham xu ly thanh cong
    promise.then(function (result) {
        console.log("Ket qua", result.data);

        for (var i = 0; i < result.data.length; i++) {
            // Laays ra 1 task
            var task = result.data[i];
            //kiếm tra thuộc tính status của Object

            if (task.status == false) {
                // Xử lý thêm vào arrToDo
                arrTaskToDo.push(task);
            } else {
                // Xử lý thêm vào arrToDone
                arrTaskToDone.push(task);
            }
        }

        console.log("to do", arrTaskToDo);
        console.log("to done", arrTaskToDone);

        // Gọi hàm tạo ra giao diện task todo
        renderTaskToDo(arrTaskToDo);
        renderTaskToDone(arrTaskToDone);
    });

    // Ham xu ly that bai
    promise.catch(function (error) {
        console.log("ket qua that bai", error);
    })
}

getAllTask();


// Gọi hàm tạo ra giao diện task todo
function renderTaskToDo(arrToDo) {
    var contentToDo = "";
    for (var i = 0; i < arrToDo.length; i++) {
        var task = arrToDo[i];
        contentToDo += `
        <li>
        <span>${task.taskName}</span>
        <div class="text-right">
        <span onclick="delTask('${task.taskName}')" class="buttons" style="cursor: pointer"><i class="fa fa-trash"></i></span>
        <span onclick="doneTask('${task.taskName}')" class="buttons" style="cursor: pointer"><i class="fa fa-check"></i></span>
        </div>
        </li>
        `;
    };

    document.getElementById("todo").innerHTML = contentToDo;
}

function renderTaskToDone(arrDone) {
    var contentToDo = "";
    for (var i = 0; i < arrDone.length; i++) {
        var task = arrDone[i];
        contentToDo += `
        <li>
              <span>${task.taskName}</span>
              <div class="text-right">
                <span onclick="delTask('${task.taskName}')" class="buttons" style="cursor: pointer"><i class="fa fa-trash"></i></span>
                <span onclick="rejectTask('${task.taskName}')" class="buttons" style="cursor: pointer"><i class="fa fa-undo"></i></span>
              </div>
            </li>
        `;
    };

    document.getElementById("completed").innerHTML = contentToDo;
}
// add task

function addTask(task) {

    var promise = axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: task // data phai dung du lieu backend qui dinh
    });
    promise.then(function (result) {
        console.log(result.data);
        getAllTask()
    })
    promise.catch(function (error) {
        console.log("ket qua that bai", error);
    })
}

// định nghĩa sự kiện click thêm task 
document.getElementById("addItem").onclick = function () {
    // Lấy dữ liệu người dùng
    var taskName = document.getElementById("newTask").value;
    // Tạo ra object Backend yêu cầu
    var objectData = { taskName: taskName };
    // Gọi hàm add task thực thi
    addTask(objectData);

}

/**
 *  delete task
 */

window.delTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "DELETE",
    });

    promise.then(function (result) {
        console.log(result.data);
        getAllTask()
    });

    promise.catch(function (error) {
        console.log("ket qua that bai", error);
    })

}

window.doneTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "PUT",
    });

    promise.then(function (result) {
        console.log(result.data);
        getAllTask()
    });

    promise.catch(function (error) {
        console.log("ket qua that bai", error);
    })

}

window.rejectTask = function (taskName) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "PUT",
    });

    promise.then(function (result) {
        console.log(result.data);
        getAllTask()
    });

    promise.catch(function (error) {
        console.log("ket qua that bai", error);
    })

}


