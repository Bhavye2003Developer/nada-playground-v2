import useInputCache from "../stores/useProgramCache";

export type outsType = [string, number][];
export type InsType = {
  [name: string]: any;
};

export default class Interpreter {
  cache: {
    inputs: {
      [name: string]: any;
    };
    signature: string;
  };

  constructor() {
    this.cache = { inputs: {}, signature: "" };
  }

  inputsRetrieve() {
    const inputsFromScreen = useInputCache.getState().inputs;

    const inputs: {
      [name: string]: string | number[];
    } = {};
    Object.keys(inputsFromScreen).forEach((inputName) => {
      const inputElement = inputsFromScreen[inputName];
      inputs[inputName] = [inputElement.value, inputElement.type];
    });
    return inputs;
  }

  getFormatedInputs(ins: InsType) {
    const inputs = useInputCache.getState().inputs;
    for (let i = 0; i < ins.length; ++i) {
      const name = ins[i][0];
      if (name in this.cache.inputs && name in inputs) {
        this.cache.inputs[name] = inputs[name].value;
      } else if (!(name in inputs)) {
        delete this.cache.inputs[name];
      }
    }

    let inputsJSON = "";
    for (let i = 0; i < ins.length; i++) {
      const name = ins[i][0];
      if (!(name in this.cache.inputs)) {
        this.cache.inputs[name] = 1 + Math.floor(Math.random() * 255);
      }
      const value = this.cache.inputs[name];

      inputsJSON +=
        '  "' +
        name +
        '": ' +
        JSON.stringify({ value: value, type: ins[i][1] }, null, 2)
          .replace(/\n/g, "")
          .replace(/\s\s/g, "") +
        (i == ins.length - 1 ? "" : ",") +
        "\n";
    }
    inputsJSON = JSON.parse("{\n" + inputsJSON + "}");
    return inputsJSON;
  }

  inputsShow(ins: InsType) {
    const signature = ins.join(",");
    if (signature == this.cache.signature) {
      return this.getFormatedInputs(ins);
    } else {
      this.cache.signature = signature;
    }

    return this.getFormatedInputs(ins);
  }

  outputsShow(outs: outsType) {
    const output = [];
    for (let i = 0; i < outs.length; i++) {
      const output_name = outs[i][0];
      const output_value = outs[i][1];

      output.push({ name: output_name, value: output_value });
    }
    useInputCache.getState().updateOutput(output);
    return output;
  }
}
