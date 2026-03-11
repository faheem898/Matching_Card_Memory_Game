import { _decorator, Component, Toggle } from 'cc';
import { GameModel } from '../data/GameModel';
import { SoundManager } from '../managers/SoundManager'; // import your SoundManager
const { ccclass, property } = _decorator;

@ccclass('SoundToggle')
export class SoundToggle extends Component {
	@property(Toggle)
	soundToggle: Toggle = null;

	start() {
		if (!this.soundToggle) return;
		this.soundToggle.isChecked = !GameModel.isMusicOff;

		this.soundToggle.node.on(Toggle.EventType.TOGGLE, this.onToggleChange, this);
	}

	private onToggleChange(toggle: Toggle) {
		if (!toggle) return;
		GameModel.isMusicOff = !toggle.isChecked;

		const soundMgr = SoundManager.getInstance();
		if (GameModel.isMusicOff) {
			soundMgr.pauseBGMusic();
			soundMgr.stopAllSFX();
		} else {
			soundMgr.resumeBGMusic();
		}
	}
}
