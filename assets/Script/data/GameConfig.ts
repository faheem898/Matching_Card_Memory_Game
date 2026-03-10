import { DifficultyConfig } from '../Interface/Interface';

export enum DifficultyLevel {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
	Expert = 'expert',
	Master = 'master',
}

export const DifficultyConfigs: DifficultyConfig[] = [
	{
		level: DifficultyLevel.Easy,
		layout: { rows: 3, cols: 3 },
	},
	{
		level: DifficultyLevel.Medium,
		layout: { rows: 4, cols: 4 },
	},
	{
		level: DifficultyLevel.Hard,
		layout: { rows: 5, cols: 5 },
	},
	{
		level: DifficultyLevel.Expert,
		layout: { rows: 5, cols: 6 },
	},
	{
		level: DifficultyLevel.Master,
		layout: { rows: 6, cols: 7 },
	},
];

export enum GameScene {
	Menu = 'Menu',
	Game = 'Game',
}
