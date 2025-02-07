'use client'
import { useState } from "react";
import Image from 'next/image';

import WhitePawn from '../assets/Chess_plt60.png';
import BlackPawn from '../assets/Chess_pdt60.png';
import WhiteRook from '../assets/Chess_rlt60.png';
import BlackRook from '../assets/Chess_rdt60.png';
import WhiteKnight from '../assets/Chess_nlt60.png';
import BlackKnight from '../assets/Chess_ndt60.png';
import WhiteBishop from '../assets/Chess_blt60.png';
import BlackBishop from '../assets/Chess_bdt60.png';
import WhiteQueen from '../assets/Chess_qlt60.png';
import BlackQueen from '../assets/Chess_qdt60.png';
import WhiteKing from '../assets/Chess_klt60.png';
import BlackKing from '../assets/Chess_kdt60.png';
import next from "next";

const initialBoard = [
    // Row 8
    { piece: { type: 'BlackRook', image: BlackRook }, row: 8, col: 'A' },
    { piece: { type: 'BlackKnight', image: BlackKnight }, row: 8, col: 'B' },
    { piece: { type: 'BlackBishop', image: BlackBishop }, row: 8, col: 'C' },
    { piece: { type: 'BlackQueen', image: BlackQueen }, row: 8, col: 'D' },
    { piece: { type: 'BlackKing', image: BlackKing }, row: 8, col: 'E' },
    { piece: { type: 'BlackBishop', image: BlackBishop }, row: 8, col: 'F' },
    { piece: { type: 'BlackKnight', image: BlackKnight }, row: 8, col: 'G' },
    { piece: { type: 'BlackRook', image: BlackRook }, row: 8, col: 'H' },
    // Row 7
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'A' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'B' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'C' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'D' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'E' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'F' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'G' },
    { piece: { type: 'BlackPawn', image: BlackPawn }, row: 7, col: 'H' },
    // Row 6
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 6, col })),
    // Row 5
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 5, col })),
    // Row 4
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 4, col })),
    // Row 3
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 3, col })),
    // Row 2
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'A' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'B' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'C' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'D' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'E' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'F' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'G' },
    { piece: { type: 'WhitePawn', image: WhitePawn }, row: 2, col: 'H' },
    // Row 1
    { piece: { type: 'WhiteRook', image: WhiteRook }, row: 1, col: 'A' },
    { piece: { type: 'WhiteKnight', image: WhiteKnight }, row: 1, col: 'B' },
    { piece: { type: 'WhiteBishop', image: WhiteBishop }, row: 1, col: 'C' },
    { piece: { type: 'WhiteQueen', image: WhiteQueen }, row: 1, col: 'D' },
    { piece: { type: 'WhiteKing', image: WhiteKing }, row: 1, col: 'E' },
    { piece: { type: 'WhiteBishop', image: WhiteBishop }, row: 1, col: 'F' },
    { piece: { type: 'WhiteKnight', image: WhiteKnight }, row: 1, col: 'G' },
    { piece: { type: 'WhiteRook', image: WhiteRook }, row: 1, col: 'H' },
];

const BishopDirections = [
    { row: 1, col: -1 }, // Top-left diagonal
    { row: 1, col: 1 },  // Top-right diagonal
    { row: -1, col: -1 }, // Bottom-left diagonal
    { row: -1, col: 1 }, // Bottom-right diagonal
    { row: 2, col: -2 }, // Top-left diagonal
    { row: 2, col: 2 },  // Top-right diagonal
    { row: -2, col: -2 }, // Bottom-left diagonal
    { row: -2, col: 2 }, // Bottom-right diagonal
    { row: 3, col: -3 }, // Top-left diagonal
    { row: 3, col: 3 },  // Top-right diagonal
    { row: -3, col: -3 }, // Bottom-left diagonal
    { row: -3, col: 3 }, // Bottom-right diagonal
    { row: 4, col: -4 }, // Top-left diagonal
    { row: 4, col: 4 },  // Top-right diagonal
    { row: -4, col: -4 }, // Bottom-left diagonal
    { row: -4, col: 4 }, // Bottom-right diagona4
    { row: 5, col: -5 }, // Top-left diagonal
    { row: 5, col: 5 },  // Top-right diagonal
    { row: -5, col: -5 }, // Bottom-left diagonal
    { row: -5, col: 5 }, // Bottom-right diagona5
    { row: 6, col: -6 }, // Top-left diagonal
    { row: 6, col: 6 },  // Top-right diagonal
    { row: -6, col: -6 }, // Bottom-left diagonal
    { row: -6, col: 6 }, // Bottom-right diagona6
    { row: 7, col: -7 }, // Top-left diagonal
    { row: 7, col: 7 },  // Top-right diagonal
    { row: -7, col: -7 }, // Bottom-left diagonal
    { row: -7, col: 7 }, // Bottom-right diagona7
];





function ChessBoard() {
    const [isBoard, setBoard] = useState(initialBoard); //render the board
    const [selectedPiece, setSelectedPiece] = useState(null); // track the selected piece

    const update = ():void => { 
        


    }

    

    const handleClick = (index: any) => {
        if (selectedPiece === null) { // checking if no piece has been selected yet
            if (isBoard[index].piece) { //checks if this square contains a piece
                setSelectedPiece(index);
                console.log("Piece selected:", isBoard[index].piece.type); //Piece selected: WhitePawn
            }
        } else {
            const updatedArray = [...isBoard]; //make a copy
            // console.log(isBoard[selectedPiece].piece?.type); //this is giving whitepawn
            // console.log(isBoard[index].piece?.type); //this is undefined 
            //selectedPiece = will give the index
            const selectedRow = isBoard[selectedPiece].row;
            const selectedCol = isBoard[selectedPiece].col;
            const targetRow = isBoard[index].row;
            const targetCol = isBoard[index].col;
            // console.log("selectedRow "+ selectedRow)
            // console.log("targetRow "+ targetRow)
            // console.log("targetCol "+ targetCol)
            // console.log("selectedCol "+ selectedCol)


            if (isBoard[selectedPiece].piece?.type === "WhitePawn") {
                if (selectedRow === 2) { //first row
                    if (targetRow === selectedRow + 2 && targetCol === selectedCol) { //move 2
                        updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                        updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                        setBoard(updatedArray); // Update the board
                        setSelectedPiece(null); // Reset the selection

                    }
                    else if ((targetRow === selectedRow + 1 && targetCol === selectedCol) && !isBoard[index].piece ) 
                        { //move 2
                        updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                        updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                        setBoard(updatedArray); // Update the board
                        setSelectedPiece(null); // Reset the selection
                    }
                    else if ((targetRow === selectedRow + 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
                        if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                            {
                                updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                                updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                                setBoard(updatedArray); // Update the board
                                setSelectedPiece(null); // Reset the selection
                            }
                        }
                    }
                
                }
                else if ((targetRow === selectedRow + 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
                    if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                        {
                            updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                            updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                            setBoard(updatedArray); // Update the board
                            setSelectedPiece(null); // Reset the selection
                        }
                    }
                }
                else if ((targetRow === selectedRow + 1 && targetCol === selectedCol) && !isBoard[index].piece ) 
                    { //move 2
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                    setBoard(updatedArray); // Update the board
                    setSelectedPiece(null); // Reset the selection

                }
                else{
                    setSelectedPiece(null);
                }
               
            }

            if (isBoard[selectedPiece].piece?.type === "BlackPawn") {
                if (selectedRow === 7) { // First row for Black
                    if (targetRow === selectedRow - 2 && targetCol === selectedCol) { // Move 2 squares
                        updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                        updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                        setBoard(updatedArray); // Update the board
                        setSelectedPiece(null); // Reset the selection
                    }
                    else if (targetRow === selectedRow - 1 && targetCol === selectedCol) { // Move 1 square
                        updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                        updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                        setBoard(updatedArray); // Update the board
                        setSelectedPiece(null); // Reset the selection
                    }
                } else if (targetRow === selectedRow - 1 && targetCol === selectedCol) { // Not in first row, move 1 square
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                    setBoard(updatedArray); // Update the board
                    setSelectedPiece(null); // Reset the selection
                }
            }



            if (isBoard[selectedPiece].piece?.type === "WhiteKnight" || isBoard[selectedPiece].piece?.type === "BlackKnight") {

                if ((targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows up and 1 col left or right

                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows down and 1 col left or right
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                    setBoard(updatedArray); // Update the board
                    setSelectedPiece(null); // Reset the selection
                }
                else if ((targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2)) || (targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2))) { //1 row down  and 2 cols left or right

                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                    setBoard(updatedArray); // Update the board
                    setSelectedPiece(null); // Reset the selection
                }
                else if ((targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2)) || (targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2))) { //1 row up  and 2 cols left or right

                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null }; // Remove the piece from the selected square
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece }; // Add the piece to the new square
                    setBoard(updatedArray); // Update the board
                    setSelectedPiece(null); // Reset the selection
                }

            }

            if (isBoard[selectedPiece].piece?.type === "WhiteRook" || isBoard[selectedPiece].piece?.type === "BlackRook") {
                if ((targetRow === selectedRow) || (targetCol === selectedCol)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
            }

            //(targetRow === selectedRow - 1 && targetCol ===  String.fromCharCode(selectedCol.charCodeAt(0) -2 )) || (targetRow === selectedRow -1 && targetCol ===  String.fromCharCode(selectedCol.charCodeAt(0) +2 ))) { //1 row up  and 2 cols left or right

            if (isBoard[selectedPiece].piece?.type === "WhiteBishop" || isBoard[selectedPiece].piece?.type === "BlackBishop") {
                for (const { row: rowDir, col: colDir } of BishopDirections) {
                    let currentRow = selectedRow;
                    let currentCol = selectedCol;
                    while (true) {
                        currentRow += rowDir;
                        currentCol = String.fromCharCode(currentCol.charCodeAt(0) + colDir);
                        if (currentRow === targetRow && currentCol === targetCol) {
                            updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                            updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                            setBoard(updatedArray);
                            setSelectedPiece(null);
                            return;
                        }
                        break;

                    }
                }


            }



            if (isBoard[selectedPiece].piece?.type === "WhiteKing" || isBoard[selectedPiece].piece?.type === "BlackKing") {
                if ((targetRow === selectedRow + 1) && (targetCol === selectedCol)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === selectedCol) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }

            }

            if (isBoard[selectedPiece].piece?.type === "WhiteQueen" || isBoard[selectedPiece].piece?.type === "BlackQueen") {
                if ((targetRow === selectedRow) || (targetCol === selectedCol)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                if ((targetRow === selectedRow + 1) && (targetCol === selectedCol)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === selectedCol) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }
                else if ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1)) {
                    updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                    updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                    setBoard(updatedArray);
                    setSelectedPiece(null);
                }

                for (const { row: rowDir, col: colDir } of BishopDirections) {
                    let currentRow = selectedRow;
                    let currentCol = selectedCol;
                    while (true) {
                        currentRow += rowDir;
                        currentCol = String.fromCharCode(currentCol.charCodeAt(0) + colDir);
                        if (currentRow === targetRow && currentCol === targetCol) {
                            updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
                            updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };
                            setBoard(updatedArray);
                            setSelectedPiece(null);
                            return;
                        }
                        break;

                    }
                }
            }



            //    console.log("selectedRow "+ selectedRow)
            //     console.log("targetRow "+ targetRow)
            //     console.log("targetCol "+ targetCol)
            //     console.log("selectedCol "+ selectedCol)
        }
    };
    return (
        <main className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-8 grid-rows-8 border-4 border-black h-96 w-96 ">
                {isBoard.map((square, index) => ( //looping through the array
                    <div
                        className={`square${(index + Math.floor(index / 8)) % 2}`} //this is giving square0 or square1
                        key={index} //  unique identifier for each element -helps when rerendering
                        onClick={() => handleClick(index)}
                    >
                        {square.piece && (
                            <Image
                                src={square.piece.image}
                                alt={square.piece.type}
                                width={50}
                                height={50}

                            />)}

                        <span className="absolute top-1 left-1 text-xs text-black">
                            {square.row}{square.col}
                        </span>
                    </div>
                ))}


            </div>


        </main>
    );
}

export default ChessBoard;