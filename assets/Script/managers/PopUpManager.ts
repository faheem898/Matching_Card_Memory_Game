import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { UIEffectManager } from '../helper/UIEffectManager';
const { ccclass, property } = _decorator;

@ccclass('PopUpManager')
export class PopUpManager extends Component {
	@property(Node)
	gameOverPopUp: Node = null;

	onGameOver() {
		UIEffectManager.popUp(this.gameOverPopUp);
	}
}
