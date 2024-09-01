class Report {
  cache: {
    source: null;
    analyses: null;
    report: {
      [value: string]: any;
    };
    rlines: string[];
  };
  constructor() {
    this.cache = { source: null, analyses: null, report: {}, rlines: [] };
  }

  display(rlines: string[]) {
    console.log("types: ", rlines);
    // Use cached HTMl content if there is no updated data.
    if (rlines == null) {
      rlines = this.cache.rlines;
    } else {
      this.cache.rlines = rlines;
      this.cache.report = {};
    }

    console.log("Here's the report: ", this.cache.report);
    // Build and display the report HTML.
    let linesOutput = [];
    for (let i = 0; i < Math.min(rlines.length); i++) {
      const row = i + 1;
      if (row in this.cache.report) {
        linesOutput.push(this.cache.report[row]);
      } else {
        const html = rlines[i];
        linesOutput.push(html);
        this.cache.report[row] = html;
      }
    }
  }
}

export default Report;
