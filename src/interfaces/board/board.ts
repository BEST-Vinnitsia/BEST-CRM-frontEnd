export interface IBoard {
    id: string;
    name: string;
    // fullName: string;
    // description: string;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IBoardGetById extends Pick<IBoard, 'id'> {}

export interface IBoardCreate extends Omit<IBoard, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IBoardUpdate extends Omit<IBoard, 'name' | 'createdAt' | 'updatedAt'> {}

export interface IBoardDeleteArray {
    boardsId: string[];
}
