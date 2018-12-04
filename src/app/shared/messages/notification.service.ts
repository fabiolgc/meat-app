import { EventEmitter } from '@angular/core';

export class NotificationsService {
    notifier = new EventEmitter<string>()

    notify(message: string) {
        this.notifier.emit(message)
    }
}