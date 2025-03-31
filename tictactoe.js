let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
// console.log(boxes);
// nếu như get element by classname thf không thể có html collection được nên dùng class để tạo ra 1 list html collection sau đó chuyển nó sang 1 mảng aray
//nếu là html collection thì không chạy vòng lặp mảng được nên phải chuyển nó sang 1 mảng array
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
  //tìm hiểu câu này nghĩa là gì??
);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;
let SPACES = Array(9).fill(null);
// for (let i = 0; i < SPACES.length; i++) {
//   SPACES[i] = null;
//   console.log(typeof SPACES[i]);
// }

let count_plays = 0;
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  //tìm hiểu foreach là gì?Tính năng ES5//thực hiện trực tiếp vòng lặp treenmarng đã tòn tại
};

function boxClicked(e) {
  // console.log(e.target.id);
  //id là do người đặt trong thẻ div chứ không chạy theo thứ tự trên mảng
  const id = e.target.id;

  if (!SPACES[id] && count_plays < 9) {
    //CÓ THỂ XÉT SPACE[ID] bất kỳ mà không cần chạy vòng lặp và không cần phải theo thứ tự từ vị trí [0]
    SPACES[id] = currentPlayer;
    // console.log(typeof SPACES[id]);
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won`;
      let winning_blocks = playerHasWon();
      count_plays = 10;
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
        //tìm hiểu map là gì??//tạo ra vòng lặp mới và không ảnh hưởng đến giá trị mảng gốc//tính năng ES6
      );
      return;
    }
    count_plays++;
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT; //đây gọi là toán tử 3 ngôi thay thế cho lệnh if(?) và else(:)
  }

  if (count_plays === 9) {
    // console.log(count_plays);
    playerText.innerHTML = "Draw game!";
    boxes.forEach((box) => (box.style.color = drawIndicator));
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    //tìm hiểu vòng lặp for-of ??
    let [a, b, c] = condition;
    // if (SPACES[a]) {
    //   console.log(SPACES[a]);
    // }
    //giải thích:khi vị trí spaces[a](hoặc spaces[b] và spaces[c]) được đánh dấu(có chứa giá trị) kèm theo [a]==[b] và [a]==[b] thì mới thỏa ổn điều kiện để return[a,b,c]
    //chứ nếu không chỉ có mỗi [a](hoặc [b] và [c] có chứa giá trị) mà không có [a]==[b],[a]==[c] thì X hay O hay null không thì vẫn return [a,b,c] được.
    if (SPACES[a] && SPACES[a] == SPACES[b] && SPACES[a] == SPACES[c]) {
      console.log(SPACES[a]);
      //!space[a] ngược lại với space[a]
      //SPACES[b] HOẶC SPACES[c] đều ok
      // console.log(SPACES[a]); xuất ra số lần spaces[a] tương ứng với ô vị trí a được đánh ở trên
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart); //nếu restart có () thì là gọi hàm mà gọi hàm thì chỉ gọi 1 lần nên restart không có () để mỗi lần click thì lại thực hiện chức năng

function restart() {
  SPACES.fill(null);
  count_plays = 0;
  boxes.forEach((box) => {
    box.innerText = " ";
    box.style.backgroundColor = "#37505c";
    box.style.color = "#f2c14e";
  });

  playerText.innerText = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame(); //ở đây start có () nên chỉ gọi hàm một lần không giống restart
console.log("Test git ");
