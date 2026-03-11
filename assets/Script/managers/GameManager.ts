import { _decorator, Component } from 'cc';
import { CardGridManager } from './CardGridManager';
import { GameUIManager } from './GameUIManager';
import EventManager from './EventManager';
import { DifficultyConfigs, GameEvents } from '../data/GameConfig';
import { Card } from '../Component/Card';
import { GameModel } from '../data/GameModel';
import { PopUpManager } from './PopUpManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property(CardGridManager)
	CardGridManager: CardGridManager = null;

	@property(GameUIManager)
	gameUIManager: GameUIManager = null;

	@property(PopUpManager)
	popUpManager: PopUpManager = null;

	private openedCards: Card[] = [];
	private matches: number = 0;
	private turns: number = 0;
	private isChecking: boolean = false;

	start() {
		this.initialize();
	}

	private initialize() {
		GameModel.score = 0;
		this.applyDifficultyConfig(GameModel.difficultyIndex);
		this.CardGridManager.populateGrid();
		this.gameUIManager.initialize();
		setTimeout(() => this.showHint(), 100);
		this.registerListener();
	}

	protected registerListener() {
		EventManager.getDispatcher().on(GameEvents.Card_Flipped, this.onCardFlipped, this);
		EventManager.getDispatcher().on(GameEvents.NEXT_LEVEL, this.startNextLevel, this);
	}

	protected onDestroy(): void {
		EventManager.getDispatcher().off(GameEvents.Card_Flipped, this.onCardFlipped, this);
		EventManager.getDispatcher().on(GameEvents.NEXT_LEVEL, this.startNextLevel, this);
	}

	private showHint() {
		const cards = this.CardGridManager.node.children.map((c) => c.getComponent(Card)!);
		cards.forEach((c) => c.flipToFront());
		setTimeout(() => {
			cards.forEach((c) => c.flipToBack());
		}, 1000);
	}

	private onCardFlipped(card: Card) {
		if (this.isChecking) return;

		if (this.openedCards.length >= 2) return;

		this.openedCards.push(card);

		if (this.openedCards.length < 2) return;

		this.turns += 1;

		const [card1, card2] = this.openedCards;

		this.isChecking = true;

		if (card1.frontSprite.spriteFrame === card2.frontSprite.spriteFrame) {
			// MATCH
			this.handleMatch();
			this.matches += 1;

			card1.setMatched();
			card2.setMatched();

			this.openedCards = [];
			this.isChecking = false;

			this.checkGameOver();
		} else {
			// MISMATCH
			setTimeout(() => {
				this.handleMismatch();

				card1.flipToBack();
				card2.flipToBack();

				this.openedCards = [];
				this.isChecking = false;
			}, 800);
		}
	}

	private handleMatch() {
		GameModel.matches++;
		GameModel.turns++;
		let baseScore = 100;
		// Combo bonus
		if (GameModel.combo > 0) {
			baseScore += 50;
		}

		GameModel.combo++;
		GameModel.score += baseScore;

		this.gameUIManager.updateScore(GameModel.score);
		this.gameUIManager.updateMatches(GameModel.matches);
		this.gameUIManager.updateTurns(GameModel.turns);
	}
	private handleMismatch() {
		GameModel.turns++;
		GameModel.combo = 0;

		GameModel.score -= 10;
		if (GameModel.score < 0) GameModel.score = 0;

		this.gameUIManager.updateScore(GameModel.score);
		this.gameUIManager.updateTurns(GameModel.turns);
	}

	private checkGameOver() {
		const totalCards = GameModel._difficultyConfig.totalCards;
		const totalPairs = totalCards / 2;
		if (this.matches >= totalPairs) {
			this.popUpManager.onGameOver();
		}
	}

	public startNextLevel() {
		// Go to next difficulty
		GameModel.difficultyIndex++;

		// Loop back if last level reached
		if (GameModel.difficultyIndex >= DifficultyConfigs.length) {
			GameModel.score = 0;
			GameModel.difficultyIndex = 0;
		}

		this.applyDifficultyConfig(GameModel.difficultyIndex);

		// Reset game state
		this.matches = 0;
		this.turns = 0;

		GameModel.combo = 0;
		GameModel.matches = 0;
		GameModel.turns = 0;

		this.openedCards = [];

		this.CardGridManager.populateGrid();
		this.gameUIManager.initialize();

		setTimeout(() => this.showHint(), 200);
	}

	private applyDifficultyConfig(index: number) {
		const config = DifficultyConfigs[index] ?? DifficultyConfigs[0];
		GameModel._difficultyConfig = config;
	}
}
