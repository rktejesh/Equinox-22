import Scrollbar from 'smooth-scrollbar'

export default class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {

    transformDelta(delta, fromEvent) {
        if (!/wheel/.test(fromEvent.type)) {
            return delta
        }

        const { x, y } = delta

        return {
            y: 0,
            x: Math.abs(x) > Math.abs(y) ? x : y,
            // x: Math.sign(x || y) * Math.sqrt(x*x + y*y),
        }
    }

    shouldInvertDelta(fromEvent) {
        return this.options.events.some((rule) => fromEvent.type.match(rule))
    }

}

HorizontalScrollPlugin.pluginName = 'horizontalScroll'
HorizontalScrollPlugin.defaultOptions = { events: [] }
