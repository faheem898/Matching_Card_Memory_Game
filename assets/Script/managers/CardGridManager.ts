import { _decorator, Component, Prefab, instantiate, Vec3, SpriteFrame, UITransform } from 'cc';
import { GameModel } from '../data/GameModel';
import { Card } from '../Component/Card';
const { ccclass, property } = _decorator;

@ccclass('CardGridManager')
export class CardGridManager extends Component {
	@property(Prefab)
	cardPrefab: Prefab | null = null;
	@property(SpriteFrame)
	cardSpriteFrame: SpriteFrame[] = [];
	@property
	spacingX: number = 50;
	@property
	spacingY: number = 50;
	@property
	cardSize: number = 100;

	populateGrid() {
		if (!this.cardPrefab) return;
		GameModel._icons = this.cardSpriteFrame;
		const layout = GameModel._difficultyConfig.layout;
		const rows = layout.rows;
		const cols = layout.cols;
		this.scaleGrid(rows, cols);
		this.clearGrid();

		const emptyIndices = this.getEmptyIndices(rows, cols);
		const cardIndices = this.getCardIndices(rows, cols, emptyIndices);
		const cardsArray = this.generateShuffledCards(cardIndices.length);

		this.instantiateCardsManual(rows, cols, emptyIndices, cardsArray);
	}

	private clearGrid() {
		this.node.removeAllChildren();
	}

	private getEmptyIndices(rows: number, cols: number): number[] {
		const emptyIndices: number[] = [];

		// Center empty for 3x3 or 5x5
		if ((rows === 3 && cols === 3) || (rows === 5 && cols === 5)) {
			const centerRow = Math.floor(rows / 2);
			const centerCol = Math.floor(cols / 2);
			emptyIndices.push(centerRow * cols + centerCol);
		}

		// 6x7 → 4 corners empty
		if (rows === 6 && cols === 7) {
			emptyIndices.push(0, cols - 1, rows * cols - cols, rows * cols - 1);
		}

		return emptyIndices;
	}

	private getCardIndices(rows: number, cols: number, emptyIndices: number[]): number[] {
		const indices: number[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const idx = r * cols + c;
				if (!emptyIndices.includes(idx)) indices.push(idx);
			}
		}
		return indices;
	}

	private generateShuffledCards(totalCards: number): SpriteFrame[] {
		const pairCount = totalCards / 2;
		let icons = GameModel._icons.slice(0, pairCount);
		while (icons.length < pairCount) {
			icons = icons.concat(GameModel._icons.slice(0, pairCount - icons.length));
		}
		let cardsArray: SpriteFrame[] = [...icons, ...icons];

		// Shuffle
		for (let i = cardsArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
		}

		return cardsArray;
	}

	private instantiateCardsManual(rows: number, cols: number, emptyIndices: number[], cardsArray: SpriteFrame[]) {
		let cardIndex = 0;

		// Total grid size
		const gridWidth = cols * this.cardSize + (cols - 1) * this.spacingX;
		const gridHeight = rows * this.cardSize + (rows - 1) * this.spacingY;

		const startX = -gridWidth / 2 + this.cardSize / 2;
		const startY = gridHeight / 2 - this.cardSize / 2;

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const idx = r * cols + c;
				if (emptyIndices.includes(idx)) continue;

				const card = instantiate(this.cardPrefab!);
				card.getComponent(Card)!.setIcon(cardsArray[cardIndex]);
				cardIndex++;

				const x = startX + c * (this.cardSize + this.spacingX);
				const y = startY - r * (this.cardSize + this.spacingY);

				card.setPosition(new Vec3(x, y, 0));
				card.getComponent(UITransform)!.setContentSize(this.cardSize, this.cardSize);

				this.node.addChild(card);
			}
		}
	}
	private scaleGrid(rows: number, cols: number) {
		const baseCells = 6 * 7; // largest grid
		const currentCells = rows * cols;
		let finalScale = Math.sqrt(baseCells / currentCells);
		if (finalScale > 2) finalScale = 2;
		this.node.setScale(finalScale, finalScale, 1);
	}
}
