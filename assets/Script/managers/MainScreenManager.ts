import { _decorator, AudioClip, Component, director, ToggleContainer } from 'cc';
import { DifficultyLevel, DifficultyConfigs, GameScene, AudioFiles } from '../data/GameConfig';
import { GridLayout } from '../Interface/Interface';
import { GameModel } from '../data/GameModel';
import { SoundManager } from './SoundManager';

const { ccclass, property } = _decorator;

@ccclass('MainScreenManager')
export class MainScreenManager extends Component {
	@property({ type: ToggleContainer })
	difficultyToggleGroup: ToggleContainer | null = null;

	@property({ type: AudioClip })
	audioClips: AudioClip[] = [];

	private selectedDifficulty: DifficultyLevel = DifficultyConfigs[0].level;
	private selectedLayout: GridLayout = DifficultyConfigs[0].layout;

	start() {
		this.readInitialSelection();
		GameModel.audioClips = this.audioClips;
		SoundManager.getInstance().playBGMusic(GameModel.audioClips[AudioFiles.Bg]);
	}

	private readInitialSelection() {
		this.applyDifficultyConfig(this.getSelectedDifficultyIndex());
	}

	private getSelectedDifficultyIndex(): number {
		const toggles = this.difficultyToggleGroup?.toggleItems;
		if (!toggles) return 0;
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.buttonClick]);
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
		GameModel.difficultyIndex = index;
		director.loadScene(GameScene.Game);
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.buttonClick]);
	}

	private onDifficultyToggle() {
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.buttonClick]);
	}
}
