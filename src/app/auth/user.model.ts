export class User {
    constructor (
        public email: string,
        public _id: string,
        private _token: string,
        private expiresIn : Date
    ) {}

    get token() {
        if (!this.expiresIn || new Date()> this.expiresIn) {
            return null
        }

        return this._token
    }
}