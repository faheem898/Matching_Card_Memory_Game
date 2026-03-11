import { Event, EventTarget } from 'cc'

export default class EventManager {
    static clear() {
        EventManager.dispatcher = null;
    }

    static getDispatcher() : EventTarget {
        if (!EventManager.dispatcher) {
            EventManager.dispatcher = new EventTarget();
        }
        return EventManager.dispatcher;
    }

    static dispatchCustomEvent = function (eventType, eventTarget, userData = null, bubbles = true): void {
        if (!eventTarget) {
            return null;
        }
        let event = new CustomEvent(eventType, bubbles);
        event.detail = (userData);
        eventTarget.dispatchEvent(event);
    }

    private static dispatcher : EventTarget;
}

export class CustomEvent extends Event {
    constructor(name: string, bubbles?: boolean, detail?: any){
        super(name, bubbles);
        this.detail = detail;
    }

    setUserDetail(data: any) {
        this.detail = this.detail;
    }

    getUserDetail(): any {
        return this.detail;
    }
    public detail: any = null;
}