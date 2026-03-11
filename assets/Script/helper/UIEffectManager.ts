import { Node, tween, Vec3 } from 'cc';

export class UIEffectManager {
	public static popUp(node: Node) {
		if (!node) return;

		node.active = true;
		node.setScale(new Vec3(0, 0, 0));

		tween(node)
			.to(0.2, { scale: new Vec3(1.1, 1.1, 1) })
			.to(0.1, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	public static popClose(node: Node) {
		if (!node) return;
		tween(node)
			.to(0.2, { scale: new Vec3(0, 0, 0) })
			.call(() => {
				node.active = false;
			})
			.start();
	}
}
