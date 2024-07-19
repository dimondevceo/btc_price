export default class PriceFetchInterface {
    async fetchPrice() {
        throw new Error('Method fetchPrice() must be implemented in child class');
    }
}
