import { SpriteFrame } from 'cc';
import { DifficultyConfig } from '../Interface/Interface';

export class GameModel {
	public static _difficultyConfig: DifficultyConfig = null;
	public static _icons: SpriteFrame[] = [];
	public static score: number = 0;
	public static turns: number = 0;
	public static matches: number = 0;
	public static combo: number = 0;
	public static difficultyIndex: number = 0;
}
