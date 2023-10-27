
function submit() {
    localStorage.clear()
    const alert = document.querySelector(".alert");
    const team1_img = document.querySelector("#image");
    const team1_name = document.querySelector("#name").value.trim().toLowerCase();
    const team1_color = document.querySelector("#color").value.trim().toLowerCase();
    const team1_player1 = document.querySelector("#team1_player1").value.trim().toLowerCase();
    const team1_player2 = document.querySelector("#team1_player2").value.trim().toLowerCase();
    const team1_player3 = document.querySelector("#team1_player3").value.trim().toLowerCase();
    const team1_goalkeaper = document.querySelector("#team1_goalkeaper").value.trim().toLowerCase();

    const team2_img = document.querySelector("#image2");
    const team2_name = document.querySelector("#name2").value.trim().toLowerCase();
    const team2_color = document.querySelector("#color2").value.trim().toLowerCase();
    const team2_player1 = document.querySelector("#team2_player1").value.trim().toLowerCase();
    const team2_player2 = document.querySelector("#team2_player2").value.trim().toLowerCase();
    const team2_player3 = document.querySelector("#team2_player3").value.trim().toLowerCase();
    const team2_goalkeaper = document.querySelector("#team2_goalkeaper").value.trim().toLowerCase();

    if (team1_name.length > 0 && team1_color.length > 0 && team1_player1.length > 0 && team1_player2.length > 0 && team1_player3.length > 0 && team1_goalkeaper.length > 0 && team2_name.length > 0 && team2_color.length > 0 && team2_player1.length > 0 && team2_player2.length > 0 && team2_player3.length > 0 && team2_goalkeaper.length > 0) {

        alert.innerHTML = "You have completed the form successfuly!!";
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.classList.remove("d-none");


        const file = team1_img.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataURL = event.target.result;
            localStorage.setItem('team1_img', dataURL);
        };
        reader.readAsDataURL(file);


        const file2 = team2_img.files[0];
        const reader2 = new FileReader();
        reader2.onload = function (event) {
            const dataURL = event.target.result;
            localStorage.setItem('team2_img', dataURL);
        };
        reader2.readAsDataURL(file2);



        location.assign("./soccer.html");
        localStorage.setItem("team1_name", team1_name);
        localStorage.setItem("team1_color", team1_color);
        localStorage.setItem("team1_player1", team1_player1);
        localStorage.setItem("team1_player2", team1_player2);
        localStorage.setItem("team1_player3", team1_player3);
        localStorage.setItem("team1_goalkeaper", team1_goalkeaper);
        localStorage.setItem("team2_name", team2_name);
        localStorage.setItem("team2_color", team2_color);
        localStorage.setItem("team2_player1", team2_player1);
        localStorage.setItem("team2_player2", team2_player2);
        localStorage.setItem("team2_player3", team2_player3);
        localStorage.setItem("team2_goalkeaper", team2_goalkeaper);




    } else {
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.add("d-none");
        }, 5000);
    };


};

document.querySelector("button").addEventListener("click", submit);
