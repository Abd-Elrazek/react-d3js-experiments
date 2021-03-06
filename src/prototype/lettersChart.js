import * as d3 from "d3";
import BaseChart from "./baseChart";

const minWidth = 20;
const animDuration = 500;

class LettersChart extends BaseChart {

	prepareContainer(ph) {
		super.prepareContainer(ph);
		this.container
				.attr("class", "letters-stats")
				.attr("transform", `translate(0, ${this.size.height / 2})`);
	}

	prepareScales() {
		this.scaleFreq = d3.scaleLinear().range([0.1, 1]);
		this.scalePos = d3.scaleLinear().range([0, this.size.width]);
	}

	update(data) {

		this.processData(data);

		const letters = this.container.selectAll("g").data(data);

		const exit = letters.exit().remove();

		const enter = letters
						.enter()
						.append("g")
							.attr("transform", (d) => `translate(${this.scalePos(d._offset)}, 0)`);
		enter
			.append("rect")
				.attr("height", 10)
				.attr("rx", 3)
				.attr("ry", 3)
				.style("fill", "gold")
				.style("stroke", "white");

		enter
			.append("circle")
				.attr("r", 8)
				.attr("cy", 5)
				.style("fill", "gold");

		enter
			.append("text")
				.style("text-anchor", "middle")
				.style("font", "10px monospace")
				.text((d) => d.letter)
				.attr("y", 7);

		const update = enter.merge(letters);

		update
			.transition().duration(animDuration)
			.attr("transform", (d) => `translate(${this.scalePos(d._offset)}, 0)`);

		update
			.select("rect")
			.transition().duration(animDuration)
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("width", (d) => this.scalePos(d._width));

		update
			.select("circle")
			.transition().duration(animDuration)
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("cx", (d) => this.scalePos(d._width) / 2);

		update
			.select("text")
			.transition().duration(animDuration)
			.attr("x", (d) => this.scalePos(d._width) / 2);
	}

	processData(data) {
		let offset = 0;
		data.forEach((d) => {
			d._width = this.scaleFreq(d.frac) ;
			d._offset = offset;
			offset += d._width;
		});

		this.scalePos.domain([0, offset]);
		return data;
	}

}

export default LettersChart;