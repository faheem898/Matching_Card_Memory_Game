import { _decorator, Component, Label, Node } from 'cc';
import { GameModel } from '../data/GameModel';
import EventManager from '../managers/EventManager';
import { AudioFiles, GameEvents } from '../data/GameConfig';
import { UIEffectManager } from '../helper/UIEffectManager';
import { SoundManager } from '../managers/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {
	@property(Label)
	winningAmount: Label = null;

	protected onEnable(): void {
		this.winningAmount.string = GameModel.score.toString();
	}

	private onContinue() {
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.buttonClick]);
		EventManager.getDispatcher().emit(GameEvents.NEXT_LEVEL);
		UIEffectManager.popClose(this.node);
	}
}
