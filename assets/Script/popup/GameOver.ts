import { _decorator, Component, Label, Node } from 'cc';
import { GameModel } from '../data/GameModel';
import EventManager from '../managers/EventManager';
import { GameEvents } from '../data/GameConfig';
import { UIEffectManager } from '../helper/UIEffectManager';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {
	@property(Label)
	winningAmount: Label = null;

	protected onEnable(): void {
		this.winningAmount.string = GameModel.score.toString();
	}

	private onContinue() {
		EventManager.getDispatcher().emit(GameEvents.NEXT_LEVEL);
		UIEffectManager.popClose(this.node);
	}
}
