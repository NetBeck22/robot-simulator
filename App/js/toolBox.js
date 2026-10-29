//toolbox
export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Besturen",
      colour: 300,
      contents: [
        {
          type: "start",
          kind: "block",
        },
        {
          type: "moveRight",
          kind: "block",
        },
        {
          type: "moveLeft",
          kind: "block",
        },
        {
          type: "moveUp",
          kind: "block",
        },
        {
          type: "moveDown",
          kind: "block",
        },
      ],
    },
    {
      kind: "category",
      name: "Logica",
      categorystyle: "logic_category",
      contents: [
        {
          type: "ifBlock",
          kind: "block",
        },
        {
          type: "ifElse",
          kind: "block",
        },
        {
          type: "logic_compare",
          kind: "block",
          fields: {
            OP: "EQ",
          },
        },
        {
          type: "logic_operation",
          kind: "block",
          fields: {
            OP: "AND",
          },
        },
        {
          type: "logic_negate",
          kind: "block",
        },
        {
          type: "logic_boolean",
          kind: "block",
          fields: {
            BOOL: "TRUE",
          },
        },
      ],
    },
    {
      kind: "category",
      name: "Loops",
      categorystyle: "loop_category",
      contents: [
        {
          type: "forBlock",
          kind: "block",
        },

        {
          type: "whileBlock",
          kind: "block",
        },
      ],
    },
    {
      kind: "category",
      name: "Wiskunde",
      categorystyle: "math_category",
      contents: [
        {
          type: "math_number",
          kind: "block",
          fields: {
            NUM: 123,
          },
        },
      ],
    },
    {
      kind: "category",
      name: "Tekst",
      categorystyle: "text_category",
      contents: [
        {
          type: "text",
          kind: "block",
          fields: {
            TEXT: "",
          },
        },

        {
          type: "text_length",
          kind: "block",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
      ],
    },

    {
      kind: "sep",
    },
    {
      kind: "category",
      name: "Variabelen",
      custom: "VARIABLE",
      categorystyle: "variable_category",
    },
  ],
};
