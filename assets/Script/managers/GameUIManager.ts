import { _decorator, Component, director, Label, Node } from 'cc';
import { GameScene } from '../data/GameConfig';
const { ccclass, property } = _decorator;

@ccclass('GameUIManager')
export class GameUIManager extends Component {
	@property(Label)
	matchesLabel: Label = null;
	@property(Label)
	turnLabel: Label = null;

	initialize() {
		this.setMatchesCount(0);
		this.setTurnCount(0);
	}

	setMatchesCount(matches: number) {
		this.matchesLabel.string = matches.toString();
	}

	setTurnCount(turn: number) {
		this.turnLabel.string = turn.toString();
	}

	private onHomeClick() {
		director.loadScene(GameScene.Menu);
	}
}
