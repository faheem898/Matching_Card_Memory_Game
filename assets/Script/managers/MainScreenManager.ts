import { _decorator, Component, director, ToggleContainer } from 'cc';
import { DifficultyLevel, DifficultyConfigs, GameScene } from '../data/GameConfig';
import { GridLayout } from '../Interface/Interface';
import { GameModel } from '../data/GameModel';

const { ccclass, property } = _decorator;

@ccclass('MainScreenManager')
export class MainScreenManager extends Component {
	@property({ type: ToggleContainer })
	difficultyToggleGroup: ToggleContainer | null = null;

	private selectedDifficulty: DifficultyLevel = DifficultyConfigs[0].level;
	private selectedLayout: GridLayout = DifficultyConfigs[0].layout;

	start() {
		this.readInitialSelection();
	}

	private readInitialSelection() {
		this.applyDifficultyConfig(this.getSelectedDifficultyIndex());
	}

	private getSelectedDifficultyIndex(): number {
		const toggles = this.difficultyToggleGroup?.toggleItems;
		if (!toggles) return 0;

		const index = toggles.findIndex((toggle) => toggle.isChecked);
		return index >= 0 ? index : 0;
	}

	private applyDifficultyConfig(index: number) {
		const config = DifficultyConfigs[index] ?? DifficultyConfigs[0];

		this.selectedDifficulty = config.level;
		this.selectedLayout = config.layout;

		GameModel._difficultyConfig = config;
	}

	onClickStartGame() {
		const index = this.getSelectedDifficultyIndex();
		this.applyDifficultyConfig(index);

		director.loadScene(GameScene.Game);
	}
}
