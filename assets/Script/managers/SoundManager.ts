import { AudioClip, AudioSource } from 'cc';
import { GameModel } from '../data/GameModel'; // Your model holding sound settings

export class SoundManager {
	private static instance: SoundManager;

	private bgAudioSource: AudioSource;
	private sfxAudioSource: AudioSource;

	private constructor() {
		this.bgAudioSource = new AudioSource();
		this.sfxAudioSource = new AudioSource();
	}

	static getInstance(): SoundManager {
		if (!SoundManager.instance) {
			SoundManager.instance = new SoundManager();
		}
		return SoundManager.instance;
	}

	// Play background music
	playBGMusic(clip: AudioClip) {
		if (!clip) return;
		if (GameModel.isMusicOff) return;

		this.bgAudioSource.stop();
		this.bgAudioSource.clip = clip;
		this.bgAudioSource.loop = true;
		this.bgAudioSource.play();
	}

	stopBGMusic() {
		this.bgAudioSource.stop();
	}

	// Play SFX once
	playSFX(clip: AudioClip) {
		if (!clip) return;
		if (GameModel.isMusicOff) return;
		this.sfxAudioSource.playOneShot(clip, 1);
	}

	stopAllSFX() {
		this.sfxAudioSource.stop();
	}
}
