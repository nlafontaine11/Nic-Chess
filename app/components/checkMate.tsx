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


// Find the king's position on the board
export const findKing = (board: Board, color: string) => {
    if(color === 'Black'){
        return board.find(square => square.piece?.type === 'BlackKing');
    }
    else{
        return board.find(square => square.piece?.type === 'WhiteKing');
    }
};

// Check if the king is in check
export const isKingInCheck = (board: Board, color: string) => {
    const king = findKing(board, color);
    if (!king) {
        console.warn(`King for ${color} not found!`);
        return false;
    }

    return board.some(square =>
        square.piece &&
        !square.piece.type.includes(color) && // Ensures it's an opponent's piece
        getValidMoves(board, square).some(move => move.row === king.row && move.col === king.col)
    );
};
// Convert a letter (a-h) to its corresponding index (0-7)
const letterToIndex = (letter: string): number => {
    return letter.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' becomes 0, 'b' becomes 1, ..., 'h' becomes 7
};

// Convert an index (0-7) back to a letter (a-h)
const indexToLetter = (index: number): string => {
    return String.fromCharCode(index + 'a'.charCodeAt(0)); // 0 becomes 'a', 1 becomes 'b', ..., 7 becomes 'h'
};

// Simulate a move and return the new board state
export const simulateMove = (board: Board, from: Square, to: Square): Board => {
    // Convert columns to indices for easier comparison
    const fromColIndex = letterToIndex(from.col);
    const toColIndex = letterToIndex(to.col);

    return board.map(square => {
        if (square.row === from.row && square.col === from.col) {
            return { ...square, piece: undefined }; // Clear the original piece
        } else if (square.row === to.row && square.col === to.col) {
            return { ...square, piece: from.piece }; // Place the piece in the new square
        }
        return square;
    });
};


// Generate valid moves for a specific piece
export const getValidMoves = (board: Board, square: Square): Square[] => {
    if (!square.piece) return [];
    const { type } = square.piece;
    
    // Extract color from type (assuming types are "WhitePawn", "BlackKnight", etc.)
    const color = type.includes("White") ? "White" : "Black";
    const pieceType = type.replace("White", "").replace("Black", ""); // Strip color

    // Convert letter (column) to index (0-7)
    const colIndex = letterToIndex(square.col);

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


export const getQueenMoves = (board: Board, square: Square, color: string): Square[] => {
    return [...getRookMoves(board, square, color), ...getBishopMoves(board, square, color)];
};

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


// Generate valid moves for sliding pieces (rook, bishop, queen)
const getSlidingMoves = (board: Board, square: Square, color: string, directions: { row: number, col: number }[], maxSteps = 8): Square[] => {
    const moves: Square[] = [];
    const colIndex = letterToIndex(square.col); // Convert column to index for comparison

    directions.forEach(({ row, col }) => {
        for (let i = 1; i <= maxSteps; i++) {
            const move = board.find(sq => sq.row === square.row + i * row && letterToIndex(sq.col) === colIndex + i * col);
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


// Checkmate detection
export const isCheckmate = (board: Board, color: string) => {
    if (!isKingInCheck(board, color)) return false;

    // Check if any move can escape check
    return board
        .filter(square => square.piece && square.piece.type.includes(color)) // Only current player's pieces
        .every(square =>
            getValidMoves(board, square).every(move => {
                const simulatedBoard = simulateMove(board, square, move);
                return isKingInCheck(simulatedBoard, color);
            })
        );
};
