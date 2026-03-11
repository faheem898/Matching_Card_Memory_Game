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
		totalCards: 8,
	},
	{
		level: DifficultyLevel.Medium,
		layout: { rows: 4, cols: 4 },
		totalCards: 16,
	},
	{
		level: DifficultyLevel.Hard,
		layout: { rows: 5, cols: 5 },
		totalCards: 24,
	},
	{
		level: DifficultyLevel.Expert,
		layout: { rows: 5, cols: 6 },
		totalCards: 30,
	},
	{
		level: DifficultyLevel.Master,
		layout: { rows: 6, cols: 7 },
		totalCards: 38,
	},
];

export enum GameScene {
	Menu = 'Menu',
	Game = 'Game',
}

export enum GameEvents {
	Card_Flipped = 'Card_Flipped',
}
