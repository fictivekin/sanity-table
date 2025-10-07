"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var sanity = require("sanity"), jsxRuntime = require("react/jsx-runtime"), icons = require("@sanity/icons"), ui = require("@sanity/ui"), react = require("react"), getRandomValues, rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues && (getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !getRandomValues))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid == "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i)
  byteToHex.push((i + 256).toString(16).substr(1));
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid))
    throw TypeError("Stringified UUID is invalid");
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  return rnds[6] = rnds[6] & 15 | 64, rnds[8] = rnds[8] & 63 | 128, stringify(rnds);
}
const TableInput = (props) => {
  var _a2;
  const updateCell = props.updateCell, renderRowCell = (rowIndex) => function(cell, cellIndex) {
    return /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.TextArea,
      {
        fontSize: 1,
        padding: 3,
        value: cell,
        onChange: (e) => updateCell(e, rowIndex, cellIndex)
      }
    ) }, `cell-${rowIndex}-${cellIndex}`);
  }, renderRow = (row, rowIndex) => {
    const renderCell = renderRowCell(rowIndex);
    return /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
      row.cells.map(renderCell),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { marginLeft: 1, style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(
        ui.Button,
        {
          icon: icons.RemoveIcon,
          padding: 2,
          onClick: () => props.removeRow(rowIndex),
          mode: "bleed"
        }
      ) }) }, rowIndex)
    ] }, `row-${rowIndex}`);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("table", { style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsxs("tbody", { children: [
    props.rows.map(renderRow),
    /* @__PURE__ */ jsxRuntime.jsx("tr", { children: (((_a2 = props.rows[0]) == null ? void 0 : _a2.cells) || []).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { marginTop: 1, style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Button,
      {
        icon: icons.RemoveIcon,
        padding: 2,
        onClick: () => props.removeColumn(i),
        mode: "bleed"
      }
    ) }) }, i)) })
  ] }) });
}, TableMenu = (props) => {
  const { remove: handleRemove } = props, [dialog, setDialog] = react.useState(null), [count, setCount] = react.useState(""), updateCount = (e) => {
    setCount(e.currentTarget.value);
  }, addRows = () => {
    setDialog({ type: "rows", callback: (c) => props.addRows(c) });
  }, addRowAt = () => {
    setDialog({ type: "rows", callback: (index) => props.addRowAt(index) });
  }, addColumns = () => {
    setDialog({
      type: "columns",
      callback: (c) => props.addColumns(c)
    });
  }, addColumnsAt = () => {
    setDialog({ type: "columns", callback: (index) => props.addColumnAt(index) });
  }, onConfirm = () => {
    const parsedCount = parseInt(count != null ? count : "0", 10);
    parsedCount < 100 && (setDialog(null), dialog == null || dialog.callback(parsedCount), setCount(void 0));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    dialog && /* @__PURE__ */ jsxRuntime.jsx(
      ui.Dialog,
      {
        header: `Add ${dialog.type}`,
        id: "dialog-add",
        onClose: () => setDialog(null),
        zOffset: 1e3,
        children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Card, { padding: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.TextInput,
            {
              style: { textAlign: "left" },
              fontSize: 2,
              padding: 3,
              type: "number",
              value: count,
              onChange: updateCount
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Inline, { space: 1, style: { textAlign: "right" }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.Button,
              {
                text: "Cancel",
                mode: "ghost",
                onClick: () => setDialog(null)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { text: "Confirm", tone: "critical", onClick: onConfirm })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.MenuButton,
      {
        button: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { icon: icons.ControlsIcon, fontSize: 1, padding: 2, mode: "ghost" }),
        id: "menu-button-example",
        menu: /* @__PURE__ */ jsxRuntime.jsxs(ui.Menu, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.MenuItem,
            {
              icon: icons.AddIcon,
              fontSize: 1,
              text: "Add Row(s)",
              onClick: addRows
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.MenuItem,
            {
              icon: icons.AddIcon,
              fontSize: 1,
              text: "Add Row At Index",
              onClick: addRowAt
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.MenuItem,
            {
              icon: icons.AddIcon,
              fontSize: 1,
              text: "Add Column(s)",
              onClick: addColumns
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.MenuItem,
            {
              icon: icons.AddIcon,
              fontSize: 1,
              text: "Add Column At Index",
              onClick: addColumnsAt
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(ui.MenuDivider, {}),
          /* @__PURE__ */ jsxRuntime.jsx(
            ui.MenuItem,
            {
              icon: icons.WarningOutlineIcon,
              fontSize: 1,
              text: "Remove",
              tone: "critical",
              onClick: handleRemove
            }
          )
        ] }),
        popover: { placement: props.placement }
      }
    )
  ] });
};
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), _a;
const deepClone = (_a = globalThis.structuredClone) != null ? _a : (data) => JSON.parse(JSON.stringify(data)), TableComponent = (props) => {
  var _a2, _b, _c;
  const { rowType = "tableRow", value, onChange } = props, [dialog, setDialog] = react.useState(null), updateValue = (v) => onChange(sanity.set(v)), resetValue = () => onChange(sanity.unset()), createTable = () => {
    const newValue = {
      rows: [
        {
          _type: rowType,
          _key: v4(),
          cells: ["", ""]
        },
        {
          _type: rowType,
          _key: v4(),
          cells: ["", ""]
        }
      ]
    };
    return updateValue(__spreadValues(__spreadValues({}, value), newValue));
  }, confirmRemoveTable = () => {
    setDialog({ type: "table", callback: removeTable });
  }, removeTable = () => {
    resetValue(), setDialog(null);
  }, addRows = (count = 1) => {
    var _a3;
    if (!value)
      return;
    const newValue = deepClone(value), columnCount = (_a3 = value == null ? void 0 : value.rows[0].cells.length) != null ? _a3 : 0;
    for (let i = 0; i < count; i++)
      newValue.rows.push({
        _type: rowType,
        _key: v4(),
        cells: Array(columnCount).fill("")
      });
    return updateValue(newValue);
  }, addRowAt = (index = 0) => {
    if (!value)
      return;
    const newValue = deepClone(value), columnCount = value.rows[0].cells.length;
    return newValue.rows.splice(index, 0, {
      _type: rowType,
      _key: v4(),
      cells: Array(columnCount).fill("")
    }), updateValue(newValue);
  }, removeRow = (index) => {
    if (!value)
      return;
    const newValue = deepClone(value);
    newValue.rows.splice(index, 1), updateValue(newValue), setDialog(null);
  }, confirmRemoveRow = (index) => {
    if (value)
      return value.rows.length <= 1 ? confirmRemoveTable() : setDialog({ type: "row", callback: () => removeRow(index) });
  }, confirmRemoveColumn = (index) => {
    if (value)
      return value.rows[0].cells.length <= 1 ? confirmRemoveTable() : setDialog({ type: "column", callback: () => removeColumn(index) });
  }, addColumns = (count) => {
    if (!value)
      return;
    const newValue = deepClone(value);
    return newValue.rows.forEach((_, i) => {
      for (let j = 0; j < count; j++)
        newValue.rows[i].cells.push("");
    }), updateValue(newValue);
  }, addColumnAt = (index) => {
    if (!value)
      return;
    const newValue = deepClone(value);
    return newValue.rows.forEach((_, i) => {
      newValue.rows[i].cells.splice(index, 0, "");
    }), updateValue(newValue);
  }, removeColumn = (index) => {
    if (!value)
      return;
    const newValue = deepClone(value);
    newValue.rows.forEach((row) => {
      row.cells.splice(index, 1);
    }), updateValue(newValue), setDialog(null);
  }, updateCell = (e, rowIndex, cellIndex) => {
    if (!value)
      return;
    const newValue = deepClone(value);
    return newValue.rows[rowIndex].cells[cellIndex] = e.target.value, updateValue(newValue);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    dialog && /* @__PURE__ */ jsxRuntime.jsx(
      ui.Dialog,
      {
        header: `Remove ${dialog.type}`,
        id: "dialog-remove",
        onClose: () => setDialog(null),
        zOffset: 1e3,
        children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Card, { padding: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
            "Are you sure you want to remove this ",
            dialog.type,
            "?"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Inline, { space: 1, style: { textAlign: "right" }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.Button,
              {
                text: "Cancel",
                mode: "ghost",
                onClick: () => setDialog(null)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.Button,
              {
                text: "Confirm",
                tone: "critical",
                onClick: () => dialog.callback()
              }
            )
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Flex, { justify: "flex-end", children: ((_a2 = value == null ? void 0 : value.rows) == null ? void 0 : _a2.length) && /* @__PURE__ */ jsxRuntime.jsx(
      TableMenu,
      {
        addColumns,
        addColumnAt,
        addRows,
        addRowAt,
        remove: confirmRemoveTable,
        placement: "left"
      }
    ) }) }),
    ((_b = value == null ? void 0 : value.rows) == null ? void 0 : _b.length) && /* @__PURE__ */ jsxRuntime.jsx(
      TableInput,
      {
        rows: value.rows,
        removeRow: confirmRemoveRow,
        removeColumn: confirmRemoveColumn,
        updateCell
      }
    ),
    (!value || !((_c = value == null ? void 0 : value.rows) != null && _c.length)) && /* @__PURE__ */ jsxRuntime.jsx(ui.Inline, { space: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Button,
      {
        fontSize: 1,
        padding: 3,
        icon: icons.AddIcon,
        text: "Create Table",
        tone: "primary",
        mode: "ghost",
        onClick: createTable
      }
    ) })
  ] });
};
function createTableComponent(rowType) {
  return function(props) {
    return /* @__PURE__ */ jsxRuntime.jsx(TableComponent, __spreadProps(__spreadValues({}, props), { rowType }));
  };
}
function TableIcon() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 25 25",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.2",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" })
    }
  );
}
const Table = ({ rows }) => {
  const numCols = rows.length === 0 ? 0 : rows[0].cells.length;
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Grid, { columns: numCols, padding: 2, children: rows.map(
    (row) => row.cells.map((cell, i) => /* @__PURE__ */ jsxRuntime.jsx(
      ui.Card,
      {
        padding: 2,
        style: { outline: "1px solid #DFE2E9" },
        children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { style: { textOverflow: "elipsis" }, children: cell })
      },
      row._key + i
    ))
  ) });
}, TablePreview = (props) => {
  var _a2;
  const { schemaType, rows = [], title = "Title missing" } = props;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { padding: 3, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Inline, { space: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Card, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsx(TableIcon, {}) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Card, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: (_a2 = schemaType == null ? void 0 : schemaType.title) != null ? _a2 : title }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Box, { padding: 2, children: rows.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { muted: !0, children: "Empty Table" }) : /* @__PURE__ */ jsxRuntime.jsx(Table, { rows }) })
  ] });
}, table = sanity.definePlugin((config) => {
  const tableRowSchema = sanity.defineType({
    title: "Table Row",
    name: (config == null ? void 0 : config.rowType) || "tableRow",
    type: "object",
    fields: [
      {
        name: "cells",
        type: "array",
        of: [{ type: "string" }]
      }
    ]
  }), tableSchema = sanity.defineType({
    title: "Table",
    name: "table",
    type: "object",
    fields: [
      {
        name: "rows",
        type: "array",
        of: [
          {
            type: tableRowSchema.name
          }
        ]
      }
    ],
    components: {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      input: createTableComponent(tableRowSchema.name),
      preview: TablePreview
      /* eslint-enable @typescript-eslint/no-explicit-any */
    },
    preview: {
      select: {
        rows: "rows",
        title: "title"
      },
      prepare: ({ title, rows = [] }) => ({
        title,
        rows
      })
    }
  });
  return {
    name: "table",
    schema: {
      types: [tableRowSchema, tableSchema]
    }
  };
});
exports.TableComponent = TableComponent;
exports.TablePreview = TablePreview;
exports.table = table;
//# sourceMappingURL=index.cjs.map
