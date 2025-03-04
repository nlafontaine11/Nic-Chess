'use client'
import { useState } from "react";
import Image from 'next/image';
import { findKing, getValidMoves, getValidMovesToSaveKing, isCheckmate, isKingInCheck, Square } from "./checkMate";
import Popup from "reactjs-popup";

import WhiteP from '../assets/Chess_plt60.png';
import BlackP from '../assets/Chess_pdt60.png';
import WhiteR from '../assets/Chess_rlt60.png';
import BlackR from '../assets/Chess_rdt60.png';
import WhiteKn from '../assets/Chess_nlt60.png';
import BlackKn from '../assets/Chess_ndt60.png';
import WhiteB from '../assets/Chess_blt60.png';
import BlackB from '../assets/Chess_bdt60.png';
import WhiteQ from '../assets/Chess_qlt60.png';
import BlackQ from '../assets/Chess_qdt60.png';
import WhiteK from '../assets/Chess_klt60.png';
import BlackK from '../assets/Chess_kdt60.png';





const initialBoard = [
    // Row 8
    { piece: { type: 'BlackRook', image: BlackR }, row: 8, col: 'A' },
    { piece: { type: 'BlackKnight', image: BlackKn }, row: 8, col: 'B' },
    { piece: { type: 'BlackBishop', image: BlackB }, row: 8, col: 'C' },
    { piece: { type: 'BlackQueen', image: BlackQ }, row: 8, col: 'D' },
    { piece: { type: 'BlackKing', image: BlackK }, row: 8, col: 'E' },
    { piece: { type: 'BlackBishop', image: BlackB }, row: 8, col: 'F' },
    { piece: { type: 'BlackKnight', image: BlackKn }, row: 8, col: 'G' },
    { piece: { type: 'BlackRook', image: BlackR }, row: 8, col: 'H' },
    // Row 7
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'A' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'B' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'C' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'D' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'E' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'F' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'G' },
    { piece: { type: 'BlackPawn', image: BlackP }, row: 7, col: 'H' },
    // Row 6
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 6, col })),
    // Row 5
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 5, col })),
    // Row 4
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 4, col })),
    // Row 3
    ...'ABCDEFGH'.split('').map(col => ({ piece: null, row: 3, col })),
    // Row 2
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'A' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'B' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'C' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'D' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'E' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'F' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'G' },
    { piece: { type: 'WhitePawn', image: WhiteP }, row: 2, col: 'H' },
    // Row 1
    { piece: { type: 'WhiteRook', image: WhiteR }, row: 1, col: 'A' },
    { piece: { type: 'WhiteKnight', image: WhiteKn }, row: 1, col: 'B' },
    { piece: { type: 'WhiteBishop', image: WhiteB }, row: 1, col: 'C' },
    { piece: { type: 'WhiteQueen', image: WhiteQ }, row: 1, col: 'D' },
    { piece: { type: 'WhiteKing', image: WhiteK }, row: 1, col: 'E' },
    { piece: { type: 'WhiteBishop', image: WhiteB }, row: 1, col: 'F' },
    { piece: { type: 'WhiteKnight', image: WhiteKn }, row: 1, col: 'G' },
    { piece: { type: 'WhiteRook', image: WhiteR }, row: 1, col: 'H' },
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
    const [currentPlayer, setCurrentPlayer] = useState("White");
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isResetOpen, setReset] = useState(false);
    const [isWhitePawnAtEnd, setWhitePawn] = useState(false);
    const [isBlackPawnAtEnd, setBlackPawn] = useState(false);
    const [isHighLighted, setHighLight] = useState<Square[]>([]);
    const [stateCheckmate, setCheckmated] = useState(false);
 



    const reset = () => {
        setBoard(initialBoard);
        setCurrentPlayer("White");
        setHighLight([]);
        for (let i = 48; i <= 55; i++) {
            const whatImLookingFor = isBoard[i];
            if (whatImLookingFor.piece) {
                if (!(whatImLookingFor.piece?.type.includes("WhitePawn"))) {
                    whatImLookingFor.piece.type = "WhitePawn";
                    whatImLookingFor.piece.image = WhiteP;
                }
            }

        }
    }


    const switchTurn = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer === "White" ? "Black" : "White"));
        /* notes
        1. prevPlayers (or prevState) is a mechanism to access the state of a component before its latest update, ensuring reliable and consistent state transitions especially in scenarios where the new state depends on the old state. It's not something passed down as props or anything, it's a built-in functionality provided by React and the useState hook.
            
        2. prevPlayer === White ? Black : white
        so prevPlayer = white its true and returns white
        if false then checks black for T/F 
        if false again on black then deflaut to white
        */
    }
    const update = (index: any): void => {


        if (selectedPiece === null) {
            // Selection logic remains the same
            if (isBoard[index].piece) {
                setSelectedPiece(index);
                console.log("Piece selected:", isBoard[index].piece.type);
            }
        } else {
            // Create the updated board
            const updatedArray = [...isBoard];
            updatedArray[selectedPiece] = { ...isBoard[selectedPiece], piece: null };
            updatedArray[index] = { ...isBoard[index], piece: isBoard[selectedPiece].piece };

            // Check game state with the new board before updating state
            const opponentColor = currentPlayer === "White" ? "Black" : "White";
            const isCheckmated = isCheckmate(updatedArray, opponentColor);

            if (isCheckmated) {
                switchTurn();
                setCheckmated(true);
                console.log(`${opponentColor} is in checkmate!`);
                // Handle checkmate (show message, end game, etc.)
            } else if (isKingInCheck(updatedArray, opponentColor)) {
                //need a new function - give all valid moves to save the king
                console.log(`${opponentColor} is in check!`);
                const savingMoves = getValidMovesToSaveKing(isBoard, opponentColor);
                console.log(savingMoves);
            }

            // Now update the state
            setBoard(updatedArray);
            setSelectedPiece(null);
            switchTurn();
        }
    }
    const checkForJump = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any): boolean => {
        //checking if you can jump over other peice
        let flag = true;
        if (selectedRow < targetRow) { //up
            for (let i = selectedRow + 1; i < targetRow; i++) { //up
                let checkIndex = (8 - i) * 8 + (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0));
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }
            }
        }
        if (selectedRow > targetRow) {//down
            for (let i = selectedRow - 1; i > targetRow; i--) {//down
                let checkIndex = (8 - i) * 8 + (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0));
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }
            }
        }
        if (((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) + 1) < (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0))) {
            for (let i = (selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) + 1; i <= (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)); i++) {//right
                let checkIndex = (8 - targetRow) * 8 + i;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }
            }
        }
        if (((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) - 1) > (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0))) {
            for (let i = (selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) - 1; i > (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)); i--) {//left
                let checkIndex = (8 - targetRow) * 8 + i;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }
            }
        }


        if (flag === true) {
            return flag;
        } else {
            return flag;
        }

    }
    const checkForJumpBishops = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any): boolean => {
        let flag = true;

        if ((selectedRow + ((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)))) < targetRow + (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0))) { //up right
            for (let i = selectedRow + 1, j = ((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) + 1); i < targetRow; i++, j++) {
                let checkIndex = (8 - i) * 8 + j;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }

            }
        }
        if ((selectedRow + ((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)))) > targetRow + (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0))) { //down right
            for (let i = targetRow + 1, j = (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) + 1; i < selectedRow; i++, j++) {
                let checkIndex = (8 - i) * 8 + j;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }

            }
        }


        if ((selectedRow + ((selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)))) === targetRow + (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0))) { //up left
            for (let i = selectedRow + 1, j = (selectedCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) - 1; i < targetRow; i++, j--) {
                let checkIndex = (8 - i) * 8 + j;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }

            }
            for (let i = targetRow + 1, j = (targetCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) - 1; i < selectedRow; i++, j--) {       //down left
                let checkIndex = (8 - i) * 8 + j;
                if (isBoard[checkIndex].piece) {
                    flag = false;
                }

            }

        }
        if (flag === true) {
            return flag;
        } else {
            return flag;
        }

    }
    const switchWhitePawn = () => {
        setWhitePawn(true);
    }
    const switchBlackPawn = () => {
        setBlackPawn(true);
    }
    const WhitePawn = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if (selectedRow === 2) { //first row
            if ((targetRow === selectedRow + 2 && targetCol === selectedCol) && !isBoard[index].piece) { //move 2
                if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                    update(index);
                }

            }
            else if ((targetRow === selectedRow + 1 && targetCol === selectedCol) && !isBoard[index].piece) { //move 2
                if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                    update(index);
                }
            }
            else if ((targetRow === selectedRow + 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
                if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                    {
                        if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                            update(index);
                        }
                    }
                }
            }
        }
        else if ((targetRow === selectedRow + 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                        if (selectedRow == 7 && targetRow == 8) {
                            update(index);
                            switchWhitePawn();
                        } else {
                            update(index);
                        }
                    }
                }
            }
        }
        else if ((targetRow === selectedRow + 1 && targetCol === selectedCol) && !isBoard[index].piece) { //move 2
            if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                if (selectedRow == 7 && targetRow == 8) {
                    update(index);
                    switchWhitePawn();
                }
                else {
                    update(index);
                }
            }
        }

    }
    const BlackPawn = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {

        if (selectedRow === 7) { // First row for Black
            if ((targetRow === selectedRow - 2 && targetCol === selectedCol) && !isBoard[index].piece) { // Move 2 squares
                if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                    update(index);
                }
            }
            else if ((targetRow === selectedRow - 1 && targetCol === selectedCol) && !isBoard[index].piece) { // Move 1 square
                if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                    update(index);
                }
            }
            else if ((targetRow === selectedRow - 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
                if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                    {
                        if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                            update(index);
                        }
                    }
                }
            }
        } else if ((targetRow === selectedRow - 1) && (targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1) || targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                        if (selectedRow == 2 && targetRow == 1) {
                            update(index);
                            switchBlackPawn();
                        } else {
                            update(index);
                        }
                    }
                }
            }
        }
        else if ((targetRow === selectedRow - 1 && targetCol === selectedCol) && !isBoard[index].piece) { //move 2
            if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                if (selectedRow == 2 && targetRow == 1) {
                    update(index);
                    switchBlackPawn();
                } else {
                    update(index);
                }
            }
        }

    }
    const WhiteKnight = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if ((targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows up and 1 col left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows down and 1 col left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2)) || (targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2))) { //1 row down  and 2 cols left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2)) || (targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2))) { //1 row up  and 2 cols left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }
        if (((targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) { // 2 rows up and 1 col left or right
            update(index);
        }
        else if (((targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) { // 2 rows down and 1 col left or right
            update(index);
        }
        else if (((targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2)) || (targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2))) && !isBoard[index].piece) { //1 row down  and 2 cols left or right
            update(index);
        }
        else if (((targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2)) || (targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2))) && !isBoard[index].piece) { //1 row up  and 2 cols left or right
            update(index);
        }
    }
    const BlackKnight = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if ((targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows up and 1 col left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) { // 2 rows down and 1 col left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2)) || (targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2))) { //1 row down  and 2 cols left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }
        else if ((targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2)) || (targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2))) { //1 row up  and 2 cols left or right
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }

        if (((targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow + 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) { // 2 rows up and 1 col left or right
            update(index);
        }
        else if (((targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || (targetRow === selectedRow - 2 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) { // 2 rows down and 1 col left or right
            update(index);
        }
        else if (((targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2)) || (targetRow === selectedRow - 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2))) && !isBoard[index].piece) { //1 row down  and 2 cols left or right
            update(index);
        }
        else if (((targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 2)) || (targetRow === selectedRow + 1 && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 2))) && !isBoard[index].piece) { //1 row up  and 2 cols left or right
            update(index);
        }
    }
    const WhiteRook = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if (((targetRow === selectedRow) || (targetCol === selectedCol)) && !isBoard[index].piece) {
            if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                update(index);
            }
        }
        else if (((targetRow === selectedRow) || (targetCol === selectedCol))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                        update(index);
                    }
                }
            }
        }
    }
    const BlackRook = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if (((targetRow === selectedRow) || (targetCol === selectedCol)) && !isBoard[index].piece) {
            if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                update(index);
            }
        }
        else if (((targetRow === selectedRow) || (targetCol === selectedCol))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    if (checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                        update(index);
                    }
                }
            }
        }
    }
    const WhiteBishop = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        for (const { row: rowDir, col: colDir } of BishopDirections) {
            let currentRow = selectedRow;
            let currentCol = selectedCol;
            while (true) {
                currentRow += rowDir;
                currentCol = String.fromCharCode(currentCol.charCodeAt(0) + colDir);
                if ((currentRow === targetRow && currentCol === targetCol) && !isBoard[index].piece) {
                    if (checkForJumpBishops(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                        update(index);
                    }
                    return;
                }
                else if ((currentRow === targetRow && currentCol === targetCol)) {
                    if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                        if (checkForJumpBishops(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index)) {
                            update(index);
                        }
                        return;
                    }
                }
                break;

            }
        }
    }
    const BlackBishop = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        for (const { row: rowDir, col: colDir } of BishopDirections) {
            let currentRow = selectedRow;
            let currentCol = selectedCol;
            while (true) {
                currentRow += rowDir;
                currentCol = String.fromCharCode(currentCol.charCodeAt(0) + colDir);
                if ((currentRow === targetRow && currentCol === targetCol) && !isBoard[index].piece) {
                    update(index);
                    return;
                }
                else if ((currentRow === targetRow && currentCol === targetCol)) {
                    if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                        update(index);
                        return;
                    }
                }
                break;

            }
        }
    }
    const WhiteKing = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {

        if (((targetRow === selectedRow + 1) && (targetCol === selectedCol)) || ((targetRow === selectedRow - 1) && targetCol === selectedCol)) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("Black")) {
                {
                    update(index);
                }
            }
        }
        if ((((targetRow === selectedRow + 1) && (targetCol === selectedCol)) || ((targetRow === selectedRow - 1) && targetCol === selectedCol)) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }

    }
    const BlackKing = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        if (((targetRow === selectedRow + 1) && (targetCol === selectedCol)) || ((targetRow === selectedRow - 1) && targetCol === selectedCol)) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }

        else if (((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) {
            if (isBoard[index].piece && isBoard[index].piece?.type.includes("White")) {
                {
                    update(index);
                }
            }
        }
        if ((((targetRow === selectedRow + 1) && (targetCol === selectedCol)) || ((targetRow === selectedRow - 1) && targetCol === selectedCol)) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }

        else if ((((targetRow === selectedRow + 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) - 1)) || ((targetRow === selectedRow - 1) && targetCol === String.fromCharCode(selectedCol.charCodeAt(0) + 1))) && !isBoard[index].piece) {
            update(index);
        }
    }
    const WhiteQueen = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        const isValidRookMove = ((targetRow === selectedRow) || (targetCol === selectedCol)) &&
            checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
        const isValidBishopMove = checkForJumpBishops(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
        const hasOpponentPiece = isBoard[index].piece && isBoard[index].piece?.type.includes("Black");

        // If the move is valid and either the square is empty or has an opponent's piece
        if ((isValidRookMove || isValidBishopMove) && (!isBoard[index].piece || hasOpponentPiece)) {
            update(index);
        }
    }
    const BlackQueen = (targetRow: number, selectedRow: number, targetCol: String, selectedCol: String, selectedPiece: any, index: any) => {
        const isValidRookMove = ((targetRow === selectedRow) || (targetCol === selectedCol)) &&
            checkForJump(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);

        const isValidBishopMove = checkForJumpBishops(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
        const hasOpponentPiece = isBoard[index].piece && isBoard[index].piece?.type.includes("White");
        // If the move is valid and either the square is empty or has an opponent's piece
        if ((isValidRookMove || isValidBishopMove) && (!isBoard[index].piece || hasOpponentPiece)) {
            update(index);
        }
    }
    const changePawn = (thePickedPiece: String) => {

        if (currentPlayer !== "White") {
            for (let i = 0; i <= 7; i++) {
                const whatImLookingFor = isBoard[i];
                if (whatImLookingFor.piece?.type.includes("WhitePawn")) {
                    if (thePickedPiece === "Queen") {
                        whatImLookingFor.piece.type = "WhiteQueen";
                        whatImLookingFor.piece.image = WhiteQ;
                    }
                    else if (thePickedPiece === "Rook") {
                        whatImLookingFor.piece.type = "WhiteRook";
                        whatImLookingFor.piece.image = WhiteR;
                    }
                    else if (thePickedPiece === "Bishop") {
                        whatImLookingFor.piece.type = "WhiteBishop";
                        whatImLookingFor.piece.image = WhiteB;
                    }
                    else if (thePickedPiece === "Knight") {
                        whatImLookingFor.piece.type = "WhiteKnight";
                        whatImLookingFor.piece.image = WhiteKn;
                    }
                }
            }
        }
        if (currentPlayer !== "Black") {
            for (let i = 56; i <= 63; i++) {
                const whatImLookingFor = isBoard[i];
                if (whatImLookingFor.piece?.type.includes("BlackPawn")) {
                    if (thePickedPiece === "Queen") {
                        whatImLookingFor.piece.type = "BlackQueen";
                        whatImLookingFor.piece.image = BlackQ;
                    }
                    else if (thePickedPiece === "Rook") {
                        whatImLookingFor.piece.type = "BlackRook";
                        whatImLookingFor.piece.image = BlackR;
                    }
                    else if (thePickedPiece === "Bishop") {
                        whatImLookingFor.piece.type = "BlackBishop";
                        whatImLookingFor.piece.image = BlackB;
                    }
                    else if (thePickedPiece === "Knight") {
                        whatImLookingFor.piece.type = "BlackKnight";
                        whatImLookingFor.piece.image = BlackKn;
                    }
                }
            }
        }

    }
    const highLight = (pieceToMove: any) => {
        const moves = getValidMoves(isBoard, pieceToMove);
        setHighLight(moves);
    }

    const handleClick = (index: any) => {
        if (selectedPiece === null) { // checking if no piece has been selected yet
            if (isBoard[index].piece) { //checks if this square contains a piece
                setSelectedPiece(index);
                const highLightProp = isBoard[index];
                highLight(highLightProp);
                // console.log("Piece selected:", isBoard[index].piece.type); //Piece selected: WhitePawn
            }
        } else {
            const selectedRow = isBoard[selectedPiece].row;
            const selectedCol = isBoard[selectedPiece].col;
            const targetRow = isBoard[index].row;
            const targetCol = isBoard[index].col;
            // console.log("selectedRow "+ selectedRow)
            // console.log("targetRow "+ targetRow)
            // console.log("targetCol "+ targetCol)
            // console.log("selectedCol "+ selectedCol)

            if (currentPlayer === "White") {
                if (isBoard[selectedPiece].piece?.type === "WhitePawn") {
                    WhitePawn(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }
                if (isBoard[selectedPiece].piece?.type === "WhiteKnight") {
                    WhiteKnight(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }
                if (isBoard[selectedPiece].piece?.type === "WhiteRook") {
                    WhiteRook(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);

                } else {
                    setSelectedPiece(null);
                }
                if (isBoard[selectedPiece].piece?.type === "WhiteBishop") {
                    WhiteBishop(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);

                } else {
                    setSelectedPiece(null);
                }
                if (isBoard[selectedPiece].piece?.type === "WhiteKing") {
                    WhiteKing(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);

                } else {
                    setSelectedPiece(null);
                }
                if (isBoard[selectedPiece].piece?.type === "WhiteQueen") {
                    WhiteQueen(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);

                } else {
                    setSelectedPiece(null);
                }

            }

            if (currentPlayer === "Black") {
                if (isBoard[selectedPiece].piece?.type === "BlackPawn") {
                    BlackPawn(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }

                if (isBoard[selectedPiece].piece?.type === "BlackKnight") {
                    BlackKnight(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }

                if (isBoard[selectedPiece].piece?.type === "BlackRook") {
                    BlackRook(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }

                if (isBoard[selectedPiece].piece?.type === "BlackBishop") {
                    BlackBishop(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }

                if (isBoard[selectedPiece].piece?.type === "BlackKing") {
                    BlackKing(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }

                if (isBoard[selectedPiece].piece?.type === "BlackQueen") {
                    BlackQueen(targetRow, selectedRow, targetCol, selectedCol, selectedPiece, index);
                } else {
                    setSelectedPiece(null);
                }
            }



        }
    };




    return (
        <main className="flex items-center justify-center h-screen">
            <div>
                <button onClick={() => setReset(true)} className="mb-2 mt-2 mr-2 px-6 py-2 bg-gray-300 rounded hover:bg-gray-200 font-serif">Reset </button>
                <button onClick={() => setPopupOpen(true)} className="mb-2 mt-2 px-6 py-2 bg-gray-300 rounded  hover:bg-gray-200 font-serif">Draw </button>
                <Popup
                    open={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                >
                    <div className="bg-gray-300 rounded p-4 max-w-sm mx-auto text-center">
                        <p className="mb-4 text-lg font-medium font-serif">Would you like to draw?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setPopupOpen(false);
                                    reset();
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded font-serif hover:bg-red-600 transition-colors"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    setPopupOpen(false);
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded font-serif hover:bg-red-600 transition-colors"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Popup>

                <Popup
                    open={isResetOpen}
                    onClose={() => setReset(false)}
                >
                    <div className="bg-gray-300 rounded p-4 max-w-sm mx-auto text-center">
                        <p className="mb-4 text-lg font-medium font-serif">Are you sure you want to reset?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setReset(false);
                                    reset();
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded font-serif hover:bg-red-600 transition-colors"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    setReset(false);
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded font-serif hover:bg-red-600 transition-colors"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Popup>
                <Popup
                    open={stateCheckmate}
                    onClose={() => setCheckmated(false)}
                >
                    <div className="bg-gray-300 rounded p-4 max-w-sm mx-auto text-center">
                        <p className="mb-4 text-lg font-medium font-serif">{currentPlayer} is the winner by checkmate!</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setCheckmated(false);
                                    reset();
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded font-serif hover:bg-red-600 transition-colors"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                </Popup>


                <p className="mb-2 mt-2 px-6 py-2 bg-gray-300 rounded text-center font-serif">Current Turn: {currentPlayer}</p>



                <Popup open={isWhitePawnAtEnd} closeOnDocumentClick={false} modal>
                    <button onClick={() => {
                        { setWhitePawn(false), changePawn("Rook"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={WhiteR} alt="White Rook" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setWhitePawn(false), changePawn("Bishop"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={WhiteB} alt="White Bishop" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setWhitePawn(false), changePawn("Knight"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={WhiteKn} alt="White Knight" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setWhitePawn(false), changePawn("Queen"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={WhiteQ} alt="White Queen" width={50} height={50} />

                    </button>

                </Popup>

                <Popup open={isBlackPawnAtEnd} closeOnDocumentClick={false} modal>
                    <button onClick={() => {
                        { setBlackPawn(false), changePawn("Rook"); }
                    }} className="px-3 py-2  bg-red-500">
                        <Image src={BlackR} alt="Black Rook" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setBlackPawn(false), changePawn("Bishop"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={BlackB} alt="Black Bishop" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setBlackPawn(false), changePawn("Knight"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={BlackKn} alt="Black Knight" width={50} height={50} />
                    </button>
                    <button onClick={() => {
                        { setBlackPawn(false), changePawn("Queen"); }
                    }} className="px-3 py-2  bg-red-500 ">
                        <Image src={BlackQ} alt="Black Queen" width={50} height={50} />

                    </button>

                </Popup>


                <div className="grid grid-cols-8 grid-rows-8 border-4 border-black h-96 w-96 ">
                    {isBoard.map((square, index) => ( //looping through the array
                        <div
                            className={`square${(index + Math.floor(index / 8)) % 2} ${isHighLighted.some(square =>
                                square.row === isBoard[index].row &&
                                square.col === isBoard[index].col
                            ) ? 'highlight' : ''
                                }  `}
                            key={index} //  unique identifier for each element -helps when rerendering
                            onClick={() => {
                                handleClick(index);
                          
                            }


                            }
                          
                        >
                            {square.piece && (
                                <Image
                                    src={square.piece.image}
                                    alt={square.piece.type}
                                    width={50}
                                    height={50}

                                />)}

                            <span className="absolute top-1 left-1 text-xs text-black">
                                {square.row}{square.col}{index}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


        </main>
    );
}

export default ChessBoard;