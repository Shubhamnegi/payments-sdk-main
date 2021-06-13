export class SubscriberNotFound extends Error {
    constructor(username: string) {
        super("Error occured search for plan named " + username)
        this.name = 'SubsriberNotFound';
        // This is required
        Object.setPrototypeOf(this, SubscriberNotFound.prototype);
    }
}