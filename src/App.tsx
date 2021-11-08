import React, { useEffect, useState } from "react";
import "./styles.css";
type Args = { [argname: string]: boolean };
type Operation = any;
const Not: Operation = {};
const And: Operation = {};
const Or: Operation = {};

function evaluateOperation(operation: Operation, args: Args): boolean {
  let arr: boolean[] = [];
  for (var key in args) {
    arr.push(args[key]);
  }
  switch (operation) {
    case And:
      return arr.every((val, i, arr) => val === arr[0]);
    case Or:
      return arr.includes(true);
    case Not:
      return !arr[0];
    default:
      return false;
  }
}

function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
  input_counter: number;
}): JSX.Element {
  const ArgsList = () => {
    const select = document.getElementById("args_select") as HTMLSelectElement;
    // let select = document.querySelector(
    //   '[id^="args_select"]'
    // ) as HTMLSelectElement;
    if (select?.hasAttribute("name")) {
      select.options.length = 1;
      for (let i = 0; i < props.input_counter; i++) {
        const new_option = document.createElement("option");

        new_option.text = (document.getElementById(
          "input-" + i
        ) as HTMLInputElement).value;
        select.appendChild(new_option);
      }
    }
  };

  useEffect(() => {
    if (props.value === "argument") ArgsList();
  });
  function renderArgSection() {
    return (
      <div id="operation">
        <select id="args_select" name="args_select">
          <option value="default" disabled>
            select...
          </option>
        </select>
        <button onClick={ArgsList}>ab</button>
      </div>
    );
  }
  function renderConstSection() {
    return (
      <div id="operation">
        <select id="const_select">
          <option value="default" disabled>
            select...
          </option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    );
  }
  function renderAndSection() {
    return (
      <div id="operation">
        <select id="and_select">
          <option value="default" disabled>
            select...
          </option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button onClick={ArgsList}>ab</button>
      </div>
    );
  }
  function renderOrSection() {
    return (
      <div id="operation">
        <select id="or_select">
          <option value="default" disabled>
            select...
          </option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button onClick={ArgsList}>ab</button>
      </div>
    );
  }
  // function checkAnd() {
  //   let arr: Args[] = [];
  //   for(let i = 0; i<props.input_counter; i++) {
  //     let arg_name =
  //   }
  // }

  switch (props.value) {
    case "argument":
      return renderArgSection();
    case "constant":
      return renderConstSection();
    case "and":
      return renderAndSection();
    case "or":
      return renderOrSection();
    default:
      return <div></div>;
  }
}

export default function App() {
  const [input_counter, set_input_counter] = useState(1);
  const [selected_option, set_selected_option] = useState("");
  //const [args_array, set_args_array] = useState<Args[]>([]);

  function addArgs(e: any) {
    e.preventDefault();
    const section = document.getElementById("argsSection");
    const newDiv = document.createElement("div");
    const input = document.createElement("input");
    input.id = "input-" + input_counter;
    input.defaultValue = "newarg";
    const select = document.createElement("select");
    select.id = "select-" + input_counter;
    const false_option = document.createElement("option");
    false_option.value = "false";
    false_option.text = "false";
    const true_option = document.createElement("option");
    true_option.value = "true";
    true_option.text = "true";
    select.options.add(false_option);
    select.options.add(true_option);
    newDiv?.appendChild(input);
    newDiv?.appendChild(select);
    section?.appendChild(newDiv);
    set_input_counter(input_counter + 1);
  }

  return (
    <div>
      <form>
        <div id="argsSection">
          <div>
            <input type="text" defaultValue="My Arg" id="input-0" />
            <select id="select-0">
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={addArgs} id="btn_add_arg">
            + add arg
          </button>
        </div>
        <select
          id="basic_select"
          onChange={(e) => {
            set_selected_option(e.target.value);
          }}
        >
          <option value="default" disabled>
            select...
          </option>
          <option value="constant">constant</option>
          <option value="argument">argument</option>
          <option value="and">and</option>
          <option value="or">or</option>
        </select>
      </form>
      <OperationBuilder value={selected_option} input_counter={input_counter} />
      result:{" "}
      {evaluateOperation(Not, { abc: false, def: true, efg: true }) ? (
        <span>true</span>
      ) : (
        <span>false</span>
      )}
    </div>
  );
}
