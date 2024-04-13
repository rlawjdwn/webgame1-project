const { body } = document; // 객체내부 속성과 할당하는 변수명이 같을 때 
const $table = document.createElement('table');// Document.createElement() 메서드는 지정한 tagName의 HTML 요소를 만들어 반환
const $result = document.createElement('div');//결과창 
const rows = [];
let turn ='o';

//승자판단을 위해 checkWinner() 함수 
const checkWinner = (target) =>{
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    console.log(Array.from(target.parentNode.children));
    console.log(Array.from(target.parentNode.children).indexOf(target));
   /* let rowIndex ;
    let cellIndex;
    rows.forEach((row, ri)=>{
        row.forEach((cell, ci)=>{
            if (cell === target) {
                rowIndex = ri;
                cellIndex = ci;
            }            
        });  
    });*/
//세칸이 다 채워졌나?
     let hasWinner = false;

//가로줄 검사
if (
    rows[rowIndex][0].textContent === turn && 
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
){
    hasWinner : true;
}
//세로줄 검사
if (
    rows[0][cellIndex].textContent === turn && 
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
){
    hasWinner : true;
}
//대각선 검사
if (
    rows[0][0].textContent === true &&
    rows[1][1].textContent === true &&
    rows[2][2].textContent === true
){
    hasWinner : true;

}
if (
    rows[0][2].textContent === true &&
    rows[1][1].textContent === true &&
    rows[2][0].textContent === true
    ){
        hasWinner : true;
    
    }
    return hasWinner;
};  
const callback = (event) => {
    if (event.target.textContent !== "") { // 칸이 이미 채워져 있는가?
        console.log("빈칸이 아닙니다.");
    }else { //빈칸 이면
        console.log('빈칸입니다.');
        event.target.textContent = turn;
        const hasWinner = checkWinner(event.target);
        //승자가 있으면
        if (hasWinner){
            $result.textContent = `${turn}님의 승리`;
            $table.removeEventListener('click',callback);
            return;
        }
        //승자가 없으면
        let draw = true;//기본:true, 빈칸이 있다면 false로 변경
        rows.forEach((row)=>{
            row.forEach((cell)=>{
                if (!cell.textContent) {
                    draw = false;
                }
            });
        });
        if (draw) {
            $result.textContent = `무승부`;
            return;
        }            
        turn = turn === 'x'? 'o':'x';     
    };
};
for (let i = 1; i <= 3; i += 1){
    const $tr = document.createElement('tr');
    const cells = [];
    for (let j = 1; j <= 3; j += 1){
        const $td = document.createElement('td');
       // $td.addEventListener('click' , callback);
        cells.push($td);
        $tr.appendChild($td);//자식 객체만 추가 가능 
    }
    rows.push(cells);
    $table.appendChild($tr);
    $table.addEventListener('click' , callback);

};
body.appendChild($table);
body.appendChild($result);

