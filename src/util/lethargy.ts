// Source: https://github.com/d4nyll/lethargy/blob/f83d840ea83880fa19f58c0642c018dce58239c8/lethargy.coffee

export class Lethargy {
	private lastUpDeltas = Array.from(Array(this.stability * 2))
	private lastDownDeltas = Array.from(Array(this.stability * 2))
	private deltasTimestamp = Array.from(Array(this.stability * 2))

	constructor(
		// Stability is how many records to use to calculate the average
		private stability = 8,
		// The wheelDelta threshold. If an event has a wheelDelta below this value, it will not register
		private sensitivity = 100,
		// How much the old rolling average have to differ from the new rolling average for it to be deemed significant
		private tolerance = 1.1,
		// Threshold for the amount of time between mousewheel events for them to be deemed separate
		private delay = 150
	) {}

	check(delta: number): 1 | -1 | false {
		// Add the new event timestamp to deltasTimestamp array, and remove the oldest entry
		this.deltasTimestamp.push(Date.now())
		this.deltasTimestamp.shift()
		// If lastDelta is positive, it means the user scrolled up
		if (delta === 0) return false
		if (delta > 0) {
			this.lastUpDeltas.push(delta)
			this.lastUpDeltas.shift()
			return this.isInertia(1)
		}
		this.lastDownDeltas.push(delta)
		this.lastDownDeltas.shift()
		return this.isInertia(-1)
	}

	private isInertia(direction: 1 | -1) {
		// Get the relevant last*Delta array
		const lastDeltas = direction == -1 ? this.lastDownDeltas : this.lastUpDeltas

		// If the array is not filled up yet, we cannot compare averages, so assume
		// the scroll event to be intentional
		if (lastDeltas[0] == null) return direction

		// If the last mousewheel occurred within the specified delay of the
		// penultimate one, and their values are the same. We will assume that this
		// is a trackpad with a constant profile, and will return false
		if (
			this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() &&
			lastDeltas[0] == lastDeltas[this.stability * 2 - 1]
		)
			return false

		// Check to see if the new rolling average (based on the last half of the
		// lastDeltas array) is significantly higher than the old rolling average.
		// If so return direction, else false
		const lastDeltasOld = lastDeltas.slice(0, this.stability)
		const lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2)

		const oldSum = lastDeltasOld.reduce((t, s) => t + s)
		const newSum = lastDeltasNew.reduce((t, s) => t + s)

		const oldAverage = oldSum / lastDeltasOld.length
		const newAverage = newSum / lastDeltasNew.length

		if (
			Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) &&
			this.sensitivity < Math.abs(newAverage)
		)
			return direction

		return false
	}
}
