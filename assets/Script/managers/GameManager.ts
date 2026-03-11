import { _decorator, Component } from 'cc';
import { CardGridManager } from './CardGridManager';
import { GameUIManager } from './GameUIManager';
import EventManager from './EventManager';
import { GameEvents } from '../data/GameConfig';
import { Card } from '../Component/Card';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property(CardGridManager)
	CardGridManager: CardGridManager = null;

	@property(GameUIManager)
	gameUIManager: GameUIManager = null;

	private openedCards: Card[] = [];
	private matches: number = 0;
	private turns: number = 0;

	start() {
		this.initialize();
	}

	private initialize() {
		this.CardGridManager.populateGrid();
		this.gameUIManager.initialize();

		// Delay hint reveal after 0.1s
		setTimeout(() => this.showHint(), 100);

		this.registerListener();
	}

	protected registerListener() {
		EventManager.getDispatcher().on(GameEvents.Card_Flipped, this.onCardFlipped, this);
	}

	protected onDestroy(): void {
		EventManager.getDispatcher().off(GameEvents.Card_Flipped, this.onCardFlipped, this);
	}

	private showHint() {
		const cards = this.CardGridManager.node.children.map((c) => c.getComponent(Card)!);
		cards.forEach((c) => c.flipToFront());
		setTimeout(() => {
			cards.forEach((c) => c.flipToBack());
		}, 2000);
	}

	private onCardFlipped(card?: Card) {
		const c = card || this.CardGridManager.node.children.map((n) => n.getComponent(Card)!).find((c) => c.isFlipped && !c.isMatched && !this.openedCards.includes(c));
		if (!c) return;
		this.openedCards.push(c);
		if (this.openedCards.length < 2) return;

		// Two cards opened, check match
		this.turns += 1;
		const [card1, card2] = this.openedCards;
		if (card1.frontSprite.spriteFrame === card2.frontSprite.spriteFrame) {
			// Matched
			this.matches += 1;
			card1.setMatched();
			card2.setMatched();
			this.openedCards = [];
			this.updateUI();
		} else {
			// Not matched, flip back after 1 second
			setTimeout(() => {
				card1.flipToBack();
				card2.flipToBack();
				this.openedCards = [];
				this.updateUI();
			}, 1000);
		}
	}

	private updateUI() {
		this.gameUIManager.setMatchesCount(this.matches);
		this.gameUIManager.setTurnCount(this.turns);
	}
}
