
export interface DFList {
	Area: number;
	Gender: string;
	Age: string;
	Children: string;
}

export interface Database {
	get_df: () => Promise<Array<DFList>>;
}