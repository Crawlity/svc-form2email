import { Formatter } from "./service";


const htmlFormatter = {
  null:   o => "",
  string: s => "<p>" + s.replace("\n", "</p>\n<p>") + "</p>",
  array:  a => a.reduce((result, item) => result + this.html(item) + "\n", ""),
  object: o =>
    Object.keys(o).reduce(
      (result, key) =>
        result +
        "  <tr>\n" +
        `    <td>${key}</td>\n` +
        `    <td>${o[key]}</td>\n` +
        "  </tr>\n",
      "<table>\n"
    ) + "</table>",
  format: o =>
    (o === null
      ? htmlFormatter.null
      : Array.isArray(o) ? htmlFormatter.array : htmlFormatter[typeof o])(o)
};

export const html : Formatter = (form : object) => htmlFormatter.format(form);