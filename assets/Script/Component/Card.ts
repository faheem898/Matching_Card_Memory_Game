import { _decorator, Component, Node, Sprite, SpriteFrame, tween, Vec3, EventTouch } from 'cc';
import EventManager from '../managers/EventManager';
import { AudioFiles, GameEvents } from '../data/GameConfig';
import { SoundManager } from '../managers/SoundManager';
import { GameModel } from '../data/GameModel';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
	@property(Sprite)
	frontSprite: Sprite = null;

	@property(Sprite)
	backSprite: Sprite = null;

	private icon: SpriteFrame = null;
	isFlipped: boolean = false;
	isMatched: boolean = false;

	start() {
		this.node.on(Node.EventType.TOUCH_END, this.onCardClicked, this);
		this.showBack();
	}

	setIcon(icon: SpriteFrame) {
		if (!this.frontSprite) return;
		this.icon = icon;
		this.frontSprite.spriteFrame = icon;
	}

	private onCardClicked(event: EventTouch) {
		if (this.isFlipped || this.isMatched) return;

		this.flipToFront();
		SoundManager.getInstance().playSFX(GameModel.audioClips[AudioFiles.Cardflip]);
		// Dispatch event to notify GameManager
		EventManager.getDispatcher().emit(GameEvents.Card_Flipped, this);
	}

	flipToFront() {
		if (!this.backSprite || !this.frontSprite) return;
		this.isFlipped = true;
		tween(this.node)
			.to(0.15, { scale: new Vec3(0, 1, 1) })
			.call(() => {
				this.showFront();
			})
			.to(0.15, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	flipToBack() {
		if (!this.backSprite || !this.frontSprite) return;
		this.isFlipped = false;
		tween(this.node)
			.to(0.15, { scale: new Vec3(0, 1, 1) })
			.call(() => {
				this.showBack();
			})
			.to(0.15, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	private showFront() {
		if (!this.frontSprite || !this.backSprite) return;
		this.frontSprite.node.active = true;
		this.backSprite.node.active = false;
	}

	private showBack() {
		if (!this.frontSprite || !this.backSprite) return;
		this.frontSprite.node.active = false;
		this.backSprite.node.active = true;
	}

	setMatched() {
		this.isMatched = true;
		this.isFlipped = true;

		tween(this.node)
			.to(0.3, { scale: new Vec3(0, 0, 1) })
			.start();
	}

	resetCard() {
		this.isFlipped = false;
		this.isMatched = false;
		this.showBack();
		this.node.scale = new Vec3(1, 1, 1);
	}
}
