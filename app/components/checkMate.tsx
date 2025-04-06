import { StaticImageData } from "next/image";

export type Piece = {
    type: string;
    image: StaticImageData;
};

export type Square = {
    row: number;
    col: string;
    piece?: Piece | null;
};

export type Board = Square[];


//i like
export const findKing = (board: Board, color: string) => {
    if (color === 'Black') {
        return board.find(square => square.piece?.type === 'BlackKing');
    }
    else {
        return board.find(square => square.piece?.type === 'WhiteKing');
    }
};

// Fix the isKingInCheck function
// Detailed debug version of isKingInCheck
export const isKingInCheck = (board: Board, color: string): boolean => {
    const king = findKing(board, color);
    if (!king) {
        console.warn(`King for ${color} not found!`);
        return false;
    }


    // Check each opponent piece
    for (const square of board) {
        if (square.piece && !square.piece.type.includes(color)) {


            const validMoves = getValidMoves(board, square);

            // Check if any valid move can capture the king
            for (const move of validMoves) {

                if (move.row === king.row &&
                    move.col.toLowerCase() === king.col.toLowerCase()) {

                    return true; // King is in check
                }
            }
        }
    }

    return false;
}

// First, fix the letterToIndex function to handle both uppercase and lowercase
const letterToIndex = (letter: string): number => {
    return letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
};

// const indexToLetter = (index: number): string => {
//     // Return uppercase to match your board representation
//     return String.fromCharCode(index + 'A'.charCodeAt(0));
// };

// Simulate a move and return the new board state
export const simulateMove = (board: Board, from: Square, to: Square): Board => {
    // Create a deep copy of the board to avoid any reference issues
    const newBoard = board.map(square => ({
        ...square,
        piece: square.piece ? { ...square.piece } : undefined
    }));

    // Find the actual squares in the new board copy
    const fromSquare = newBoard.find(s => s.row === from.row && s.col.toLowerCase() === from.col.toLowerCase());
    const toSquare = newBoard.find(s => s.row === to.row && s.col.toLowerCase() === to.col.toLowerCase());

    if (!fromSquare || !toSquare) return newBoard;

    // Move the piece
    toSquare.piece = fromSquare.piece;
    fromSquare.piece = undefined;

    return newBoard;
};


// Generate valid moves for a specific piece
export const getValidMoves = (board: Board, square: Square): Square[] => {
    if (!square.piece) return [];
    const { type } = square.piece;

    // Extract color from type (assuming types are "WhitePawn", "BlackKnight", etc.)
    const color = type.includes("White") ? "White" : "Black";
    const pieceType = type.replace("White", "").replace("Black", ""); // Strip color

    // Convert letter (column) to index (0-7)
    // const colIndex = letterToIndex(square.col);

    switch (pieceType) {
        case 'Pawn': return getPawnMoves(board, square, color);
        case 'Rook': return getRookMoves(board, square, color);
        case 'Knight': return getKnightMoves(board, square, color);
        case 'Bishop': return getBishopMoves(board, square, color);
        case 'Queen': return getQueenMoves(board, square, color);
        case 'King': return getKingMoves(board, square, color);
        default: return [];
    }
};




export const getPawnMoves = (board: Board, square: Square, color: string): Square[] => {
    const moves: Square[] = [];
    const direction = color === 'White' ? 1 : -1;
    const startRow = color === 'White' ? 2 : 7;

    // Convert column to index for comparison
    const colIndex = letterToIndex(square.col);

    // Forward one step
    const forwardOne = board.find(sq => sq.row === square.row + direction && letterToIndex(sq.col) === colIndex);
    if (forwardOne && !forwardOne.piece) moves.push(forwardOne);

    // Forward two steps (only if on starting row)
    if (square.row === startRow) {
        const forwardTwo = board.find(sq => sq.row === square.row + 2 * direction && letterToIndex(sq.col) === colIndex);
        if (forwardTwo && !forwardTwo.piece && forwardOne && !forwardOne.piece) {
            moves.push(forwardTwo);
        }
    }

    // Capture moves (diagonal)
    [-1, 1].forEach(offset => {
        const captureSquare = board.find(sq => sq.row === square.row + direction && letterToIndex(sq.col) === colIndex + offset);
        if (captureSquare && captureSquare.piece && !captureSquare.piece.type.includes(color)) {
            moves.push(captureSquare);
        }
    });

    return moves;
};


// Generate valid moves for a rook
export const getRookMoves = (board: Board, square: Square, color: string): Square[] => {
    return getSlidingMoves(board, square, color, [
        { row: 1, col: 0 }, { row: -1, col: 0 },
        { row: 0, col: 1 }, { row: 0, col: -1 }
    ]);
};


// Generate valid moves for a bishop
export const getBishopMoves = (board: Board, square: Square, color: string): Square[] => {
    return getSlidingMoves(board, square, color, [
        { row: 1, col: 1 }, { row: -1, col: -1 },
        { row: 1, col: -1 }, { row: -1, col: 1 }
    ]);
};


// Fix the queen moves generation
export const getQueenMoves = (board: Board, square: Square, color: string): Square[] => {
    // Queen combines rook and bishop movements
    // Get all horizontal and vertical moves (rook-like)
    const horizontalVerticalDirections = [
        { row: 1, col: 0 },  // down
        { row: -1, col: 0 }, // up
        { row: 0, col: 1 },  // right
        { row: 0, col: -1 }  // left
    ];

    // Get all diagonal moves (bishop-like)
    const diagonalDirections = [
        { row: 1, col: 1 },   // down-right
        { row: 1, col: -1 },  // down-left
        { row: -1, col: 1 },  // up-right
        { row: -1, col: -1 }  // up-left
    ];

    // Combine both types of moves
    const rookMoves = getSlidingMoves(board, square, color, horizontalVerticalDirections);
    const bishopMoves = getSlidingMoves(board, square, color, diagonalDirections);

    return [...rookMoves, ...bishopMoves];
}

// Generate valid moves for a knight
export const getKnightMoves = (board: Board, square: Square, color: string): Square[] => {
    const moves: Square[] = [];
    const offsets = [
        { row: 2, col: 1 }, { row: 2, col: -1 },
        { row: -2, col: 1 }, { row: -2, col: -1 },
        { row: 1, col: 2 }, { row: 1, col: -2 },
        { row: -1, col: 2 }, { row: -1, col: -2 }
    ];

    // Convert column to index for comparison
    const colIndex = letterToIndex(square.col);

    offsets.forEach(offset => {
        const move = board.find(sq => sq.row === square.row + offset.row && letterToIndex(sq.col) === colIndex + offset.col);
        if (move && (!move.piece || !move.piece.type.includes(color))) {
            moves.push(move);
        }
    });

    return moves;
};


// Generate valid moves for a king
export const getKingMoves = (board: Board, square: Square, color: string): Square[] => {
    return getSlidingMoves(board, square, color, [
        { row: 1, col: 0 }, { row: -1, col: 0 },
        { row: 0, col: 1 }, { row: 0, col: -1 },
        { row: 1, col: 1 }, { row: -1, col: -1 },
        { row: 1, col: -1 }, { row: -1, col: 1 }
    ], 1);
};


// Ensure valid move generation is case-insensitive
export const getSlidingMoves = (board: Board, square: Square, color: string, directions: { row: number, col: number }[], maxSteps = 8): Square[] => {
    const moves: Square[] = [];
    const colIndex = letterToIndex(square.col); // Convert column to index for comparison

    directions.forEach(({ row, col }) => {
        for (let i = 1; i <= maxSteps; i++) {
            const move = board.find(sq =>
                sq.row === square.row + i * row &&
                letterToIndex(sq.col) === colIndex + i * col
            );

            if (!move) break;
            if (move.piece) {
                if (!move.piece.type.includes(color)) moves.push(move); // Capture opponent's piece
                break;
            }
            moves.push(move); // Empty square
        }
    });

    return moves;
};


// where I stopped last
export const getValidMovesToSaveKing = (board: Board, color: string): { from: Square, to: Square }[] => {
    const validSavingMoves: { from: Square, to: Square }[] = [];
    const kingInCheck = isKingInCheck(board, color);
    if (!kingInCheck) {
        return validSavingMoves;
    }
    

    // Find all pieces of this color
    const playerPieces = board.filter(square =>
        square.piece && square.piece.type.includes(color)
    );
    
    // Check each piece's moves
    for (const piece of playerPieces) {
        const validMoves = getValidMoves(board, piece);
        
        // Try each move
        for (const move of validMoves) {
            const simulatedBoard = simulateMove(board, piece, move);
            const stillInCheck = isKingInCheck(simulatedBoard, color);
            
            if (!stillInCheck) {
                // This move saves the king
                validSavingMoves.push({ from: piece, to: move });
            }
        }
    }
    
    return validSavingMoves;
};
// More robust checkmate detection
export const isCheckmate = (board: Board, color: string): boolean => {
    // First check if king is in check
    if (!isKingInCheck(board, color)) {
        return false;
    }
    // Find all pieces of this color
    const playerPieces = board.filter(square =>
        square.piece && square.piece.type.includes(color)
    );

    // Check each piece's moves
    for (const piece of playerPieces) {
        const validMoves = getValidMoves(board, piece);
        // Try each move
        for (const move of validMoves) {
            const simulatedBoard = simulateMove(board, piece, move);
            const stillInCheck = isKingInCheck(simulatedBoard, color);
            if (!stillInCheck) {
                return false; // Found an escape move
            }
        }
    }
    return true; // No escape moves found
}