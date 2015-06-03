
    function getServerList() {
        console.log('in getServerList');
        $.ajax({

            url: '../assets/get_todo_items.js',
            dataType: 'json',
            crossDomain: true,
            cache: false,
            success: function(response) {

                console.log('response: ' + response);
                window.todo_objects = response;
                generateList(todo_objects);
                $('.task_list_container').on('click', '.task_entry', function() {
                    console.log('in reveal task handler')
                    console.log('this: ' + $(this));

                    var current_index = $(this).attr('index_id');
                    var target_id = '#task_details' + current_index;

                    console.log('this: ' + $(this).attr('index_id'));
                    $(target_id).toggleClass('shown_task_details');

                })

            }

        })
    }

    function deleteTask() {
        console.log('in deleteTask')
        $('.task_list_container').on('click', '.delete_task', function() {
            console.log('id of this: ', $(this));

            var current_index = $(this).attr('index_id');
            var target_id = '#task' + current_index;

            console.log('this: ' + $(this).attr('index_id'));
            $(target_id).remove();
            delete todo_objects[current_index];
        })
    }

    function taskComplete() {
        $('.task_list_container').on('click', '.completed_task', function() {
            console.log('id of this: ', $(this));

            var current_index = $(this).attr('index_id');
            var target_id = '#task' + current_index;


            console.log('this: ' + $(this).attr('index_id'));
            $(target_id).addClass('task_details')
            $('.task_completed_container').append($(target_id));

        })
    }

    function showCompleted() {
        console.log('in showCompleted');
        $('.task_completed_container').click(function() {
            $('.task_list').toggleClass('shown_task_details');
        })
    }

    function generateList(todo_object_arr) {

        console.log('in generateList')
        for (var i = 0; i < todo_object_arr.length; i++) {
            console.log('in for loop');
            var task_list_entry = $('<div>', {
                class: 'task_list col-xs-12',
                id: 'task' + todo_object_arr[i].id,
            });
            var task_title = $('<li>', {
                text: todo_object_arr[i].title,
                class: 'task_entry col-xs-6',
                index_id: todo_object_arr[i].id,

            });
            var edit_button = $('<button>', {
                text: 'Edit',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 edit_task',

            });
            var delete_button = $('<button>', {
                text: 'Delete',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 delete_task',
                id: 'delete' + todo_object_arr[i].id,
                index_id: todo_object_arr[i].id,

            });
            var task_complete = $('<button>', {
                text: 'Completed',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 completed_task',
                id: 'complete' + todo_object_arr[i].id,
                index_id: todo_object_arr[i].id,

            });


            var details_div = $('<div>', {
                id: 'task_details' + todo_object_arr[i].id,
                class: 'task_details col-xs-12',

            });

            var details_span = $('<span>', {
                text: todo_object_arr[i].details,
                class: 'col-xs-6',
                contenteditable: 'true',

            });

            var initial_time = $('<span>', {
                text: 'Made: ' + todo_object_arr[i].timeStamp,
                class: 'col-xs-2 col-xs-offset-1',
                contenteditable: 'true',
            });

            var due_time = $('<span>', {
                text: 'Due: time_due',
                class: 'col-xs-2 col-xs-offset-1',
                contenteditable: 'true',
            });


            details_div.append(details_span, initial_time, due_time);


            task_list_entry.append(task_title, edit_button, delete_button, task_complete);
            task_list_entry.append(details_div);
            $('.task_list_container').append(task_list_entry);


        }
    }


    function createTask() {
        var new_task = Object.create({});
        new_task.title = $('#new_title').val();
        new_task.details = $('#new_details').val();
        new_task.timeStamp = timeStamp();
        new_task.id = 4;
        new_task.user_id = 1;
        console.log('new_task: ', new_task);
        todo_objects.push(new_task);

        var task_list_entry = $('<div>', {
                class: 'task_list col-xs-12',
                id: 'task' + new_task.id,
            });
            var task_title = $('<li>', {
                text: new_task.title,
                class: 'task_entry col-xs-6',
                index_id: new_task.id,

            });
            var edit_button = $('<button>', {
                text: 'Edit',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 edit_task',

            });
            var delete_button = $('<button>', {
                text: 'Delete',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 delete_task',
                id: 'delete' + new_task.id,
                index_id: new_task.id,

            });
            var task_complete = $('<button>', {
                text: 'Completed',
                type: 'button',
                class: 'col-xs-1 col-sm-offset-1 completed_task',
                id: 'complete' + new_task.id,
                index_id: new_task.id,

            });


            var details_div = $('<div>', {
                id: 'task_details' + new_task.id,
                class: 'task_details col-xs-12',

            });

            var details_span = $('<span>', {
                text: new_task.details,
                class: 'col-xs-6',
                contenteditable: 'true',

            });

            var initial_time = $('<span>', {
                text: 'Made: ' + new_task.timeStamp,
                class: 'col-xs-2 col-xs-offset-1',
                contenteditable: 'true',
            });

            var due_time = $('<span>', {
                text: 'Due: time_due',
                class: 'col-xs-2 col-xs-offset-1',
                contenteditable: 'true',
            });


            details_div.append(details_span, initial_time, due_time);


            task_list_entry.append(task_title, edit_button, delete_button, task_complete);
            task_list_entry.append(details_div);
            $('.task_list_container').append(task_list_entry);


    }

    function timeStamp() {
        // Create a date object with the current time
        var now = new Date();

        // Create an array with the current month, day and time
        var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

        // Create an array with the current hour, minute and second
        var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

       

        // Convert hour from military time
        time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

        // If hour is 0, set it to 12
        time[0] = time[0] || 12;

        // If seconds and minutes are less than 10, add a zero
        for (var i = 1; i < 3; i++) {
            if (time[i] < 10) {
                time[i] = "0" + time[i];
            }
        }

        // Return the formatted string
        return date.join("/") + " " + time.join(":");
    }

    $(document).ready(function() {
        getServerList();
        taskComplete();
        deleteTask();
        showCompleted();



    });
