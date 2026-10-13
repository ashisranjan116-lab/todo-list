const addUserBtn = document.getElementById('addUser');    //accessing the element and stored into a variable 
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray= [];   //actually storing the data in a array format
let edit_id=null;

let objStr = localStorage.getItem('users');    //in objstr it get the value of useers in localstorage which store before
if (objStr!= null){
userArray = JSON.parse(objStr);             //it converts the objStr normal text to string which js understood
}

DisplayInfo();
//add user button click

addUserBtn.onclick=()=>{            //click event on addUSerBtn

 const name =   usernameTextField.value;     //in name it store the username value
 if(edit_id!=null){
  //edit
  userArray.splice(edit_id,1,{'name':name});  //if edit_id is not null then delete the last one and add the edit one
  edit_id =  null;

 }
 else{
  //insert
  userArray.push({'name' : name});   //if null then simply add that
 }
 
SaveInfo(userArray);
usernameTextField.value ='';
addUserBtn.innerText = btnText;
}

function SaveInfo(userArray){
  let str = JSON.stringify(userArray);  //userarray converts into string for local storage
  localStorage.setItem('users', str);   //store in localstorage
  DisplayInfo();
}

function DisplayInfo(){
  let statement = '';
  userArray.forEach((user, i) => {
    statement += ` <tr>
      <th scope="row">${i+1}</th>
      <td>${user.name}</td>
      <td><i class="btn text-white fa-solid fa-pen-to-square btn-info mx-3" onclick='EditInfo(${i})'></i><i class="btn fa-solid fa-trash " onclick='DeleteInfo(${i})'></i></td>
    </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}


function EditInfo(id){
   edit_id = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id){
    userArray.splice(id,1);
    SaveInfo(userArray);
    
}
        