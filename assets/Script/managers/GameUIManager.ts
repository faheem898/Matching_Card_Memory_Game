import { _decorator, Component, director, Label, Node } from 'cc';
import { GameScene } from '../data/GameConfig';
const { ccclass, property } = _decorator;

@ccclass('GameUIManager')
export class GameUIManager extends Component {
	@property(Label)
	matchesLabel: Label = null;
	@property(Label)
	turnLabel: Label = null;
	@property(Label)
	scoreLabel: Label = null;

	initialize() {
		this.updateMatches(0);
		this.updateTurns(0);
	}

	updateScore(score: number) {
		this.scoreLabel.string = score.toString();
	}

	updateMatches(matches: number) {
		this.matchesLabel.string = matches.toString();
	}

	updateTurns(turn: number) {
		this.turnLabel.string = turn.toString();
	}

	private onHomeClick() {
		director.loadScene(GameScene.Menu);
	}
}
