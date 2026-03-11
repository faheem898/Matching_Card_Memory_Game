import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { UIEffectManager } from '../helper/UIEffectManager';
import { SoundManager } from './SoundManager';
import { GameModel } from '../data/GameModel';
import { AudioFiles } from '../data/GameConfig';
const { ccclass, property } = _decorator;

@ccclass('PopUpManager')
export class PopUpManager extends Component {
	@property(Node)
	gameOverPopUp: Node = null;

	onGameOver() {
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.GameOver]);
		UIEffectManager.popUp(this.gameOverPopUp);
	}
}
