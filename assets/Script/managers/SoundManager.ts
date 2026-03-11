import { AudioClip, AudioSource } from 'cc';
import { GameModel } from '../data/GameModel';

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

	pauseBGMusic() {
		if (this.bgAudioSource.playing) {
			this.bgAudioSource.pause();
		}
	}

	resumeBGMusic() {
		if (!GameModel.isMusicOff && this.bgAudioSource.clip && !this.bgAudioSource.playing) {
			this.bgAudioSource.play();
		}
	}

	playSFX(clip: AudioClip, volume: number = 1) {
		if (!clip) return;
		if (GameModel.isMusicOff) return;

		this.sfxAudioSource.playOneShot(clip, volume);
	}

	stopAllSFX() {
		this.sfxAudioSource.stop();
	}
}
