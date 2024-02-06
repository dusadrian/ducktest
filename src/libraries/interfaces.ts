
export interface DFList {
	id: number;
	v1: string;
	v2: string;
	obs: string;
}

export interface Database {
	get_df: () => Promise<Array<DFList>>;
}