let form = document.getElementById('form');
let firstName = document.getElementById('first_name').value;
let lastName = document.getElementById('last_name').value;
let street = document.getElementById('street').value;
let address = document.getElementById('address').value;
let city = document.getElementById('city').value;
let state = document.getElementById('state').value;
let email = document.getElementById('email').value;
let phone = document.getElementById('phone').value;
let input = {
  firstName: firstName, lastName: lastName, street: street, address: address, city: city, state: state, email: email, phone: phone
}
let msg = document.getElementById('msg');
let tasklist = document.getElementById('task_list');
let edit = document.getElementById("edit");
let output = '';
let url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Clicked");
    formValidation();
})
let formValidation = () => {
      console.log("Success");
      console.log(input);
      msg.innerHTML = "";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: input.value
        })
      }) 
        .then(response => response.json())
        .then(data => {
          let dataArr = [];
          dataArr.push(data);
          renderTasks(dataArr);
          input.value = '';
        })
};



let removeTask = (id) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          var data = JSON.stringify({
            "_id": `${e.target.parentElement.parentElement.dataset.id}`
        });
      
        var config = {
          method: 'delete',
          url: url,
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .then(() => location.reload())
        .catch(function (error) {
          console.log(error);
        });
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    
}

let editTask = (e) => {
    if(e.textContent == "Done") {
        e.textContent = "Edit";
        let currTaskName = e.previousElementSibling.value;
        let currHeading = document.createElement('h5');
        currHeading.className = "flex-grow-1";
        currHeading.textContent = currTaskName;
        e.parentElement.replaceChild(currHeading, e.previousElementSibling);
    }
    else {
        e.textContent = "Done";
        let currTaskName = e.previousElementSibling.textContent;
        let currInput = document.createElement('input');
        currInput.type = "text";
        currInput.id = "input";
        currInput.value = currTaskName;
        e.parentElement.replaceChild(currInput, e.previousElementSibling);
    }
  }


fetch(url)
	.then((response) => {
    return response.json();
  })
  .then(data => renderTasks(data))


  let renderTasks = (task) => {
    task.forEach(task => {
      console.log(task);
      output += `<tr>
      <th scope="row">${task.first_name}</th>
      <td>${task.last_name}</td>
      <td>${task.address}</td>
      <td>${task.city}</td>
      <td>${task.state}</td>
      <td>${task.email}</td>
      <td>${task.phone}</td>
      <td>
      <img src='https://cdn1.iconfinder.com/data/icons/interface-elements/32/remove-circle-512.png' width="20px" height="20px" onclick="removeTask(${task.uuid})">
      <img src='https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-1024.png' width="20px" height="20px" onclick="editTask(${task.uuid})">
      </td>
    </tr>`
    });
    tasklist.innerHTML = output;
  }
  
  let completedTasks = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {   
        renderTasks(data);
    })
    
  }

  var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  