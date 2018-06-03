import GoodFood from './GoodFood.js'

export default class extends GoodFood {
    constructor ({x, y}) {
        super(x, y, 'burrito')
        this.anchor.setTo(0.5)
        this.fartModifier = 200;
    }
}
