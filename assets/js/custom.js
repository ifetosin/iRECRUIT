var users = [
  {
    id: 1,
    name: "Salako Iyanu",
    role: "HR User"
  },
  {
    id: 2,
    name: "Enitan Ajayi",
    role: "Admin"
  },
  {
    id: 3,
    name: "Uche Jombo",
    role: "HR User"
  },
  {
    id: 4,
    name: "Hassan Ali",
    role: "Admin"
  },
  {
    id: 5,
    name: "Oke Okin",
    role: "HR User"
  },
  {
    id: 6,
    name: "Olu Jacobs",
    role: "Admin"
  }
];


$.each(users, function(i, user) {
  appendToUsrTable(user);
});

$("form").submit(function(e) {
  e.preventDefault();
});

$("form#addUser").submit(function() {
  var user = {};
  var nameInput = $('input[name="name"]').val().trim();
  var addressInput = $('input[name="address"]').val().trim();
  var ageInput = $('input[name="age"]').val().trim();
  if (nameInput && addressInput && ageInput) {
    $(this).serializeArray().map(function(data) {
      user[data.name] = data.value;
    });
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;

    addUser(user);
  } else {
    alert("All fields must have a valid value.");
  }
});

function addUser(user) {
  users.push(user);
  appendToUsrTable(user);
}

function editUser(id) {
  users.forEach(function(user, i) {
    if (user.id == id) {
      $(".modal-body").empty().append(`
                <form id="updateUser" action="">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" name="name" value="${user.name}"/>
                    <label for="address">Address</label>
                    <input class="form-control" type="text" name="address" value="${user.address}"/>
                    <label for="age">Age</label>
                    <input class="form-control" type="number" name="age" value="${user.age}" min=10 max=100/>
            `);
      $(".modal-footer").empty().append(`
                    <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </form>
            `);
    }
  });
}

function deleteUser(id) {
  var action = confirm("Are you sure you want to delete this user?");
  var msg = "User deleted successfully!";
  users.forEach(function(user, i) {
    if (user.id == id && action != false) {
      users.splice(i, 1);
      $("#userTable #user-" + user.id).remove();
      flashMessage(msg);
    }
  });
}

function updateUser(id) {
  var msg = "User updated successfully!";
  var user = {};
  user.id = id;
  users.forEach(function(user, i) {
    if (user.id == id) {
      $("#updateUser").children("input").each(function() {
        var value = $(this).val();
        var attr = $(this).attr("name");
        if (attr == "name") {
          user.name = value;
        } else if (attr == "address") {
          user.address = value;
        } else if (attr == "age") {
          user.age = value;
        }
      });
      users.splice(i, 1);
      users.splice(user.id - 1, 0, user);
      $("#userTable #user-" + user.id).children(".userData").each(function() {
        var attr = $(this).attr("name");
        if (attr == "name") {
          $(this).text(user.name);
        } else if (attr == "address") {
          $(this).text(user.address);
        } else {
          $(this).text(user.age);
        }
      });
      $(".modal").modal("toggle");
      flashMessage(msg);
    }
  });
}

function flashMessage(msg) {
  $(".flashMsg").remove();
  $(".row").prepend(`
        <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
    `);
}

function appendToUsrTable(user) {
  $("#userTable > tbody:last-child").append(`
        <tr id="user-${user.id}">
            <td class="userData" name="name">${user.name}</td>
            '<td class="userData" name="address">${user.address}</td>
            '<td id="tdAge" class="userData" name="age">${user.age}</td>
            '<td align="center">
                <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
            </td>
            <td align="center">
                <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
        </tr>
    `);
}


// Data Table Logic
$(document).ready(function () {
  $('.dTable').DataTable();
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

//Apply Page Validation
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if (validateEmail(email)) {
    $result.text(email + " is valid :)");
    $result.css("color", "green");
  } else {
    $result.text(email + " is not valid :(");
    $result.css("color", "red");
  }
  return false;
}

$("#email").on("input", validate);

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});



//Dashboard chart
$(document).ready(function () {
  var ctx = $("#chart-line");
  var myLineChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Pending", "Successful", "Rejected"],
      datasets: [{
        data: [500, 200, 300],
        backgroundColor: ["#FFBF00", "#556b2f", "#8d0e0e"]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Weather'
      }
    }
  });
});