type Example = {
  name: string;
  code: string;
};

const examples: Example[] = [
  {
    name: "multiplication_mixed_simple",
    code: `
# The left-hand panel can scrolled and edited. The right-hand
# panel will automatically be updated with the results of the
# type checking and cost calculation static analyses. Green
# represents public Nada expressions/values and blue represents
# secret Nada expressions/values.

# On the right-hand panel, hover over variable names to see a
# count of the total number of *secret* operations that must be
# executed to determine the value of that variable at that point
# in the program. There is no deduplication (as in the current
# implementation).

from nada_audit import *

def nada_main():
    party1 = Party(name="Party1")
    my_int1 = PublicInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    new_int = my_int1 * my_int2

    return [Output(new_int, "my_output", party1)]
`,
  },
  {
    name: "multiplication_mixed_larger",
    code: `
from nada_audit import *

def nada_main():
    p1 = Party("Party1")
    p2 = Party("Party2")
    p3 = Party("Party3")
    p4 = Party("Party4")
    a = PublicInteger(Input("a", p1))
    b = SecretInteger(Input("b", p1))
    c = PublicInteger(Input("c", p2))
    d = SecretInteger(Input("d", p2))
    e = PublicInteger(Input("e", p3))
    f = SecretInteger(Input("f", p3))

    g = a * b * c * d * e * f

    return [Output(g, "g", p4)]
`,
  },
  {
    name: "voting-functional-style",
    code: `
from nada_audit import *

def nada_main():
    voters = [Party("Party" + str(v)) for v in range(2)]
    outparty = Party(name="OutParty")

    votes_per_candidate = [
        [
            SecretInteger(
                Input(
                    name="v" + str(v) + "_c" + str(c),
                    party=Party("Party" + str(v))
                )
            )
            for v in range(2)
        ]
        for c in range(4)
    ]

    return [
      Output(sum(votes_per_candidate[c]), "c" + str(c), outparty)
      for c in range(4)
    ]
`,
  },
  {
    name: "voting-imperative-style",
    code: `
# In this example, note that empty lists must be accompanied by an explicit
# type annotation.

from nada_audit import *

def nada_main():

    # Create the voter parties and recipient party.
    voters: list[Party] = []
    for v in range(2):
        voters.append(Party("Party" + str(v)))
    outparty = Party(name="OutParty")

    # Gather the inputs (one vote for each candidate from each voter).
    votes_per_candidate: list[list[SecretInteger]] = []
    for c in range(4):
        votes_per_candidate.append([])
        for v in range(2):
            votes_per_candidate[c].append(SecretInteger(
                Input(
                    name="v" + str(v) + "_c" + str(c),
                    party=Party("Party" + str(v))
                )
            ))

    # Calculate the total for each candidate.
    outputs: list[Output] = []
    for c in range(4):
        outputs.append(Output(sum(votes_per_candidate[c]), "c" + str(c), outparty))

    return outputs
`,
  },
];

export default examples;
