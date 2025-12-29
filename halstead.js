function calculateHalstead(code) {

  const operatorRegex =
    /[+\-*/%=&|<>!?:]+|return|if|else|for|while|switch|case|break|function|=>/g;

  const operandRegex =
    /\b[A-Za-z_][A-Za-z0-9_]*\b|\b\d+(\.\d+)?\b/g;

  const operators = code.match(operatorRegex) || [];
  const operands = code.match(operandRegex) || [];

  const n1 = new Set(operators).size;
  const n2 = new Set(operands).size;
  const N1 = operators.length;
  const N2 = operands.length;

  const vocabulary = n1 + n2;
  const length = N1 + N2;
  const volume = vocabulary > 0 ? length * Math.log2(vocabulary) : 0;
  const difficulty = n2 > 0 ? (n1 / 2) * (N2 / n2) : 0;
  const effort = difficulty * volume;

  return { n1, n2, N1, N2, vocabulary, length, volume, difficulty, effort };
}

function calculateLiveVariables(code) {

  const lines = code.split("\n");
  const assigned = new Set();
  const live = new Set();

  lines.forEach(line => {
    const assign = line.match(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
    if (assign) assigned.add(assign[1]);

    assigned.forEach(v => {
      if (line.includes(v)) live.add(v);
    });
  });

  return live.size;
}
