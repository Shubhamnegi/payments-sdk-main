export class UsernameAlreadyTaken extends Error {
    constructor(username: string) {
        super(`Error occured. Username ${username} is already taken`)
        this.name = 'UsernameAlreadyTaken';
        // This is required for instance of
        Object.setPrototypeOf(this, UsernameAlreadyTaken.prototype);
    }
}