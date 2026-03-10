import { DifficultyLevel } from '../data/GameConfig';

export interface GridLayout {
	rows: number;
	cols: number;
}

export interface DifficultyConfig {
	level: DifficultyLevel;
	layout: GridLayout;
}
