        var userData = [];
                 // Function to add a new user to the array
        function addUser(email, password) {
            userData.push({ email: email, password: password });
        }
    
        // Check if user data exists in local storage and load it
        var storedData = localStorage.getItem("userData");
        if (storedData) {
            userData = JSON.parse(storedData);
        } else {
            // If no data exists, store the initial data
            localStorage.setItem("userData", JSON.stringify(userData));
        }
// function to check log in page functionality
 function validate() {
            var passwordAddon = document.getElementById("password-addon");
            var emailInput = document.getElementById("email").value;
            var passwordInput = document.getElementById("password").value;
            // Check if the email and password match any user in the array
            var userFound = false;
    
            for (var i = 0; i < userData.length; i++) {
                if (userData[i].email === emailInput && userData[i].password === passwordInput) {
                    localStorage.setItem("loggedUser",JSON.stringify(userData[i]))
                    // Show success alert
                    document.getElementById("successAlert").style.display = "block";
                    passwordAddon.innerHTML = '<i class="glyphicon glyphicon-eye-open"></i>';
                    setTimeout(function () {
                        window.location.href = "homepage.html";
                    }, 2000); // Redirect after 2 seconds
                    userFound = true;
                    break;
                }
            }
    
            if (!userFound) {
                // Show danger alert
                document.getElementById("dangerAlert").style.display = "block";
                passwordAddon.innerHTML = '<i class="glyphicon glyphicon-lock"></i>';
                // Hide the danger alert after 2.5 seconds (2500 milliseconds)
                setTimeout(function () {
                    document.getElementById("dangerAlert").style.display = "none";
                }, 2500);
            }
    
            return false; // Prevent the form from submitting
        }
// function to implement change password
function changePassword() {
            var emailInput = document.getElementById("fEmail").value;
            var passwordInput = document.getElementById("newPassword").value;
            var confirmPasswordInput = document.getElementById("confirmNewPassword").value;
            
            var passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{8,}$/;
            var tt=true;
    if(!passwordPattern.test(passwordInput)){
        document.getElementById("newPassword").style.border="1px solid red";
        document.getElementById("newPasswordError").textContent="password must be alphanumeric with minimum 8 character";
        setTimeout(function(){

            document.getElementById("newPassword").style.border="1px solid grey";
            document.getElementById("newPasswordError").textContent="";
        },6000);
        tt=false;
    }
    if(!passwordPattern.test(confirmPasswordInput)){
        document.getElementById("confirmNewPassword").style.border="1px solid red";
        document.getElementById("confirmNewPasswordError").textContent="password must be alphanumeric with minimum 8 character";
        setTimeout(function(){

            document.getElementById("confirmNewPassword").style.border="1px solid grey";
            document.getElementById("confirmNewPasswordError").textContent="";
        },6000);
        tt=false;
    }
    if(tt){
            var user = false;
            if (passwordInput === confirmPasswordInput) {
                for (var i = 0; i < userData.length; i++) {
                    if (userData[i].email === emailInput) {
                        // Show success alert
                        user = true;
                        userData[i].password = confirmPasswordInput;
                        localStorage.setItem("loggedUser",JSON.stringify(userData[i]))
                        // Update the local storage with the modified data
                        localStorage.setItem("userData", JSON.stringify(userData));
                        document.getElementById("forgotSuccessAlert").style.display = "block";
    
                        setTimeout(function () {
                            window.location.href = "login4.html";
                            
                        }, 2000); // Redirect after 6 seconds
                    }
                }
                if (!user) {
                    document.getElementById("forgotDangerAlert1").style.display = "block";
                    console.log("first");
                    setTimeout(function () {
                        document.getElementById("forgotDangerAlert1").style.display = "none";
                    }, 5000);
                }
            } else {
                document.getElementById("forgotDangerAlert2").style.display = "block";
                setTimeout(function () {
                    document.getElementById("forgotDangerAlert2").style.display = "none";
                }, 5000);
            }
        }
        }
// function to show users details
function viewDetails(){
    
        // Retrieve the current user's data from local storage
        var currentUserData = JSON.parse(localStorage.getItem("loggedUser"));
    
        if (currentUserData) {
            // Fill the modal with user profile data
            document.getElementById("profileName").textContent = currentUserData.name;
            document.getElementById("profileEmail").textContent = currentUserData.email;
            document.getElementById("profileAddress").textContent = currentUserData.address;
            document.getElementById("profilePhone").textContent = currentUserData.phone;
            document.getElementById("profileDOB").textContent = currentUserData.dob;
    
            // Show the profile modal
            setTimeout(function () {
                $('#viewProfileModal').modal('show');
            }, 5000);
            
        }
        
    }
// code to show current data of user at edit profile page  
    var currentUserData = JSON.parse(localStorage.getItem("loggedUser"));
        if(currentUserData){
            var emailInput = document.getElementById("editProfileEmail");
            var nameInput = document.getElementById("editProfileName");
            var addressInput = document.getElementById("editProfileAddress");
            var phoneInput = document.getElementById("editProfilePhone");
            var dobInput = document.getElementById("editProfileDOB");
            emailInput.value = currentUserData.email;
            nameInput.value = currentUserData.name;
            addressInput.value = currentUserData.address;
            phoneInput.value = currentUserData.phone;
            dobInput.value=currentUserData.dob;
        }
// function to reset the edit profile input field if user doesnt click on save changes and close it
function closeButton(){
    var currentUserData = JSON.parse(localStorage.getItem("loggedUser"));
        if(currentUserData){
            var emailInput = document.getElementById("editProfileEmail");
            var nameInput = document.getElementById("editProfileName");
            var addressInput = document.getElementById("editProfileAddress");
            var phoneInput = document.getElementById("editProfilePhone");
            var dobInput = document.getElementById("editProfileDOB");
            emailInput.value = currentUserData.email;
            nameInput.value = currentUserData.name;
            addressInput.value = currentUserData.address;
            phoneInput.value = currentUserData.phone;
            dobInput.value=currentUserData.dob;
}
}
// function to edit profile
function editProfile(){
    var tempEmail=document.getElementById("editProfileEmail");
    var tempName=document.getElementById("editProfileName");
    var tempAddress=document.getElementById("editProfileAddress");
    var tempPhone=document.getElementById("editProfilePhone");
    var tempDOB=document.getElementById("editProfileDOB");
    var tt=true;
    // check email format
    var emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if(!emailPattern.test(tempEmail.value)){
        document.getElementById("editProfileEmail").style.border="1px solid red";
        document.getElementById("editEmailError").textContent="Email should be in the localpart@domain.top_level_domain format";
        tt=false;
    }
    // check name format
    var namePattern= /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!namePattern.test(tempName.value)){
        document.getElementById("editProfileName").style.border="1px solid red";
        document.getElementById("editNameError").textContent="Name should be first name space last name";
        tt=false;
        
    }
    //check date of birth
    if (new Date(tempDOB.value) > new Date("2019-12-31")) {
        document.getElementById("editProfileDOB").style.border = "1px solid red";
        document.getElementById("editDOBError").textContent = "Date of birth should be on or before December 31, 2019";
        tt = false;
    }
    // check address pattern
    var addressPattern = /^[a-zA-Z0-9\s.,'-]+$/;
    if(!addressPattern.test(tempAddress.value)){
        document.getElementById("editProfileAddress").style.border="1px solid red";
        document.getElementById("editAddressError").textContent="Address should not contain special character";
        tt=false;
    }
    // check phone format
    var phonePattern = /^\d{10}$/;
    if(!phonePattern.test(tempPhone.value)){
        document.getElementById("editProfilePhone").style.border="1px solid red";
        document.getElementById("editPhoneError").textContent="Phone number should be 10 digits number";
        tt=false;
    }
    if(tt){
    for (var i = 0; i < userData.length; i++) {

        if (userData[i].email === currentUserData.email) {
            // Show success alert
            userData[i].email = tempEmail.value;
            userData[i].name =tempName.value;
            userData[i].address = tempAddress.value;
            userData[i].phone = tempPhone.value;
            userData[i].dob = tempDOB.value;
            // Update he local storage with the modified data
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("loggedUser",JSON.stringify(userData[i]))
            document.getElementById("editSuccessAlert").style.display = "block";

            setTimeout(function () {
                window.location.href = "homepage.html";
            }, 4000); // Redirect after 4 seconds
        }
    }
}
}
// function to implement sign up functionality
function signUpUser() {
    var emailTemp = document.getElementById("signEmail").value;
    var nameTemp = document.getElementById("signName").value;
    var addressTemp = document.getElementById("signAddress").value;
    var phoneTemp = document.getElementById("signPhone").value;
    var dobTemp = document.getElementById("signDOB").value;
    var passwordTemp = document.getElementById("signPassword").value;
    var userAlreadyExist = false;
    var tt=true
    // Get the email input field and error message element
    var emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if(!emailPattern.test(emailTemp)){
        document.getElementById("signEmail").style.border="1px solid red";
        document.getElementById("signEmailError").textContent="Email should be in the abc@xyz.domain format";
        setTimeout(function(){

            document.getElementById("signEmail").style.border="1px solid grey";
        document.getElementById("signEmailError").textContent="";
        },6000);
        tt=false;
    }
     // check name format
     var namePattern= /^[a-zA-Z]+ [a-zA-Z]+$/;
     if(!namePattern.test(nameTemp)){
         document.getElementById("signName").style.border="1px solid red";
         document.getElementById("signNameError").textContent="Name should be first name space last name";
         setTimeout(function(){

            document.getElementById("signName").style.border="1px solid grey";
            document.getElementById("signNameError").textContent="";
        },6000);
         tt=false;
         
     }
     if (new Date(dobTemp)> new Date("2019-12-31")) {
         document.getElementById("signDOB").style.border = "1px solid red";
         document.getElementById("signDOBError").textContent = "Date of birth should be on or before December 31, 2019";
         setTimeout(function(){

            document.getElementById("signDOB").style.border = "1px solid grey";
            document.getElementById("signDOBError").textContent = "";
        },6000);
         tt = false;
     }
     // check address pattern
     var addressPattern = /^[a-zA-Z0-9\s.,'-]+$/;
     if(!addressPattern.test(addressTemp)){
         document.getElementById("signAddress").style.border="1px solid red";
         document.getElementById("signtAddressError").textContent="Address should not contain special character";
         setTimeout(function(){

            document.getElementById("signAddress").style.border="1px solid grey";
         document.getElementById("signAddressError").textContent="";
        },6000);
         tt=false;
     }
     // check phone format
     var phonePattern = /^\d{10}$/;
     if(!phonePattern.test(phoneTemp)){
         document.getElementById("signPhone").style.border="1px solid red";
         document.getElementById("signPhoneError").textContent="Phone number should be 10 digits number";
         setTimeout(function(){

            document.getElementById("signPhone").style.border="1px solid grey";
            document.getElementById("signPhoneError").textContent="";
        },6000);
         tt=false;
     }
     var passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if(!passwordPattern.test(passwordTemp)){
        document.getElementById("signPassword").style.border="1px solid red";
        document.getElementById("signPasswordError").textContent="password must be alphanumeric with minimum 8 character";
        setTimeout(function(){

            document.getElementById("signPassword").style.border="1px solid grey";
            document.getElementById("signPasswordError").textContent="";
        },6000);
        tt=false;
    }
     if(tt){

    for (var i = 0; i < userData.length; i++) {
        if (userData[i].email === emailTemp) {
            userAlreadyExist = true;
        }
        if (userAlreadyExist) {
            
            document.getElementById("emailErrorMessage").style.display = "block";
            setTimeout(function () {
                document.getElementById("emailErrorMessage").style.display = "none";
             }, 3000);
            return;
        }
    }

    userData.push({
        email: emailTemp,
        password: passwordTemp,
        name: nameTemp,
        address: addressTemp,
        phone: phoneTemp,
        dob: dobTemp
    });
    localStorage.setItem("userData", JSON.stringify(userData));

    document.getElementById("regSuccessMessage").style.display = "block";
    setTimeout(function () {
        document.getElementById("regSuccessMessage").style.display = "none";
     }, 3000);
    
    setTimeout(function () {
        redirectToLogin4();
     }, 3000);
     }
    
    
}
// log out function
function logout() {
    // Remove user data from local storage
    localStorage.removeItem("loggedUser");
    
    // Replace the current page with the login page in the browser's history
    window.location.replace("login4.html"); // Change the URL to your login page
    // Clear the browser's session history
    history.replaceState(null, null, "login4.html");

}


$(document).ready(function () {
    // Add a click event listener to the modal backdrop
    $('.modal').on('click', function (e) {
      if ($(e.target).hasClass('modal')) {
        // If the click occurred outside the modal, refresh the page
        location.reload();
      }
    });
  });

 

  function redirectToLogin4() {
    window.location.href = "login4.html";
  }
  function resetForm() {
    document.getElementById("forgotPasswordForm").reset();
}
function resetForm1() {
    document.getElementById("editProfileForm").reset();
}
        

    