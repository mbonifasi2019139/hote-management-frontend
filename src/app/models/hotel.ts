export class Hotel {
    constructor(
        public _id: string,
        public user_admin_hotel:string,
        public name: string,
        public address: string,
        public count_reservations: number,
        public country: string,
        public image: string,
        public rooms: [],
        public events: [],
    ){}
}