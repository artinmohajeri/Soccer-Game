if (!localStorage.getItem("team1_name") || !localStorage.getItem("team1_player1") || !localStorage.getItem("team1_player2") || !localStorage.getItem("team1_player3") || !localStorage.getItem("team1_goalkeaper") || !localStorage.getItem("team2_name") || !localStorage.getItem("team2_player1") || !localStorage.getItem("team2_player2") || !localStorage.getItem("team2_player3") || !localStorage.getItem("team2_goalkeaper")) {
    location.assign("./createGame.html");
}

const imageData = localStorage.getItem('team1_img');
const imageDisplay = document.querySelector("#team1-image");
imageDisplay.setAttribute("src", imageData);

const imageData2 = localStorage.getItem('team2_img');
const imageDisplay2 = document.querySelector("#team2-image");
imageDisplay2.setAttribute("src", imageData2);



const team1_goalkeaper = document.querySelector(".team1-goalkeaper")
const team1_player1 = document.querySelector(".team1-player1")
const team1_player2 = document.querySelector(".team1-player2")
const team1_player3 = document.querySelector(".team1-player3")

const team2_goalkeaper = document.querySelector(".team2-goalkeaper")
const team2_player1 = document.querySelector(".team2-player1")
const team2_player2 = document.querySelector(".team2-player2")
const team2_player3 = document.querySelector(".team2-player3")

const team1_name = document.querySelector(".team-name1");
const team2_name = document.querySelector(".team-name2");
const team1_color = document.querySelectorAll(".player-body-1");
const team2_color = document.querySelectorAll(".player-body-2");
const team1_img = document.querySelector(".team1-img");
const team2_img = document.querySelector(".team2-img");


team1_goalkeaper.setAttribute("title", `${localStorage.getItem("team1_goalkeaper")}`)
team1_player1.setAttribute("title", `${localStorage.getItem("team1_player1")}`)
team1_player2.setAttribute("title", `${localStorage.getItem("team1_player2")}`)
team1_player3.setAttribute("title", `${localStorage.getItem("team1_player3")}`)

team2_goalkeaper.setAttribute("title", `${localStorage.getItem("team2_goalkeaper")}`)
team2_player1.setAttribute("title", `${localStorage.getItem("team2_player1")}`)
team2_player2.setAttribute("title", `${localStorage.getItem("team2_player2")}`)
team2_player3.setAttribute("title", `${localStorage.getItem("team2_player3")}`)

team1_name.innerHTML = localStorage.getItem("team1_name")
team2_name.innerHTML = localStorage.getItem("team2_name")

team1_color.forEach(function (i) {
    i.style.background = localStorage.getItem("team1_color");
})
team2_color.forEach(function (i) {
    i.style.background = localStorage.getItem("team2_color");
})

const ball = document.querySelector(".ball");
const goalKeaper = document.querySelector(".team1-goalkeaper");
const players = document.querySelectorAll(".player");
const yard = document.querySelector(".yard");
let currentLeft = 0
let currentTop = 0
let currentBallLeft = 0
let currentBallTop = 0
let lock = false
let activePlayer = null
let activePlayerX = null
let activePlayerY = null
const playerPositions = new Map();

players.forEach(function (player) {
    playerPositions.set(player, { left: 0, top: 0 });
    player.addEventListener("click", function () {
        lock = false
        activePlayer = player;
    });
});

document.querySelector("#finish_btn").addEventListener("click", function () {
    localStorage.clear()
    location.assign("./createGame.html")
})


document.addEventListener("keydown", function (key) {
    if (activePlayer) {
        activePlayerX = activePlayer.getBoundingClientRect().x
        activePlayerY = activePlayer.getBoundingClientRect().y

        const currentPosition = playerPositions.get(activePlayer);
        let currentLeft = currentPosition.left;
        let currentTop = currentPosition.top;
        if (key.key === "Backspace") {
            activePlayer.style.display = "none"
            activePlayer.removeAttribute("title")
        }
        if (key.key === "ArrowRight") {
            if (activePlayerX < 1450) {
                currentLeft += 66
            }
        };
        if (key.key === "ArrowLeft") {
            if (activePlayerX > 60) {
                currentLeft -= 66
            }
        };
        if (key.key === "ArrowUp") {
            if (activePlayerY > 70) {
                currentTop -= 66
            }
        };
        if (key.key === "ArrowDown") {
            if (activePlayerY <= 600) {
                currentTop += 66
            }
        };
        if (key.key === "Home") {
            if (activePlayerY > 70 && activePlayerX > 60) {
                currentTop -= 66
                currentLeft -= 66
            }
        };
        if (key.key === "End") {
            if (activePlayerX > 60 && activePlayerY <= 600) {
                currentTop += 66
                currentLeft -= 66
            }
        };
        if (key.key === "PageUp") {
            if (activePlayerY > 70 && activePlayerX < 1450) {
                currentTop -= 66
                currentLeft += 66
            }
        };
        if (key.key === "PageDown") {
            if (activePlayerX < 1450 && activePlayerY <= 600) {
                currentTop += 66
                currentLeft += 66
            }
        };
        activePlayer.style.transform = `translate(${currentLeft}px, ${currentTop}px)`;

        playerPositions.set(activePlayer, { left: currentLeft, top: currentTop });
    }

});



document.addEventListener("click", function (event) {
    if (event.target.getAttribute("class") === "home") {
        activePlayer = null;
    }
});

function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt((dx * dx) + (dy * dy));
}

document.addEventListener("keydown", function (key) {
    const distance = calculateDistance(activePlayerX, activePlayerY, ball.getBoundingClientRect().x, ball.getBoundingClientRect().y);
    if (key.key === "l") {
        if (distance < 30) {
            lock = !lock
        }
    }
    if (!lock) {
        if (key.key === "a") {
            currentBallLeft -= 66
        }
        if (key.key === "d") {
            currentBallLeft += 66
        }
        if (key.key === "w") {
            currentBallTop -= 66
        }
        if (key.key === "x") {
            currentBallTop += 66
        }
        if (key.key === "q") {
            currentBallTop -= 66
            currentBallLeft -= 66
        };
        if (key.key === "z") {
            currentBallTop += 66
            currentBallLeft -= 66
        };
        if (key.key === "e") {
            currentBallTop -= 66
            currentBallLeft += 66
        };
        if (key.key === "c") {
            currentBallTop += 66
            currentBallLeft += 66
        };
        ball.style.transform = `translate(${currentBallLeft}px, ${currentBallTop}px)`;
    } else {
        if (key.key === "ArrowRight") {
            currentBallLeft += 66
        };
        if (key.key === "ArrowLeft") {
            currentBallLeft -= 66
        };
        if (key.key === "ArrowUp") {
            currentBallTop -= 66
        };
        if (key.key === "ArrowDown") {
            currentBallTop += 66
        };
        if (key.key === "Home") {
            currentBallTop -= 66
            currentBallLeft -= 66
        };
        if (key.key === "End") {
            currentBallTop += 66
            currentBallLeft -= 66
        };
        if (key.key === "PageUp") {
            currentBallTop -= 66
            currentBallLeft += 66
        };
        if (key.key === "PageDown") {
            currentBallTop += 66
            currentBallLeft += 66
        };
        ball.style.transform = `translate(${currentBallLeft}px, ${currentBallTop}px)`;

    }
})

