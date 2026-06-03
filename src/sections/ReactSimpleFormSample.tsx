import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useState,
} from "react";
const validate = (value: string) => {
  if (value.length === 0) {
    return "テキストを入力してください";
  }
  return "";
};

/**
 * Reactを用いたシンプルなフォームです
 */
export const ReactSimpleFormSample = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const result = validate(e.target.value);
    setError(result);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(value);
    if (result !== "") {
      setError(result);
      return;
    }
    window.alert(value);
  };
  return (
    <form className="box" onSubmit={onSubmit}>
      <div className="field">
        <label className="label">名前</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {error !== "" && <p className="help is-danger">{error}</p>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link" type="submit">
            submit
          </button>
        </div>
      </div>
    </form>
  );
};
