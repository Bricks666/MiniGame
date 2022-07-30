export interface Source extends HTMLElement {
	src: string;
}

export interface SourceConstructor {
	new (...args: any[]): Source;
}
